<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserFilesController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::delete('/media/{id}', [UserFilesController::class, 'destroy'])
        ->name('media.destroy');

    Route::post('/upload', [UserFilesController::class, 'store'])
        ->name('upload');

    Route::post('/media/{id}/create-temp-link', [UserFilesController::class, 'generateOneTimeLink'])
        ->name('media.create-link');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
