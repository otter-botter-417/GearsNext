<?php

namespace App\Domain\Infrastructure\Storage;

interface StorageServiceInterface
{
    public function store(string $path, string $content);
}
