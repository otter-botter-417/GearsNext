<?php

namespace App\Domain\Home;


use App\Domain\FavoriteItem\FavoriteItemRepositoryInterface;
use App\Domain\Item\ItemRepositoryInterface;
use App\Domain\Layout\LayoutRepositoryInterface;
use App\Domain\User\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * ホームに関するサービスクラス
 * @package App\Services
 */
class HomeService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @var ItemRepositoryInterface
     */
    protected $itemRepository;

    /**
     * @var LayoutRepositoryInterface
     */
    protected $layoutRepository;

    /**
     * @var FavoriteItemRepositoryInterface
     */
    protected $favoriteItemRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
        ItemRepositoryInterface $itemRepository,
        LayoutRepositoryInterface $layoutRepository,
        FavoriteItemRepositoryInterface $favoriteItemRepository
    ) {
        $this->userRepository = $userRepository;
        $this->itemRepository = $itemRepository;
        $this->layoutRepository = $layoutRepository;
        $this->favoriteItemRepository = $favoriteItemRepository;
    }

    /**
     * ホーム画面の情報を取得
     * @param  int  $userId
     * @return Collection
     */
    public function getHomeData(int $number): array
    {
        $topViewedItems = $this->itemRepository->getTopViewedItems($number);
        $topFavoriteItems = $this->itemRepository->getTopFavoriteItems($number);
        $newlyArrivedItems  = $this->itemRepository->getNewlyArrivedItems($number);
        $topViewedLayouts = $this->layoutRepository->getTopViewedLayouts($number);
        $topFavoriteLayouts = $this->layoutRepository->getTopFavoriteLayouts($number);
        $newlyArrivedLayouts  = $this->layoutRepository->getNewlyArrivedLayouts($number);
        return [
            'topViewedItems' => $topViewedItems,
            'topFavoriteItems' => $topFavoriteItems,
            'newlyArrivedItems' => $newlyArrivedItems,
            'topViewedLayouts' => $topViewedLayouts,
            'topFavoriteLayouts' => $topFavoriteLayouts,
            'newlyArrivedLayouts' => $newlyArrivedLayouts,
        ];
    }
}
