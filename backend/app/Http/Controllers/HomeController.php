<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeResource;
use App\Services\HomeService;

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
        $homeData = $this->homeService->getHomeData(5);
        return  new HomeResource($homeData);
    }
}
