<?php

namespace App\Repositories;

use App\Models\SubCategory;
use App\Contracts\SubCategoryRepositoryInterface;
use App\Exceptions\SubCategoryNotFoundException;
use Illuminate\Support\Facades\Log;

/**
 * サブカテゴリーに関するリポジトリクラス
 * @mixin SubCategoryRepositoryInterface
 */
class SubCategoryRepository implements SubCategoryRepositoryInterface
{
    /**
     * サブカテゴリーを取得
     * @param  int  $subCategoryId
     * @return SubCategory
     */
    public function find(int $subCategoryId): ?SubCategory
    {
        return SubCategory::find($subCategoryId);
    }

    /**
     * サブカテゴリー名からサブカテゴリーを取得
     * @param  string $subCategoryName
     * @return SubCategory 
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合
     */
    public function getSubCategoryByName(string $subCategoryName): SubCategory
    {
        $subCategory = SubCategory::where('sub_category_name', $subCategoryName)->first();

        if (!$subCategory) {
            Log::error(
                'サブカテゴリーの存在を確認操作中にエラーが発生',
                [
                    'action' => 'getSubCategoryByName',
                    'subCategoryId' => $subCategoryName
                ]
            );
            throw new SubCategoryNotFoundException($subCategoryName);
        }
        return $subCategory;
    }
}
