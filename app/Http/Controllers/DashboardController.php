<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data\MediaFileData;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $mediaItems = Auth::user()->getMedia('files')->loadMissing('tokens');

        $files = MediaFileData::collect(
            $mediaItems->map(fn($media) => $this->transformMedia($media))
        );

        return Inertia::render('dashboard', [
            'files' => $files,
        ]);
    }

    private function transformMedia($media): MediaFileData
    {
        $tokens = $media->tokens ?? collect();

        $temporaryLinks = $tokens
            ->filter(fn($token) => !$token->used && !$token->isExpired())
            ->map(fn($token) => route('media.download', $token->token))
            ->values()
            ->all();

        $usedLinks = $tokens
            ->filter(fn($token) => $token->used || $token->isExpired())
            ->map(fn($token) => route('media.download', $token->token))
            ->values()
            ->all();

        return new MediaFileData(
            id: $media->id,
            name: $media->name,
            uploadedAt: $media->created_at,
            temporaryLinks: $temporaryLinks,
            usedLinks: $usedLinks,
        );
    }
}
