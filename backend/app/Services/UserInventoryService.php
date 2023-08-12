<?php

namespace App\Services;

use App\Contracts\UserInventoryRepositoryInterface;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\UserRepositoryInterface;

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
        UserInventoryRepositoryInterface $userInventoryRepository,
        UserRepositoryInterface $userRepository,
        ItemRepositoryInterface $itemRepository

    ) {
        $this->userInventoryRepository = $userInventoryRepository;
        $this->userRepository = $userRepository;
        $this->itemRepository = $itemRepository;
    }

    /**
     * 持っている商品に追加
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @return void
     * @throws UserNotFoundException ユーザーが見つからない場合
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemAlreadyInInventoryException 既に持っている商品の場合
     */
    public function addUserInventory(string $userFirebaseId, int $itemId): void
    {
        $userId = $this->userRepository->getUserIdByFirebaseId($userFirebaseId);

        $this->itemRepository->ensureItemExists($itemId);

        $this->userInventoryRepository->userInventoryAlreadyExists($userId, $itemId);

        $this->userInventoryRepository->addUserInventoryData($userId, $itemId);
    }

    /**
     * 持っている商品から削除
     * @param  string $userFirebaseId
     * @param  int    $itemId
     * @return void
     * @throws UserNotFoundException ユーザーが見つからない場合
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws ItemNotInInventoryException 持っている商品が見つからない場合
     */
    public function removeUserInventory(string $userFirebaseId, int $itemId): void
    {
        $userId = $this->userRepository->getUserIdByFirebaseId($userFirebaseId);

        $this->itemRepository->ensureItemExists($itemId);

        $this->userInventoryRepository->removeUserInventoryData($userId, $itemId);
    }

    /**
     * ユーザーの持っている商品一覧を取得
     * @param  string $userFirebaseId
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws UserNotFoundException ユーザーが見つからない場合
     */
    public function getUserInventories(string $userFirebaseId): \Illuminate\Database\Eloquent\Collection
    {
        $userId = $this->userRepository->getUserIdByFirebaseId($userFirebaseId);
        $userInventoryItemIds = $this->userInventoryRepository->getUserInventoryItemIds($userId);
        $userInventories = $this->itemRepository->getItemsByIds($userInventoryItemIds);

        return $userInventories;
    }
}
