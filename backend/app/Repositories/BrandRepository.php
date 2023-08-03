<?php

namespace App\Repositories;

use App\Contracts\BrandRepositoryInterface;
use App\Exceptions\BrandNotFoundException;
use App\Models\Brand;
use Illuminate\Support\Facades\Log;

//静的メソッドはリポジトリのメソッドでは通常使わない
//静的メソッドはモデルに書く
class BrandRepository implements BrandRepositoryInterface
{
    public function getAll()
    {
        return Brand::all();
    }

    public function find($id)
    {
        return Brand::find($id);
    }

    /**
     * @param  string $brandName
     * @throws BrandNotFoundException ブランドが見つからない場合にスローされます。
     * @return \App\Models\Brand ブランドのインスタンスを返します。
     */
    public function getBrandByNameOrThrow($brandName)
    {
        $brand = Brand::where('brand_name', $brandName)->first();
        if (!$brand) {
            Log::error(
                'ブランドの存在を確認操作中にエラーが発生',
                [
                    'action' => 'getBrandByNameOrThrow',
                    'brandName' => $brandName
                ]
            );
            throw new BrandNotFoundException($brandName);
        }
        return $brand;
    }
}
