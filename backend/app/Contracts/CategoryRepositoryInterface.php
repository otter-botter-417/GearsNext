<?php

namespace App\Contracts;

interface CategoryRepositoryInterface
{
    public function getAll();
    public function find($id);
    public function findByCategoryName($categoryName);
    public function getCategoryByNameOrThrow($categoryId);

    // その他のメソッド...
}
