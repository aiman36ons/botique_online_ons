<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Clavier mécanique RGB',
                'slug' => 'clavier-mecanique-rgb',
                'description' => 'Clavier mécanique gaming avec rétroéclairage RGB',
                'price' => 12000.00,
                'image' => 'keyboard.jpg',
                'type' => 'accessory',
                'stock' => 10,
                'is_active' => true
            ],
            [
                'name' => 'Souris gaming',
                'slug' => 'souris-gaming',
                'description' => 'Souris gaming avec capteur optique haute précision',
                'price' => 8000.00,
                'image' => 'mouse.jpg',
                'type' => 'accessory',
                'stock' => 15,
                'is_active' => true
            ],
            [
                'name' => 'Licence Windows 10 Pro',
                'slug' => 'licence-windows-10-pro',
                'description' => 'Licence numérique pour Windows 10 Professionnel',
                'price' => 15000.00,
                'image' => 'windows.jpg',
                'type' => 'digital',
                'stock' => 100,
                'is_active' => true
            ],
            [
                'name' => 'Service de maintenance',
                'slug' => 'service-maintenance',
                'description' => 'Service de maintenance informatique à domicile',
                'price' => 5000.00,
                'image' => 'service.jpg',
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