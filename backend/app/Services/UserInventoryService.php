<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\UserInventoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * ユーザーの持っている商品に関するサービスクラス
 * @package App\Services
 */
class UserInventoryService
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
     * @var UserInventoryRepositoryInterface
     */
    protected $userInventoryRepository;

    public function __construct(
        UserRepositoryInterface $userRepository,
        ItemRepositoryInterface $itemRepository,
        UserInventoryRepositoryInterface $userInventoryRepository
    ) {
        $this->userRepository = $userRepository;
        $this->itemRepository = $itemRepository;
        $this->userInventoryRepository = $userInventoryRepository;
    }

    /**
     * ユーザーの持っている商品一覧を取得
     * @param  int  $userId
     * @return Collection
     */
    public function getUserInventories(int $userId): Collection
    {
        $userInventoryItemIds = $this->userInventoryRepository
            ->getUserInventoryItemIds($userId);
        $userInventories = $this->itemRepository
            ->getItemsByIds($userInventoryItemIds);
        return $userInventories;
    }

    /**
     * 持っている商品に追加
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     */
    public function addUserInventory(int $userId, int $itemId): void
    {

        $this->userInventoryRepository->addUserInventoryData($userId, $itemId);
    }

    /**
     * 持っている商品から削除
     * @param  int  $userId
     * @param  int  $itemId
     * @return void
     * @throws ItemNotInInventoryException 持っている商品に登録されていない
     */
    public function removeUserInventory(int $userId, int $itemId): void
    {
        $this->userInventoryRepository->removeUserInventoryData($userId, $itemId);
    }
}
