<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Smartphone X',
                'description' => 'Un smartphone puissant avec un excellent appareil photo',
                'price' => 699.99,
                'stock' => 50,
                'image' => 'smartphone-x.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Laptop Pro',
                'description' => 'Ordinateur portable haute performance pour les professionnels',
                'price' => 1299.99,
                'stock' => 30,
                'image' => 'laptop-pro.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tablette Ultra',
                'description' => 'Tablette légère avec un écran haute résolution',
                'price' => 499.99,
                'stock' => 75,
                'image' => 'tablette-ultra.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Smartwatch Elite',
                'description' => 'Montre connectée avec suivi d\'activité avancé',
                'price' => 299.99,
                'stock' => 100,
                'image' => 'smartwatch-elite.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Écouteurs Sans Fil',
                'description' => 'Écouteurs sans fil avec réduction de bruit active',
                'price' => 199.99,
                'stock' => 150,
                'image' => 'ecouteurs-sans-fil.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
} 