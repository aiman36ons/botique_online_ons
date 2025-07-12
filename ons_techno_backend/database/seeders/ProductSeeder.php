<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'iPhone 13 Pro',
                'slug' => 'iphone-13-pro',
                'description' => 'Le dernier iPhone avec un appareil photo professionnel',
                'price' => 999.99,
                'image' => 'https://via.placeholder.com/300',
                'type' => 'smartphone',
                'stock' => 50,
                'is_active' => true
            ],
            [
                'name' => 'MacBook Pro M2',
                'slug' => 'macbook-pro-m2',
                'description' => 'Ordinateur portable puissant avec puce M2',
                'price' => 1299.99,
                'image' => 'https://via.placeholder.com/300',
                'type' => 'laptop',
                'stock' => 30,
                'is_active' => true
            ],
            [
                'name' => 'iPad Air',
                'slug' => 'ipad-air',
                'description' => 'Tablette polyvalente pour tous les usages',
                'price' => 599.99,
                'image' => 'https://via.placeholder.com/300',
                'type' => 'tablet',
                'stock' => 25,
                'is_active' => true
            ],
            [
                'name' => 'AirPods Pro',
                'slug' => 'airpods-pro',
                'description' => 'Écouteurs sans fil avec réduction de bruit active',
                'price' => 249.99,
                'image' => 'https://via.placeholder.com/300',
                'type' => 'accessory',
                'stock' => 100,
                'is_active' => true
            ],
            [
                'name' => 'Apple Watch Series 7',
                'slug' => 'apple-watch-series-7',
                'description' => 'Montre connectée avec suivi d\'activité avancé',
                'price' => 399.99,
                'image' => 'https://via.placeholder.com/300',
                'type' => 'wearable',
                'stock' => 40,
                'is_active' => true
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
} 