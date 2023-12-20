<?php

namespace App\Domain\Item;

use App\Models\Item;
use App\Domain\FavoriteItem\FavoriteItemRepositoryInterface;
use App\Domain\UserInventory\UserInventoryRepositoryInterface;
use App\Domain\ViewHistory\ViewHistoryRepositoryInterface;
use Illuminate\Support\Facades\Log;
use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\ItemNotFoundException;
use Illuminate\Database\Eloquent\Collection;


/**
 * 商品に関するサービスクラス
 * @package App\Services
 */
class ItemService
{
    /**
     * @var ItemRepositoryInterface
     */
    protected $itemRepository;

    /**
     * @var CategoryRepositoryInterface
     */
    protected $categoryRepository;

    /**
     * @var FavoriteItemRepositoryInterface
     */
    protected $favoriteItemRepository;

    /**
     * @var UserInventoryRepositoryInterface
     */
    protected $userInventoryRepository;

    /**
     * @var ViewHistoryRepositoryInterface
     */
    protected $viewHistoryRepository;

    public function __construct(
        ItemRepositoryInterface $itemRepository,
        CategoryRepositoryInterface $categoryRepository,
        FavoriteItemRepositoryInterface $favoriteItemRepository,
        UserInventoryRepositoryInterface $userInventoryRepository,
        ViewHistoryRepositoryInterface $viewHistoryRepository,
    ) {
        $this->itemRepository = $itemRepository;
        $this->categoryRepository = $categoryRepository;
        $this->favoriteItemRepository = $favoriteItemRepository;
        $this->userInventoryRepository = $userInventoryRepository;
        $this->viewHistoryRepository = $viewHistoryRepository;
    }

    /**
     * 商品を全件取得　カテゴリー名があればカテゴリー名で検索
     * @param  string $categoryName
     * @return Collection 商品の詳細を返します。
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     */
    public function getItems(?string $categoryName): Collection
    {
        if ($categoryName) {
            return $this->getItemsByCategoryName($categoryName);
        } else {
            return $this->itemRepository->getAllItemsWithRelations();
        }
    }

    /**
     * カテゴリー名で商品を検索して返す
     * @param  string $categoryName
     * @return Collection 商品の詳細を返します。
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @throws ItemNotFoundException 商品が見つからない場合
     */
    private function getItemsByCategoryName(string $categoryName): Collection
    {
        $category = $this->categoryRepository->findByCategoryName($categoryName);
        if (!$category) {
            Log::error(
                'カテゴリー名でカテゴリーIDを検索中にエラーが発生',
                [
                    'action' => 'getItemsByCategoryName',
                    'categoryName' => $categoryName,
                ]
            );
            throw new CategoryNotFoundException();
        }

        return $this->itemRepository->getItemsByCategory($category->category_id);
    }


    /**
     * 商品の詳細な情報と関連するレイアウトを取得
     * 認証されたユーザーの場合は閲覧履歴を保存する
     * @param  Item $item
     * @param  int $userId
     * @return Item 商品の詳細を返します。
     * @throws ItemNotFoundException 商品が見つからない場合
     */
    public function getItemDetail(Item $item,  ?int $userId = null): Item
    {
        $itemData = $this->itemRepository->getItemDataWithRelations($item);

        if ($userId) {
            $this->getItemFavoriteAndInventoryStatus($itemData, $userId, $item->item_id);
            $this->viewHistoryRepository->saveViewItemHistory($userId, $item->item_id);
        } else {
            $this->setDefaultItemStatus($itemData);
        }
        $this->viewCountIncrement($item);

        return $itemData;
    }

    private function setDefaultItemStatus(Item $itemData): void
    {
        $itemData->isLoggedIn = false;
        $itemData->userFavoriteExists = false;
        $itemData->userInventoryExists = false;
    }

    /**
     * ユーザーが商品のお気に入りと持っている物に登録しているかを取得
     * @param  int $userId
     * @param  int $itemId
     * @return array
     */
    private function getItemFavoriteAndInventoryStatus(Item $itemData, int $userId,  int $itemId): void
    {
        $userFavoriteExists = $this->favoriteItemRepository->getUserFavoriteExists($userId, $itemId);
        $userInventoryExists = $this->userInventoryRepository->getUserInventoryExists($userId, $itemId);
        $itemData->isLoggedIn = true;
        $itemData->userFavoriteExists = $userFavoriteExists;
        $itemData->userInventoryExists = $userInventoryExists;
    }

    /**
     * 商品の閲覧数をインクリメント
     * @param  Item $item
     * @return void
     */
    public function viewCountIncrement(Item $item): void
    {
        $this->itemRepository->incrementViewCount($item);
    }

    /**
     * 商品を削除
     * @param  Item $item
     * @return void
     */
    public function deleteItem(Item $item): void
    {
        $this->itemRepository->deleteItem($item);
    }
}
