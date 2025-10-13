<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ColorController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;



Route::prefix('dashboard')->group(function(){

    Route::get('/', function () {
        return Inertia::render('Dashboard/Home');
    })->name('dashboard');

    // brand routes 
    Route::controller(BrandController::class)->group(function(){
        Route::prefix('brands')->group(function(){
            Route::get('/','index')->name('admin.brand.index');
            Route::get('/create','create')->name('admin.brand.create');
        });
    });

    // color routes 
    Route::controller(CategoryController::class)->group(function(){
        Route::prefix('categories')->group(function(){
            Route::get('/','index')->name('admin.category.index');
            Route::get('/create','create')->name('admin.category.create');
        });
    });

    Route::controller(ColorController::class)->group(function(){
        Route::prefix('colors')->group(function(){
            Route::get('/','index')->name('admin.color.index');
            Route::get('/create','create')->name('admin.color.create');
        });
    });

     // category routes 
    Route::controller(ProductController::class)->group(function(){
        Route::prefix('products')->group(function(){
            Route::get('/','index')->name('admin.product.index');
            Route::get('/create','create')->name('admin.product.create');
        });
    });

});

