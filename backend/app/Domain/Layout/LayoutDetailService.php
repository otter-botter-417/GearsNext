<?php

namespace App\Domain\Layout;

use App\Models\Layout;
use App\Domain\FavoriteLayout\FavoriteLayoutService;
use App\Domain\ViewHistory\ViewHistoryRepositoryInterface;

/**
 * レイアウトの詳細取得に関するサービスクラス
 * @package App\Services
 */
class LayoutDetailService
{
    /**
     * @var LayoutRepositoryInterface
     */
    protected $layoutRepository;

    /**
     * @var ViewHistoryRepositoryInterface
     */
    protected $viewHistoryRepository;

    /**
     * @var FavoriteLayoutService
     */
    protected $favoriteLayoutService;

    public function __construct(
        LayoutRepositoryInterface $layoutRepository,
        ViewHistoryRepositoryInterface $viewHistoryRepository,
        FavoriteLayoutService $favoriteLayoutService,
    ) {
        $this->layoutRepository = $layoutRepository;
        $this->viewHistoryRepository = $viewHistoryRepository;
        $this->favoriteLayoutService = $favoriteLayoutService;
    }

    /**
     * レイアウトの詳細を取得する
     * 認証されたユーザーの場合は閲覧履歴を保存する
     * @param  Layout $layout
     * @param  int $userId
     * @return Layout
     */
    public function getLayoutDetails(Layout $layout, ?int $userId): Layout
    {
        $layoutData = $this->layoutRepository->getLayoutWithRelations($layout);
        if ($userId) {
            $this->updateViewHistoryAndCount($layout, $userId);
            $this->updateUserSpecificDetails($layoutData, $userId);
        } else {
            $this->setDefaultUserSpecificDetails($layoutData);
        }
        return $layoutData;
    }

    /**
     * ユーザーがレイアウトをお気に入りに登録しているかを取得
     * 情報をlayoutDataに追加
     * @param  Layout $layoutData
     * @param  int $userId
     * @return void
     */
    private function updateUserSpecificDetails(Layout $layoutData, int $userId): void
    {
        $userLayoutStatus = $this->favoriteLayoutService->getLayoutFavoriteStatus($userId, $layoutData->layout_id);
        $layoutData->userFavoriteExists = $userLayoutStatus['userFavoriteLayoutExists'];
    }

    /**
     * 未認証ユーザーの場合のデフォルト値を設定
     * 情報をlayoutDataに追加
     * @param  Layout $layoutData
     * @return void
     */
    private function setDefaultUserSpecificDetails(Layout $layoutData): void
    {
        $layoutData->userFavoriteExists = false;
        $layoutData->userInventoryExists = false;
    }

    /**
     * レイアウトの閲覧履歴を保存し、閲覧数をインクリメント
     * @param  Layout $layout
     * @param  int $userId
     * @return void
     */
    private function updateViewHistoryAndCount(Layout $layout, int $userId): void
    {
        $this->viewHistoryRepository->saveViewLayoutHistory($layout->layout_id, $userId);
        $this->layoutRepository->incrementLayoutViewCount($layout);
    }
}
