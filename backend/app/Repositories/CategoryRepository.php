<?php

namespace App\Repositories;

use App\Models\Item;
use App\Models\Category;
use App\Contracts\CategoryRepositoryInterface;
use App\Exceptions\CategoryNotFoundException;
use Illuminate\Support\Facades\Log;

//静的メソッドはリポジトリのメソッドでは通常使わない
//静的メソッドはモデルに書く
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


    // TODO itemRepositoryに移動？
    public function getItemsByCategory($category)
    {
        return Item::where('category_id', $category)->get();
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
