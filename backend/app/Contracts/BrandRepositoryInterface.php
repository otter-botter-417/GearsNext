<?php

namespace App\Contracts;

interface BrandRepositoryInterface
{
    public function getAll();
    public function find($id);
    public function getBrandByNameOrThrow($brandId);
}
