<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\ProductController as ProductControllerAlias;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // User profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Products
    Route::apiResource('products', ProductController::class);

    // Orders
    Route::apiResource('orders', OrderController::class);
    Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);
    Route::post('orders/{order}/cancel', [OrderController::class, 'cancel']);
});

// Public routes
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);

// Routes pour les produits
Route::apiResource('products', ProductControllerAlias::class); 