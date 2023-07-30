<?php

namespace App\Models;

use App\Exceptions\CategoryNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'category_id';
    public $timestamps = false;

    protected $fillable = [
        'category_name'
    ];

    // カテゴリーIDに紐づく商品を取得
    public function items()
    {
        return $this->hasMany(Item::class, 'category_id');
    }

    /**
     * @param  string $categoryName
     * @throws CategoryNotFoundException カテゴリーが見つからない場合にスローされます。
     * @return \App\Models\Category カテゴリーのインスタンスを返します。
     */
    public static function ensureExists($categoryName)
    {
        $category = self::where('category_name', $categoryName)->first();
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
