<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Media\CustomMedia;

class FileToken extends Model
{
    protected $fillable = ['token', 'media_id', 'used', 'expires_at'];

    public function media(): BelongsTo
    {
        return $this->belongsTo(CustomMedia::class);
    }

    public function isExpired(): bool
    {
        return $this->expires_at && now()->gt($this->expires_at);
    }
}

