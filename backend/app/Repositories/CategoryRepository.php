<?php

namespace App\Repositories;

use App\Contracts\CategoryRepositoryInterface;
use App\Exceptions\CategoryNotFoundException;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Support\Facades\Log;

//静的メソッドはリポジトリのメソッドでは通常使わない
//静的メソッドはモデルに書く
class CategoryRepository implements CategoryRepositoryInterface
{
    public function getAll()
    {
        return Category::all();
    }

    public function find($id)
    {
        return Category::find($id);
    }

    public function getItemsByCategory($category)
    {
        return Item::where('category_id', $category)->get();
    }

    public function findByCategoryName($categoryName)
    {
        return Category::where('category_name', $categoryName)->first();
    }

    /**
     * @param  string $categoryName
     * @throws CategoryNotFoundException カテゴリーが見つからない場合にスローされます。
     * @return \App\Models\Category カテゴリーのインスタンスを返します。
     */
    public function getCategoryByNameOrThrow($categoryName)
    {
        $category = Category::where('category_name', $categoryName)->first();
        if (!$category) {
            Log::error(
                'カテゴリーの存在を確認操作中にエラーが発生',
                [
                    'action' => 'categoryEnsureExists',
                    'categoryName' => $categoryName
                ]
            );
            throw new CategoryNotFoundException($categoryName);
        }
        return $category;
    }
}
