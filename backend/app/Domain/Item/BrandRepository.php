<?php

namespace App\Domain\Item;

use App\Models\Brand;
use App\Exceptions\BrandNotFoundException;
use Illuminate\Support\Facades\Log;

/**
 * ブランドに関するリポジトリクラス
 * @mixin BrandRepositoryInterface
 */
class BrandRepository implements BrandRepositoryInterface
{
    /**
     * ブランドを取得
     * @param  int  $brandId
     * @return Brand|null
     */
    public function find(int $brandId): ?Brand
    {
        return Brand::find($brandId);
    }

    /**
     * ブランド名からブランドを取得
     * @param  string $brandName
     * @throws BrandNotFoundException ブランドが見つからない場合
     * @return Brand 
     */
    public function getBrandByName(string $brandName): Brand
    {
        $brand = Brand::where('brand_name', $brandName)->first();
        if (!$brand) {
            Log::error(
                'ブランドの存在を確認操作中にエラーが発生',
                [
                    'action' => 'getBrandByName',
                    'brandName' => $brandName
                ]
            );
            throw new BrandNotFoundException($brandName);
        }
        return $brand;
    }
}
