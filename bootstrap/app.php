<?php

use Illuminate\Foundation\Application;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\CacheResponseMiddleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    // Define routes for web, api, console, and health check
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )

    // Configure middleware
    ->withMiddleware(function (Middleware $middleware) {

        // Exclude certain cookies from encryption
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // Web middleware group
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            CacheResponseMiddleware::class // Uncomment if caching needed for web
        ]);

        // API middleware group
        // $middleware->api(append: [
        //     // CacheResponseMiddleware::class
        // ]);

        // Route middleware aliases
        $middleware->alias([
            'admin' => AdminMiddleware::class,
        ]);
    })

    // Configure exception handling (optional)
    ->withExceptions(function (Exceptions $exceptions) {
        // Add custom exception handling here if needed
    })

    ->create();
