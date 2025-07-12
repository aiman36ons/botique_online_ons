<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        try {
            $orders = Order::with(['orderItems.product', 'user'])
                ->latest()
                ->paginate(20);

            $orders->getCollection()->transform(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'client' => $order->customer_name,
                    'total' => $order->total_amount,
                    'currency' => $order->currency,
                    'date' => $order->created_at->toDateTimeString(),
                    'status' => $order->status,
                    'products_count' => $order->orderItems->count(),
                    'items' => $order->orderItems,
                ];
            });

            return response()->json($orders);
        } catch (\Throwable $e) {
            \Log::error('Order fetch error: '.$e->getMessage(), ['exception' => $e]);
            return response()->json(['message' => 'Erreur serveur', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        \Log::info('Payload reçu pour création de commande', $request->all());
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:paypal,baridi_mob,cash_on_delivery',
            'shipping_address' => 'required|array',
            'shipping_address.street' => 'required|string|max:255',
            'shipping_address.city' => 'required|string|max:100',
            'shipping_address.state' => 'required|string|max:100',
            'shipping_address.postal_code' => 'required|string|max:20',
            'shipping_address.country' => 'required|string|max:100',
            'billing_address' => 'required|array',
            'billing_address.street' => 'required|string|max:255',
            'billing_address.city' => 'required|string|max:100',
            'billing_address.state' => 'required|string|max:100',
            'billing_address.postal_code' => 'required|string|max:20',
            'billing_address.country' => 'required|string|max:100',
            'currency' => 'required|in:DZD,USD,EUR',
            // Informations client (optionnelles si pas connecté)
            'customer_info' => 'nullable|array',
            'customer_info.full_name' => 'nullable|string|max:255',
            'customer_info.email' => 'nullable|email|max:255',
            'customer_info.phone' => 'nullable|string|max:20'
        ]);

        try {
            DB::beginTransaction();

            // Déterminer l'ID utilisateur (null si pas connecté)
            $userId = auth()->check() ? auth()->id() : null;

            $order = Order::create([
                'user_id' => $userId,
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'payment_method' => $validated['payment_method'],
                'shipping_address' => $validated['shipping_address'],
                'billing_address' => $validated['billing_address'],
                'currency' => $validated['currency'],
                'status' => 'pending',
                'payment_status' => 'pending',
                'total_amount' => 0,
                // Stocker les informations client si fournies
                'customer_info' => $validated['customer_info'] ?? null
            ]);

            $total = 0;

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                $orderItem = OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'subtotal' => $product->price * $item['quantity']
                ]);

                $product->decrement('stock', $item['quantity']);
                $total += $orderItem->subtotal;
            }

            $order->update(['total_amount' => $total]);

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('orderItems.product'),
                'order_number' => $order->order_number
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur création commande: ' . $e->getMessage(), ['exception' => $e]);
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function show(Order $order)
    {
        // Si l'utilisateur n'est pas connecté, vérifier par numéro de commande
        if (!auth()->check()) {
            return response()->json(['message' => 'Authentication required'], 401);
        }

        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('orderItems.product'));
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        $order->update($validated);

        return response()->json($order);
    }

    public function cancel(Order $order)
    {
        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Order cannot be cancelled'], 400);
        }

        try {
            DB::beginTransaction();

            foreach ($order->orderItems as $item) {
                $product = $item->product;
                $product->increment('stock', $item->quantity);
            }

            $order->update(['status' => 'cancelled']);

            DB::commit();

            return response()->json(['message' => 'Order cancelled successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    // ===== MÉTHODES ADMIN =====

    // Pour l'admin : voir toutes les commandes
    public function allOrders(Request $request)
    {
        try {
            $query = Order::with(['orderItems.product', 'user']);

            // Filtres admin éventuels
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('order_number', 'like', "%{$search}%")
                      ->orWhere('customer_info->full_name', 'like', "%{$search}%")
                      ->orWhere('customer_info->email', 'like', "%{$search}%");
                });
            }

            $orders = $query->latest()->paginate(20);

            // Formatage des commandes pour le dashboard admin
            $orders->getCollection()->transform(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'client' => $order->customer_info['full_name'] ?? 'Client invité',
                    'total' => $order->total_amount,
                    'currency' => $order->currency,
                    'date' => $order->created_at->toDateTimeString(),
                    'status' => $order->status,
                    'products_count' => $order->orderItems->count(),
                    'items' => $order->orderItems,
                    'customer_info' => $order->customer_info,
                    'user' => $order->user,
                ];
            });

            return response()->json($orders);
        } catch (\Throwable $e) {
            \Log::error('Admin order fetch error: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all(),
                'user_id' => auth()->id()
            ]);
            
            return response()->json([
                'message' => 'Erreur serveur lors de la récupération des commandes',
                'error' => config('app.debug') ? $e->getMessage() : 'Erreur interne du serveur'
            ], 500);
        }
    }

    // Pour l'admin : voir une commande spécifique
    public function showOrder(Order $order)
    {
        return response()->json($order->load('orderItems.product'));
    }

    // Pour l'admin : mettre à jour le statut d'une commande
    public function updateOrderStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled,shipped',
            'notes' => 'nullable|string|max:500'
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order->load('orderItems.product')
        ]);
    }

    // Nouvelle méthode pour récupérer les commandes et items avec SQL brut
    public function adminRawOrders()
    {
        // Récupérer toutes les commandes
        $orders = DB::select('SELECT * FROM orders ORDER BY created_at DESC');
        $orderIds = array_map(fn($o) => $o->id, $orders);

        // Récupérer tous les items liés à ces commandes
        $items = [];
        if (count($orderIds) > 0) {
            $items = DB::select('SELECT * FROM order_items WHERE order_id IN (' . implode(',', $orderIds) . ')');
        }

        // Grouper les items par commande
        $itemsByOrder = [];
        foreach ($items as $item) {
            $itemsByOrder[$item->order_id][] = $item;
        }

        // Ajouter les items à chaque commande
        foreach ($orders as &$order) {
            $order->items = $itemsByOrder[$order->id] ?? [];
        }

        return response()->json($orders);
    }
} 