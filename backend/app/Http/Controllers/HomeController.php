<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeResource;
use App\Domain\Home\HomeService;

/**
 * ホーム画面に関する操作を管理するコントローラークラスです。
 * このクラスではホーム画面の情報の取得を提供します。
 * 情報の詳細は以下の通りです。
 * ・お気に入り商品の上位5件
 * ・閲覧数の多い商品の上位5件
 * ・新着商品の上位5件
 * ・お気に入りレイアウトの上位5件
 * ・閲覧数の多いレイアウトの上位5件
 * ・新着レイアウトの上位5件
 * 
 * 認証は不要です。
 */
class HomeController extends Controller
{
    protected HomeService $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    /**
     * ホーム画面の情報を取得
     */
    public function index(): HomeResource
    {
        $homeData = $this->homeService->getHomeData(10);
        return  new HomeResource($homeData);
    }
}
