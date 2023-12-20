<?php

namespace App\Domain\Item;

use App\Models\Item;
use App\Exceptions\CategoryNotFoundException;
use App\Exceptions\ItemAlreadyRegisteredException;


/**
 * 商品の登録に関するサービスクラス
 * @package App\Services
 */
class ItemCreateService
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

    public function __construct(
        ItemRepositoryInterface $itemRepository,
        BrandRepositoryInterface $brandRepository,
        CategoryRepositoryInterface $categoryRepository,
        SubCategoryRepositoryInterface $subCategoryRepository,
    ) {
        $this->itemRepository = $itemRepository;
        $this->brandRepository = $brandRepository;
        $this->categoryRepository = $categoryRepository;
        $this->subCategoryRepository = $subCategoryRepository;
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
}
