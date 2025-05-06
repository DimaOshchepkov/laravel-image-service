<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserFilesController;

Route::middleware(['auth:sanctum', 'verified'])->group(function (){
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('/media/download/{token}', [UserFilesController::class, 'download'])
        ->name('media.download');



