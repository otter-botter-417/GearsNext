<?php

namespace App\Repositories;

use App\Contracts\SubCategoryRepositoryInterface;
use App\Exceptions\SubCategoryNotFoundException;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Log;

//静的メソッドはリポジトリのメソッドでは通常使わない
//静的メソッドはモデルに書く
class SubCategoryRepository implements SubCategoryRepositoryInterface
{
    public function getAll()
    {
        return SubCategory::all();
    }

    public function find($id)
    {
        return SubCategory::find($id);
    }

    /**
     * @param  int $subCategoryId
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合にスローされます。
     * @return \App\Models\SubCategory サブカテゴリーのインスタンスを返します。
     */
    public function getSubCategoryByNameOrThrow($subCategoryId)
    {
        $subCategory = SubCategory::where('sub_category_name', $subCategoryId)->first();

        if (!$subCategory) {
            Log::error(
                'サブカテゴリーの存在を確認操作中にエラーが発生',
                [
                    'action' => 'getSubCategoryByNameOrThrow',
                    'subCategoryId' => $subCategoryId
                ]
            );
            throw new SubCategoryNotFoundException($subCategoryId);
        }
        return $subCategory;
    }
}
