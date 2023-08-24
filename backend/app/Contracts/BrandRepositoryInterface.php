<?php

namespace App\Contracts;

use App\Models\Brand;

interface BrandRepositoryInterface
{
    /**
     * ブランドを取得
     * @param  int  $brandId
     * @return Brand|null
     */
    public function find(int $brandId): ?Brand;

    /**
     * ブランド名からブランドを取得
     * @param  string $brandName
     * @throws BrandNotFoundException ブランドが見つからない場合
     * @return Brand 
     */
    public function getBrandByName(string $brandName): Brand;
}
