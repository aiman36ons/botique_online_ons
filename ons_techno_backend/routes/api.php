<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;

// Test API
Route::get('/test-api', fn() => 'API OK');

// Routes publiques - Accessibles sans authentification
Route::apiResource('products', ProductController::class);
Route::get('/products/{product}', [ProductController::class, 'show']);
Route::get('/products/categories', [ProductController::class, 'categories']);

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes publiques pour les commandes (sans authentification)
Route::post('/orders', [OrderController::class, 'store']);

// Routes protégées utilisateur (si connecté)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes utilisateur (optionnelles)
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::put('/orders/{order}/status', [OrderController::class, 'updateStatus']);
});

// Routes protégées admin (authentification + admin requis)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Gestion des produits (CRUD complet)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{product}', [ProductController::class, 'update']);
    Route::delete('/products/{product}', [ProductController::class, 'destroy']);
    
    // Gestion des commandes (admin seulement)
    Route::get('/admin/orders', [OrderController::class, 'index']);
    Route::put('/admin/orders/{order}/status', [OrderController::class, 'updateOrderStatus']);
    Route::get('/admin/orders/{order}', [OrderController::class, 'showOrder']);
    Route::get('/admin/orders/raw', [OrderController::class, 'adminRawOrders']);
});
