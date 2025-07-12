<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        $this->call([
            ProductSeeder::class
        ]);

        // Créer des produits de test
        $products = [
            [
                'name' => 'Smartphone XYZ',
                'description' => 'Un smartphone puissant avec un excellent appareil photo',
                'price' => 45000.00,
                'type' => 'digital',
                'stock' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Casque Audio Pro',
                'description' => 'Casque sans fil avec réduction de bruit',
                'price' => 15000.00,
                'type' => 'accessory',
                'stock' => 15,
                'is_active' => true,
            ],
            [
                'name' => 'Service Maintenance',
                'description' => 'Service de maintenance annuel pour vos appareils',
                'price' => 5000.00,
                'type' => 'service',
                'stock' => 100,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                ...$product,
                'slug' => Str::slug($product['name']),
            ]);
        }
    }
}
