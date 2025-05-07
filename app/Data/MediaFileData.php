<?php
namespace App\Data;

use Spatie\LaravelData\Data;
use Illuminate\Support\Carbon;

class MediaFileData extends Data
{
    /**
     * @param  string[]  $temporaryLinks
     * @param  string[]  $usedLinks
     */
    public function __construct(
        public int $id,
        public string $name,
        public Carbon $uploadedAt,
        public array $temporaryLinks,
        public array $usedLinks,
    ) {}
}
