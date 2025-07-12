<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Vérifie si l'utilisateur est connecté
        if (!auth()->check()) {
            return response()->json(['message' => 'Authentication required'], 401);
        }
        // Vérifie si l'utilisateur est admin
        if (!auth()->user()->is_admin) {
            return response()->json(['message' => 'Forbidden: Admins only'], 403);
        }
        return $next($request);
    }
}
