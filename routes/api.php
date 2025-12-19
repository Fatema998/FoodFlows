<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\SliderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserOrdersController;
use App\Http\Controllers\Api\PaymentGatewayController;
use App\Http\Controllers\Api\ShippingChargeController;

Route::options('{any}', function () {
    return response()->json([], 204);
})->where('any', '.*');


Route::controller(AuthController::class)->group(function(){
    Route::prefix('auth')->group(function(){
        Route::post('register','register');
        Route::post('login','login');

        Route::middleware(['auth:sanctum'])->group(function(){
            Route::get('profile','userProfile');
            Route::get('logout','userLogout');
        });
    });
});

Route::controller(UserOrdersController::class)->group(function(){
    Route::prefix('orders')->group(function(){
        Route::middleware(['auth:sanctum'])->group(function(){
            Route::get('user','orders');
        });
        Route::post('/','createCustomerOrder');
    });
});

Route::controller(ProductController::class)->group(function(){
    Route::prefix('products')->group(function(){
        Route::get('/','getAllProducts');
        Route::get('/best-sellers','bestSellingProducts');
        Route::get('/recently-views','recentlyViewedProducts');
        Route::get('/wise', 'wiseProducts');
        Route::get('/{identifier}','getProductByIdentifier');
    });
});


Route::controller(SliderController::class)->group(function(){
    Route::prefix('sliders')->group(function(){
        Route::get('/','getAllSlider');
    });
});

Route::controller(BrandController::class)->group(function(){
    Route::prefix('brands')->group(function(){
        Route::get('/','getAllBrand');
    });
});

Route::controller(ColorController::class)->group(function(){
    Route::prefix('colors')->group(function(){
        Route::get('/','getAllColor');
    });
});

Route::controller(CategoryController::class)->group(function(){
    Route::prefix('categories')->group(function () {
    Route::get('/', 'getAllCategories');
    // Route::get('/slug/{slug}', 'getCategoryProductsBySlug');
    // Route::get('/id/{id}', 'getCategoryProductsById');
    Route::get('/{identifier}/products', 'getCategoryProducts');
    });
});

Route::controller(PaymentGatewayController::class)->group(function(){
    Route::prefix('payment-gateways')->group(function(){
        Route::get('/','index');
    });
});

Route::controller(ShippingChargeController::class)->group(function(){
    Route::prefix('shipping-charges')->group(function(){
        Route::get('/','index');
    });
});


// php artisan l5-swagger:generate