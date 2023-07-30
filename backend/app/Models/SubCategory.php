<?php

namespace App\Models;

use App\Exceptions\SubCategoryNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class SubCategory extends Model
{
    use HasFactory;

    protected $primaryKey = 'sub_category_id';
    public $timestamps = false;

    protected $fillable = [
        'sub_category_name'
    ];

    /**
     * @param  int $subCategoryId
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合にスローされます。
     * @return \App\Models\SubCategory サブカテゴリーのインスタンスを返します。
     */
    public static function ensureExists($subCategoryId)
    {
        $subCategory = self::find($subCategoryId);
        if (!$subCategory) {
            Log::error(
                'サブカテゴリーの存在を確認操作中にエラーが発生',
                [
                    'action' => 'subCategoryEnsureExists',
                    'subCategoryId' => $subCategoryId
                ]
            );
            throw new SubCategoryNotFoundException($subCategoryId);
        }
        return $subCategory;
    }
}
