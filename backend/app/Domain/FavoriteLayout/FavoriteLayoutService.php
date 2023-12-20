<?php

namespace App\Domain\FavoriteLayout;

use App\Domain\User\UserRepositoryInterface;
use App\Domain\Layout\LayoutRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

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
     * ユーザーのお気に入りレイアウトを取得
     * @param  int  $userId
     * @return Collection
     */
    public function getFavoriteLayouts($userId)
    {
        return $this->favoriteLayoutRepository->getFavoriteLayouts($userId);
    }

    /**
     * お気に入りに追加
     * @param  int  $userId
     * @param  int  $layoutId
     * @return void
     */
    public function addFavoriteLayout($userId, $layoutId)
    {
        $layout = $this->favoriteLayoutRepository->addFavoriteLayoutData($userId, $layoutId);
        if ($layout->wasRecentlyCreated) {
            $this->layoutRepository->adjustLayoutFavoriteCount($layoutId, 1);
        }
    }

    /**
     * お気に入りから削除
     * @param  int  $userId
     * @param  int  $layoutId
     * @return void
     * @throws LayoutNotFavoritedException お気に入りにレイアウトが存在しない
     */
    public function removeFavoriteLayout(int $userId, int $layoutId)
    {
        $this->favoriteLayoutRepository->removeFavoriteLayoutData($userId, $layoutId);
        $this->layoutRepository->adjustLayoutFavoriteCount($layoutId, -1);
    }

    /**
     * ユーザーがレイアウトをお気に入りに登録しているかを取得
     * @param  int $userId
     * @param  int $layoutId
     * @return array
     */
    public function getLayoutFavoriteStatus(int $userId, int $layoutId): array
    {
        $userFavoriteExists = $this->favoriteLayoutRepository->getUserFavoriteExists($userId, $layoutId);
        return [
            'userFavoriteLayoutExists' => $userFavoriteExists,
        ];;
    }
}
