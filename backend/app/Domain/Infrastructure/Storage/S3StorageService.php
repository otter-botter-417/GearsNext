<?php

namespace App\Domain\Infrastructure\Storage;

use Aws\Exception\AwsException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

/**
 * S3にファイルを保存する
 */
class S3StorageService implements StorageServiceInterface
{
    /**
     * 画像をS3に保存する
     * @param string $path
     * @param string $content
     * @throws AwsException
     */
    public function store(string $path, string $content): void
    {
        try {
            Storage::disk('s3')->put($path, $content, 'public');
        } catch (AwsException $e) {
            Log::error("AWS Error: " . $e->getMessage());
            throw $e;
        }
    }
}
