<?php

namespace App\Domain\Item;

use App\Models\Category;
use App\Exceptions\CategoryNotFoundException;
use Illuminate\Support\Facades\Log;

/**
 * カテゴリーに関するリポジトリクラス
 * @mixin CategoryRepositoryInterface
 */
class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * カテゴリーを取得
     * @param  int  $categoryId
     * @return Category
     */
    public function find(int $categoryId): ?Category
    {
        return Category::find($categoryId);
    }

    /**
     * カテゴリー名からカテゴリーを取得
     * @param  string $categoryName
     * @return Category
     */
    public function findByCategoryName(string $categoryName): ?Category
    {
        return Category::where('category_name', $categoryName)->first();
    }

    /**
     * カテゴリー名からカテゴリーを取得
     * @param  string $categoryName
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @return Category 
     */
    public function getCategoryByName(string $categoryName): Category
    {
        $category = Category::where('category_name', $categoryName)->first();
        if (!$category) {
            Log::error(
                'カテゴリーの存在を確認操作中にエラーが発生',
                [
                    'action' => 'getCategoryByName',
                    'categoryName' => $categoryName
                ]
            );
            throw new CategoryNotFoundException($categoryName);
        }
        return $category;
    }
}
