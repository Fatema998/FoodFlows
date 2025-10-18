<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ColorController;
use App\Http\Controllers\Admin\SliderController;
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
            Route::post('/store','store')->name('admin.brand.store');
            Route::get('/edit/{id}','edit')->name('admin.brand.edit');
            Route::post('/update/{id}','update')->name('admin.brand.update');
            Route::get('/delete/{id}','destroy')->name('admin.brand.destroy');
        });
    });

    // category routes 
    Route::controller(CategoryController::class)->group(function(){
        Route::prefix('categories')->group(function(){
            Route::get('/','index')->name('admin.category.index');
            Route::get('/create','create')->name('admin.category.create');
            Route::get('/create/sub','createsub')->name('admin.categorysub.create');
            Route::get('/edit/{id}','edit')->name('admin.category.edit');
            Route::post('/store','store')->name('admin.category.store');
            Route::get('/edit/{id}','edit')->name('admin.category.edit');
            Route::post('/update/{id}','update')->name('admin.category.update');
            Route::get('/delete/{id}','destroy')->name('admin.category.destroy');
        });
    });

    // color routes
    Route::controller(ColorController::class)->group(function(){
        Route::prefix('colors')->group(function(){
            Route::get('/','index')->name('admin.color.index');
            Route::get('/create','create')->name('admin.color.create');
            Route::post('/store','store')->name('admin.color.store');
            Route::get('/edit/{id}','edit')->name('admin.color.edit');
            Route::post('/update/{id}','update')->name('admin.color.update');
            Route::get('/delete/{id}','destroy')->name('admin.color.destroy');
        });
    });

     // product routes 
    Route::controller(ProductController::class)->group(function(){
        Route::prefix('products')->group(function(){
            Route::get('/','index')->name('admin.product.index');
            Route::get('/create','create')->name('admin.product.create');
            Route::post('/store','store')->name('admin.product.store');
            Route::get('/edit/{id}','edit')->name('admin.product.edit');
            Route::post('/update/{id}','update')->name('admin.product.update');
            Route::get('/delete/{id}','destroy')->name('admin.product.destroy');
        });
    });

    // slider routes
    Route::controller(SliderController::class)->group(function(){
        Route::prefix('sliders')->group(function(){
            Route::get('/','index')->name('admin.slider.index');
            Route::get('/create','create')->name('admin.slider.create');
        });
    });

});

