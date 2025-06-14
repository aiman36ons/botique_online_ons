<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Clavier Mécanique RGB',
                'description' => 'Clavier mécanique gaming avec rétroéclairage RGB et switches bleus',
                'price' => 89.99,
                'image' => 'keyboard.jpg',
                'type' => 'hardware',
                'stock' => 15,
                'is_active' => true
            ],
            [
                'name' => 'Souris Gaming',
                'description' => 'Souris gaming avec capteur optique haute précision',
                'price' => 49.99,
                'image' => 'mouse.jpg',
                'type' => 'hardware',
                'stock' => 20,
                'is_active' => true
            ],
            [
                'name' => 'Windows 10 Pro',
                'description' => 'Licence Windows 10 Pro 64-bit',
                'price' => 199.99,
                'image' => 'windows.jpg',
                'type' => 'software',
                'stock' => 50,
                'is_active' => true
            ],
            [
                'name' => 'Maintenance PC',
                'description' => 'Service de maintenance et nettoyage de PC',
                'price' => 29.99,
                'image' => 'maintenance.jpg',
                'type' => 'service',
                'stock' => 999,
                'is_active' => true
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
} 