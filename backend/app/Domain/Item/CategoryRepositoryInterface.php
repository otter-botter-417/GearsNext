<?php

namespace App\Domain\Item;

use App\Models\Category;

interface CategoryRepositoryInterface
{
    /**
     * カテゴリーを取得
     * @param  int  $categoryId
     * @return Category
     */
    public function find(int $categoryId): ?Category;

    /**
     * カテゴリー名からカテゴリーを取得
     * @param  string $categoryName
     * @return Category
     */
    public function findByCategoryName(string $categoryName): ?Category;

    /**
     * カテゴリー名からカテゴリーを取得
     * @param  string $categoryName
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @return Category 
     */
    public function getCategoryByName(string $categoryName): Category;
}
