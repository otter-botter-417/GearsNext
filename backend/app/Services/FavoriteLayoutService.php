<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Contracts\LayoutRepositoryInterface;
use App\Contracts\FavoriteLayoutRepositoryInterface;
use App\Models\Layout;
use Illuminate\Support\Facades\Log;

/**
 * お気に入りレイアウトに関するサービスクラス
 * @package App\Services
 */
class FavoriteLayoutService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @var LayoutRepositoryInterface
     */
    protected $layoutRepository;

    /**
     * @var FavoriteLayoutRepositoryInterface
     */
    protected $favoriteLayoutRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
        LayoutRepositoryInterface $layoutRepository,
        FavoriteLayoutRepositoryInterface $favoriteLayoutRepository
    ) {
        $this->userRepository = $userRepository;
        $this->layoutRepository = $layoutRepository;
        $this->favoriteLayoutRepository = $favoriteLayoutRepository;
    }

    /**
     * お気に入りに追加
     * @param  string $userId
     * @param  int    $layoutId
     * @throws LayoutAlreadyFavoritedException お気に入りにレイアウトが存在する
     */
    public function addFavoriteLayout($userId, $layoutId)
    {
        $this->favoriteLayoutRepository->favoriteLayoutAlreadyExists($userId, $layoutId);
        $this->favoriteLayoutRepository->addFavoriteLayoutData($userId, $layoutId);
    }

    /**
     * お気に入りから削除
     * @param  int $userId
     * @param  Layout $layout
     * @param  int    $layoutId
     */
    public function removeFavoriteLayout(int $userId, Layout $layout)
    {
        $this->favoriteLayoutRepository->removeFavoriteLayoutData($userId, $layout);
    }

    /**
     * ユーザーのお気に入りレイアウトを取得
     * @param  string $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFavoriteLayouts($userId)
    {
        $favoriteLayoutIds = $this->favoriteLayoutRepository->getFavoriteLayouts($userId);
        Log::debug($favoriteLayoutIds);

        $favoriteLayouts = $this->layoutRepository->getLayoutsByIds($favoriteLayoutIds);
        Log::debug($favoriteLayouts);

        return $favoriteLayouts;
    }
}
