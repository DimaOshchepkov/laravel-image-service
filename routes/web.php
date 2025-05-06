<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserFilesController;
use \App\Http\Resources\MediaResource;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $mediaItems = Auth::user()->getMedia('files');

        $files = $mediaItems->map(function ($media) {
            // Загрузка связи явно (если модель кастомная с методом tokens)
            $media->loadMissing('tokens');

            $tokens = $media->tokens ?? collect();

            $unusedTokens = $tokens->filter(fn($token) => !$token->used && !$token->isExpired())->values();
            $usedTokens = $tokens->filter(fn($token) => $token->used || $token->isExpired())->values();

            return [
                'id' => $media->id,
                'name' => $media->name,
                'uploadedAt' => $media->created_at,
                'temporaryLinks' => $unusedTokens->map(fn($token) => route('media.download', $token->token))->all(),
                'usedLinks' => $usedTokens->map(fn($token) => route('media.download', $token->token))->all(),
            ];
        });

        return Inertia::render('dashboard', [
            'files' => $files,
        ]);
    })->name('dashboard');

    Route::delete('/media/{id}', [UserFilesController::class, 'destroy'])
        ->name('media.destroy');

    Route::post('/upload', [UserFilesController::class, 'store'])
        ->name('upload');

    Route::post('/media/{id}/create-temp-link', [UserFilesController::class, 'generateOneTimeLink'])
        ->name('media.create-link');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
