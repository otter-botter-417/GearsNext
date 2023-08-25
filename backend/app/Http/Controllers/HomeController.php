<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Services\homeService;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    // TODO　閲覧数のランキング　いいねのランキング　新着　商品とレイアウト　
    protected homeService $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    /**
     * ホーム画面の情報を取得
     */
    public function index(): JsonResponse
    {
        $homeData = $this->homeService->getHomeData(5);
        Log::debug($homeData);

        return response()->json($homeData, 200);
    }
}
