<?php

namespace App\Domain\Item;

use App\Models\Item;
use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\ItemAlreadyRegisteredException;
use App\Exceptions\ItemNotFoundException;
use App\Domain\FavoriteItem\FavoriteItemRepositoryInterface;
use App\Domain\UserInventory\UserInventoryRepositoryInterface;
use App\Domain\ViewItemHistory\ViewItemHistoryRepositoryInterface;
use Illuminate\Support\Facades\Log;
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
     * @var BrandRepositoryInterface
     */
    protected $brandRepository;

    /**
     * @var CategoryRepositoryInterface
     */
    protected $categoryRepository;

    /**
     * @var SubCategoryRepositoryInterface
     */
    protected $subCategoryRepository;

    /**
     * @var FavoriteItemRepositoryInterface
     */
    protected $favoriteItemRepository; 
    
    /**
     * @var UserInventoryRepositoryInterface
     */
    protected $userInventoryRepository;

    /**
     * @var ViewItemHistoryRepositoryInterface
     */
    protected $viewItemHistoryRepository;

    public function __construct(
        ItemRepositoryInterface $itemRepository,
        BrandRepositoryInterface $brandRepository,
        CategoryRepositoryInterface $categoryRepository,
        SubCategoryRepositoryInterface $subCategoryRepository,
        FavoriteItemRepositoryInterface $favoriteItemRepository,
        UserInventoryRepositoryInterface $userInventoryRepository,
        ViewItemHistoryRepositoryInterface $viewItemHistoryRepository,
    ) {
        $this->itemRepository = $itemRepository;
        $this->brandRepository = $brandRepository;
        $this->categoryRepository = $categoryRepository;
        $this->subCategoryRepository = $subCategoryRepository;
        $this->favoriteItemRepository = $favoriteItemRepository;
        $this->userInventoryRepository = $userInventoryRepository;
        $this->viewItemHistoryRepository = $viewItemHistoryRepository;
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
        }

        return $this->itemRepository->getAllItemsWithRelations();
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
     * 商品を登録
     * @param  array $itemData
     * @return void
     * @throws ItemAlreadyRegisteredException 商品が既に登録されている場合
     * @throws BrandNotFoundException ブランドが見つからない場合
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合
     * @throws ColorTagNotFoundException カラータグが見つからない場合
     */
    public function register(array $itemData): void
    {
        if ($this->itemRepository->checkItemsExistsByAsin($itemData['baseData']['asin'])) {
            throw new ItemAlreadyRegisteredException();
        }
        $baseData = $this->appendBrandAndCategoryIds($itemData);
        $tagIds = $this->prepareTags($itemData);
        $attributesData = $this->prepareAttributesData($itemData['details'], $baseData['category_id']);
        $this->itemRepository->createItemData($baseData, $tagIds, $attributesData);
    }

    /**
     * brand category subcategoryのidをitemDataにマージしbaseDataを返す
     * @param  array $itemData
     * @return array brand category subcategoryのidをitemDataにマージして返す
     * @throws BrandNotFoundException ブランドが見つからない場合
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合
     */
    private function appendBrandAndCategoryIds(array $itemData): array
    {
        $brand = $this->brandRepository->getBrandByName($itemData['baseData']['brand_name']);
        $category = $this->categoryRepository->getCategoryByName($itemData['baseData']['item_category_name']);
        $subCategory = $this->subCategoryRepository->getSubCategoryByName($itemData['baseData']['sub_category_name']);
        $itemData['baseData']['brand_id'] = $brand->brand_id;
        $itemData['baseData']['category_id'] = $category->category_id;
        $itemData['baseData']['sub_category_id'] = $subCategory->sub_category_id;

        return $itemData['baseData'];
    }

    /**
     * 商品のタグをtagNameからtagIdに変換して返す
     * @param  array $itemData
     * @return array 商品のタグをtagNameからtagIdに変換して返す
     * @throws ItemTagNotFoundException アイテムタグが見つからない場合
     * @throws ColorTagNotFoundException カラータグが見つからない場合
     */
    private function prepareTags(array $itemData): array
    {
        $colorTagIds = $this->itemRepository->getColorTagIds($itemData['colorTags']);
        $itemTagIds = $this->itemRepository->getItemTagIds($itemData['itemTags']);
        return ['colorTagIds' => $colorTagIds, 'itemTagIds' => $itemTagIds];
    }

    /**
     * 商品の属性を整形して返す
     * @param  array $itemData
     * @param  int   $category_id
     * @return array 商品の属性を整形して返す
     */
    private function prepareAttributesData(array $details, int $category_id): array
    {
        $attributesData = [];
        foreach ($details as $key => $value) {
            $attributesData[] = [
                'category_id' => $category_id,
                'attribute_name' => $key,
                'attribute_value' => $value
            ];
        }
        return $attributesData;
    }

    /**
     * 商品の詳細な情報と関連するレイアウトを取得
     * 認証されたユーザーの場合は閲覧履歴を保存する
     * @param  Item $item
     * @param  int $userId
     * @return Item 商品の詳細を返します。
     * @throws ItemNotFoundException 商品が見つからない場合
     */
    public function getItemDetails(Item $item,  ?int $userId = null): Item
    {
        $itemData = $this->itemRepository->getItemDataWithRelations($item);

        if (!$userId) {
            $itemData->isLoggedIn = false;
            $itemData->userFavoriteExists = false;
            $itemData->userInventoryExists = false;
            return $itemData;
        }
        
        $itemData->isLoggedIn = true;
        $userItemStatus = $this->getItemFavoriteAndInventoryStatus($userId, $item->item_id);
        $this->viewItemHistoryRepository->saveViewItemHistory($userId, $item->item_id);
        $itemData->userFavoriteExists = $userItemStatus['userFavoriteExists'];
        $itemData->userInventoryExists = $userItemStatus['userInventoryExists'];
        
        return $itemData;
    }

    /**
     * ユーザーが商品のお気に入りと持っている物に登録しているかを取得
     * @param  int $userId
     * @param  int $itemId
     * @return array
     */
    private function getItemFavoriteAndInventoryStatus(int $userId,int $itemId): array
    {
        $userFavoriteExists = $this->favoriteItemRepository->getUserFavoriteExists($userId, $itemId);
        $userInventoryExists = $this->userInventoryRepository->getUserInventoryExists($userId, $itemId);
        return [
            'userFavoriteExists' => $userFavoriteExists,
            'userInventoryExists' => $userInventoryExists
        ];;
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
     * 商品を更新
     * @param  array $itemData
     * @param  Item $item
     * @return void
     */
    public function updateItemData(array $itemData, Item $item): void
    {
        $baseData = $this->appendBrandAndCategoryIds($itemData);
        $tagIds = $this->prepareTags($itemData);
        $attributesData = $this->prepareAttributesData($itemData['details'], $baseData['category_id']);
        $this->itemRepository->updateItemData($item, $baseData, $tagIds, $attributesData);
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
