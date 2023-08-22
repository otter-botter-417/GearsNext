<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\UserInventoryRepositoryInterface;


/**
 * ユーザーの持っている商品に関するサービスクラス
 * @package App\Services
 */
class UserInventoryService
{
    /**
     * @var UserInventoryRepositoryInterface
     */
    protected $userInventoryRepository;

    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * @var ItemRepositoryInterface
     */
    protected $itemRepository;

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
     * @param  string $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUserInventories(string $userId): \Illuminate\Database\Eloquent\Collection
    {
        $userInventoryItemIds = $this->userInventoryRepository->getUserInventoryItemIds($userId);
        $userInventories = $this->itemRepository->getItemsByIds($userInventoryItemIds);
        return $userInventories;
    }

    /**
     * 持っている商品に追加
     * @param  string $userId
     * @param  int    $itemId
     * @return void
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemAlreadyInInventoryException 既に持っている商品の場合
     */
    public function addUserInventory(string $userId, int $itemId): void
    {
        $this->userInventoryRepository->addUserInventoryData($userId, $itemId);
    }

    /**
     * 持っている商品から削除
     * @param  string $userId
     * @param  int    $itemId
     * @return void
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemNotInInventoryException 持っている商品が見つからない場合
     */
    public function removeUserInventory(string $userId, int $itemId): void
    {
        $this->itemRepository->ensureItemExists($itemId);
        $this->userInventoryRepository->removeUserInventoryData($userId, $itemId);
    }
}
