<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;
use Fruitcake\Cors\HandleCors;

class Kernel extends HttpKernel
{
    protected $middleware = [
        HandleCors::class,
    ];

    protected $routeMiddleware = [
        'admin' => \App\Http\Middleware\AdminMiddleware::class,
    ];

}