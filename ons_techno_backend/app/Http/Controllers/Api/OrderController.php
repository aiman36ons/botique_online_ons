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
        $query = Order::with(['items.product', 'user'])
            ->where('user_id', auth()->id());

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->paginate(10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|in:paypal,baridi_mob,cash_on_delivery',
            'shipping_address' => 'required|array',
            'billing_address' => 'required|array',
            'currency' => 'required|in:DZD,USD,EUR'
        ]);

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'payment_method' => $validated['payment_method'],
                'shipping_address' => $validated['shipping_address'],
                'billing_address' => $validated['billing_address'],
                'currency' => $validated['currency'],
                'status' => 'pending',
                'payment_status' => 'pending'
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

            return response()->json($order->load('items.product'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('items.product'));
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

            foreach ($order->items as $item) {
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
} 