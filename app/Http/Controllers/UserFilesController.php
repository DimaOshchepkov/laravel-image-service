<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Media\CustomMedia;
use Illuminate\Support\Str;
use App\Models\FileToken;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserFilesController extends Controller
{
    use AuthorizesRequests;

    public function update(Request $request)
    {
        $this->authorize('create', CustomMedia::class);

        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:10240',
        ]);

        foreach ($request->file('files') as $file) {
            Auth::user()->addMedia($file)->toMediaCollection('files');
        }

        return redirect()->back()->with('success', 'Midia uploaded');
    }

    public function store(Request $request)
    {
        $this->authorize('create', CustomMedia::class);

        $request->validate([
            'files'   => 'required|array',
            'files.*' => 'file|max:10240',
        ]);

        foreach ($request->file('files') as $file) {
            Auth::user()
                ->addMedia($file)
                ->toMediaCollection('files');
        }

        return redirect()->back();
    }

    public function destroy(int $id)
    {
        $media = CustomMedia::findOrFail($id);

        $this->authorize('delete', $media);
        $media->delete();

        return redirect()->back();
    }

    public function generateOneTimeLink(int $id, int $seconds = 1000000)
    {
        $media = CustomMedia::findOrFail($id);

        $this->authorize('generateLink', $media);
        $token = FileToken::create([
            'media_id' => $media->id,
            'token' => Str::uuid(),
            'expires_at' => now()->addSeconds($seconds),
        ]);

        return response()->json([
            'link' => route('media.download', $token->token),
        ]);
    }

    public function download(string $token)
    {
        $mediaToken = FileToken::where('token', $token)->firstOrFail();

        if ($mediaToken->used || $mediaToken->isExpired()) {
            abort(403, 'Ссылка недействительна');
        }

        $mediaToken->used = true;
        $mediaToken->save();

        $media = $mediaToken->media;

        return response()->download($media->getPath(), $media->file_name);
    }
}
