<?php

// Test script pour vérifier l'API admin
$baseUrl = 'http://127.0.0.1:8000/api';

echo "=== Test API Admin Dashboard ===\n\n";

// Test 1: Vérifier que l'API est accessible
echo "1. Test de base de l'API...\n";
$response = file_get_contents($baseUrl . '/test-api');
echo "Réponse: " . $response . "\n\n";

// Test 2: Vérifier les produits (route publique)
echo "2. Test des produits (route publique)...\n";
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => 'Content-Type: application/json'
    ]
]);
$response = file_get_contents($baseUrl . '/products', false, $context);
if ($response !== false) {
    $data = json_decode($response, true);
    echo "Produits trouvés: " . count($data['data'] ?? []) . "\n";
} else {
    echo "Erreur lors de la récupération des produits\n";
}
echo "\n";

// Test 3: Vérifier la route admin (sans token = 401)
echo "3. Test route admin avec middleware (sans authentification)...\n";
$context = stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => 'Content-Type: application/json'
    ]
]);
$response = file_get_contents($baseUrl . '/admin/orders', false, $context);
if ($response !== false) {
    $data = json_decode($response, true);
    echo "Réponse: " . json_encode($data, JSON_PRETTY_PRINT) . "\n";
} else {
    echo "Erreur de connexion\n";
}
echo "\n";

echo "=== Tests terminés ===\n";
echo "Pour tester avec authentification, utilisez:\n";
echo "curl -H \"Authorization: Bearer <TOKEN>\" http://127.0.0.1:8000/api/admin/orders\n"; 