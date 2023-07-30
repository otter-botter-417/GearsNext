<?php

namespace App\Models;

use App\Exceptions\BrandNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Brand extends Model
{
    use HasFactory;
    protected $primaryKey = 'brand_id';

    protected $fillable = [
        'brand_name'
    ];
    public $timestamps = false;

    /**
     * @param  string $brandName
     * @throws BrandNotFoundException ブランドが見つからない場合にスローされます。
     * @return \App\Models\Brand ブランドのインスタンスを返します。
     */
    public static function ensureExists($brandName)
    {
        $brand = self::where('brand_name', $brandName)->first();
        if (!$brand) {
            Log::error(
                'ブランドの存在を確認操作中にエラーが発生',
                [
                    'action' => 'brandEnsureExists',
                    'brandName' => $brandName
                ]
            );
            throw new BrandNotFoundException($brandName);
        }
        return $brand;
    }
}
