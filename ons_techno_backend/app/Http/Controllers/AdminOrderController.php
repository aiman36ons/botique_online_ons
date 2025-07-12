<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;

class AdminOrderController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $orders = Order::with(['orderItems.product', 'user'])->get();

            return response()->json([
                'success' => true,
                'orders' => $orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'customer_name' => $order->user->name ?? ($order->customer_info['full_name'] ?? 'Invité'),
                        'total' => $order->total_amount,
                        'currency' => $order->currency,
                        'date' => $order->created_at->format('d/m/Y H:i'),
                        'status' => $order->status,
                        'products_count' => $order->orderItems->count()
                    ];
                })
            ]);

        } catch (\Exception $e) {
            \Log::error('OrderController error: '.$e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Erreur serveur',
                'error' => env('APP_DEBUG') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function show($id)
    {
        $order = Order::with(['orderItems.product', 'user'])
            ->findOrFail($id);

        return response()->json([
            'order' => $order,
            'status' => 'success'
        ]);
    }
}
