<?php

namespace App\Contracts;

interface SubCategoryRepositoryInterface
{
    public function getAll();
    public function find($id);
    public function getSubCategoryByNameOrThrow($categoryId);
}
