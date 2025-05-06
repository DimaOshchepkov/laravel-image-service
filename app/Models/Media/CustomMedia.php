<?php

namespace App\Models\Media;

use Spatie\MediaLibrary\MediaCollections\Models\Media as BaseMedia;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\FileToken;

class CustomMedia extends BaseMedia
{
    public function tokens(): HasMany
    {
        return $this->hasMany(FileToken::class, 'media_id');
    }
}
