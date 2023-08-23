<?php

namespace App\Services;

use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\ItemAlreadyRegisteredException;
use App\Exceptions\ItemNotFoundException;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\BrandRepositoryInterface;
use App\Contracts\CategoryRepositoryInterface;
use App\Contracts\SubCategoryRepositoryInterface;
use App\Contracts\ViewItemHistoryRepositoryInterface;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

//TODO 他コードも含め引数名の見直し、統一、明確な命名　id ではなくitem_id等

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
     * @var ViewItemHistoryRepositoryInterface
     */
    protected $viewItemHistoryRepository;



    // コンストラクタとは？
    // コンストラクタは、オブジェクト指向プログラミングにおいて、
    // クラスからオブジェクトを生成する際に自動的に呼び出される特殊なメソッドです。
    // クラスのインスタンスが作成されるときに、初期設定や値の設定などを行うために使用されます。
    public function __construct(
        ItemRepositoryInterface $itemRepository,
        BrandRepositoryInterface $brandRepository,
        CategoryRepositoryInterface $categoryRepository,
        SubCategoryRepositoryInterface $subCategoryRepository,
        ViewItemHistoryRepositoryInterface $viewItemHistoryRepository
    ) {
        $this->itemRepository = $itemRepository;
        $this->brandRepository = $brandRepository;
        $this->categoryRepository = $categoryRepository;
        $this->subCategoryRepository = $subCategoryRepository;
        $this->viewItemHistoryRepository = $viewItemHistoryRepository;
    }

    /**
     * 商品を登録する
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
        $this->itemRepository->ensureItemNotExists($itemData['asin']);

        $entities = $this->ensureBrandAndCategoriesExist($itemData);

        $this->itemRepository->createItemData($itemData, $entities);
    }

    /**
     * 商品の詳細な情報を取得
     * @param  Item $item
     * @param  int $userId
     * @throws ItemNotFoundException 商品が見つからない場合
     * @return \Illuminate\Database\Eloquent\Collection 商品の詳細を返します。
     */
    public function getItemDetails(Item $item,  ?int $userId = null): \Illuminate\Database\Eloquent\Collection
    {
        $itemData = $this->itemRepository->getItemDataWithRelations($item);
        if ($userId) {
            $this->viewItemHistoryRepository->saveViewItemHistory($userId, $itemId);
        }

        return $itemData;
    }

    /**
     * 商品を検索して返す
     * @param  string $categoryName
     * @return \Illuminate\Database\Eloquent\Collection 商品の詳細を返します。
     * @throws ItemNotFoundException 商品が見つからない場合
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     */
    public function getItems(?string $categoryName): \Illuminate\Database\Eloquent\Collection
    {
        // requestにcategorynameが入っていればカテゴリーで検索
        if ($categoryName) {
            return $this->getItemsByCategoryName($categoryName);
        }

        //カテゴリーが入ってなければ全件渡す
        return $this->itemRepository->getAllItemsWithRelations();
    }

    /**
     * カテゴリー名で商品を検索して返す
     * @param  string $categoryName
     * @return \Illuminate\Database\Eloquent\Collection 商品の詳細を返します。
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @throws ItemNotFoundException 商品が見つからない場合
     */
    private function getItemsByCategoryName($categoryName)
    {
        $category = $this->categoryRepository->findByCategoryName($categoryName);

        if (!$category) {
            Log::error(
                'カテゴリー名でカテゴリーIDを検索中にエラーが発生',
                [
                    'action' => 'findByCategoryName',
                    'categoryname' => $categoryName,
                ]
            );
            throw new CategoryNotFoundException();
        }

        return $this->itemRepository->getItemsByCategory($category->category_id);
    }

    /**
     * 商品の閲覧数をインクリメント
     * @param  Item $item
     * @throws ItemNotFoundException 商品が見つからない場合
     * @return void
     */
    public function viewCountIncrement(Item $item): void
    {
        $this->itemRepository->incrementViewCount($item);
    }

    /**
     * brand category subcategoryをそれぞれ名前で検索してインスタンスを返す
     * @param  array $itemData
     * @return array brand category subcategoryのインスタンスを返します。
     * @throws BrandNotFoundException ブランドが見つからない場合
     * @throws CategoryNotFoundException カテゴリーが見つからない場合
     * @throws SubCategoryNotFoundException サブカテゴリーが見つからない場合
     */
    private function ensureBrandAndCategoriesExist(array $itemData): array
    {
        $brand = $this->brandRepository->getBrandByNameOrThrow($itemData['brandName']);
        $category = $this->categoryRepository->getCategoryByNameOrThrow($itemData['itemCategoryName']);
        $subCategory = $this->subCategoryRepository->getSubCategoryByNameOrThrow($itemData['subCategoryName']);

        return ['brand' => $brand, 'category' => $category, 'subCategory' => $subCategory];
    }

    //商品のいいね数をインクリメント
    //TODO 累計いいね数の取得

}
