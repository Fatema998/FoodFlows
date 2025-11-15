<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('AuthPages/SignIn');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/signup', function () {
    return Inertia::render('AuthPages/SignUp');
})->name('signup');

Route::get('/signin', function () {
    return Inertia::render('AuthPages/SignIn');
})->name('signin');




Route::get('/profile', function () {
    return Inertia::render('UserProfiles');
})->name('profile');

Route::get('/form-elements', function () {
    return Inertia::render('Forms/FormElements');
});

Route::get('/basic-tables', function () {
    return Inertia::render('Tables/BasicTables');
});


Route::get('/calendar', function () {
    return Inertia::render('Calendar');
});

Route::get('/blank', function () {
    return Inertia::render('Blank');
});

Route::get('/error-404', function () {
    return Inertia::render('OtherPage/NotFound');
});

Route::get('/line-chart', function () {
    return Inertia::render('Charts/BarChart');
});

Route::get('/bar-chart', function () {
    return Inertia::render('Charts/LineChart');
});


Route::get('/alerts', function () {
    return Inertia::render('UiElements/Alerts');
});


Route::get('/avatars', function () {
    return Inertia::render('UiElements/Avatars');
});

Route::get('/badge', function () {
    return Inertia::render('UiElements/Badges');
});

Route::get('/buttons', function () {
    return Inertia::render('UiElements/Buttons');
});

Route::get('/images', function () {
    return Inertia::render('UiElements/Images');
});

Route::get('/videos', function () {
    return Inertia::render('UiElements/Videos');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

