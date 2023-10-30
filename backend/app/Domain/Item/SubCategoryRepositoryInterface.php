<?php

namespace App\Domain\Item;

use App\Models\SubCategory;

interface SubCategoryRepositoryInterface
{
    /**
     * サブカテゴリーを取得
     * @param  int  $subCategoryId
     * @return SubCategory
     */
    public function find(int $subCategoryId): ?SubCategory;
    
    /**
     * サブカテゴリー名からサブカテゴリーを取得
     * @param  string $subCategoryName
     * @return SubCategory 
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合
     */
    public function getSubCategoryByName(string $subCategoryName): SubCategory;
}
