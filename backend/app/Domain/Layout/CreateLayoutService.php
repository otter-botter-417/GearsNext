<?php

namespace App\Domain\Layout;

use App\Models\Layout;
use App\Domain\Item\ItemRepositoryInterface;
use App\Domain\Infrastructure\Storage\ImageUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

/**
 * レイアウトの作成に関するサービスクラス
 * @package App\Services
 */
class CreateLayoutService
{
    /**
     * @var LayoutRepositoryInterface
     */
    protected $layoutRepository;

    /**
     * @var ItemRepositoryInterface
     */
    protected $itemRepository;

    /**
     * @var ImageUploadService
     */
    protected $imageUploadService;

    public function __construct(
        LayoutRepositoryInterface $layoutRepository,
        ItemRepositoryInterface $itemRepository,
        ImageUploadService $imageUploadService,


    ) {
        $this->layoutRepository = $layoutRepository;
        $this->itemRepository = $itemRepository;
        $this->imageUploadService = $imageUploadService;
    }

    /**
     * レイアウトを作成
     * - レイアウトインスタンスを作成
     * - レイアウトに使われている商品を紐付ける
     * - レイアウトのイメージマップ座標を登録する
     * - レイアウトの画像をアップロードする
     * @param  array $layoutData レイアウトデータ
     * @param  int $userId
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function createLayout(UploadedFile $imageFile, array $layoutData, int $userId,): void
    {
        DB::transaction(function () use ($imageFile, $layoutData, $userId) {
            $newLayout = $this->saveNewLayout($layoutData, $userId);
            $this->attachItemsToLayout($newLayout, $layoutData['items']);
            $this->saveImageMapPositions($newLayout, $layoutData['image_map_positions'] ?? []);
            $this->uploadLayoutImage($imageFile, $newLayout->layout_id);
        });
    }

    /**
     * レイアウトインスタンスを作成
     * @param  array $data レイアウトデータ
     * @param  int $userId ユーザーID
     * @return Layout
     */
    private function saveNewLayout(array $data, int $userId): Layout
    {
        $text = $data['text'] ?? '';
        return $this->layoutRepository->createLayout($text, $userId);
    }

    /**
     * レイアウトに使われている商品を紐付ける
     * @param  Layout $layout レイアウトインスタンス
     * @param  array $items レイアウトに使われている商品のデータ
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     */
    private function attachItemsToLayout(Layout $layout, array $items): void
    {
        $itemIds = $this->getValidItemIds($items);
        $layout->items()->attach($itemIds);
    }

    /**
     * レイアウトに使われている商品が存在するかチェック
     * @param  Layout $layout
     * @param  array $items レイアウトに使われている商品のデータ
     * @return array $itemIds レイアウトに使われている商品ID
     * @throws ItemNotFoundException 商品が見つからない
     */
    private function getValidItemIds(array $items): array
    {
        $itemIds = !empty($items) ? array_column($items, 'item_id') : [];
        if (!empty($itemIds)) {
            $this->itemRepository->checkItemsExists($itemIds);
        }
        return $itemIds;
    }

    /**
     * レイアウトのイメージマップ座標を登録する
     * @param  Layout $layout
     * @param  array $imageMapPositions
     * @return void
     */
    private function saveImageMapPositions(Layout $layout, array $imageMapPositions): void
    {
        if (!empty($imageMapPositions)) {
            $this->layoutRepository->createTagPositionsForLayout($layout, $imageMapPositions);
        }
    }

    /**
     * レイアウトの画像をアップロードする
     * @param  UploadedFile $imageFile
     * @param  int $layoutId
     * @return void
     */
    private function uploadLayoutImage(UploadedFile $imageFile, int $layoutId): void
    {
        $this->imageUploadService->uploadLayoutImage($imageFile, $layoutId, config('constants.LAYOUT_IMAGE_ENCODE_TYPE'));
    }

    /**
     * レイアウトを更新
     * @param  Layout  $layout
     * @param  array $data レイアウトデータ
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function updateLayout(Layout $layout, array $layoutData): void
    {
        DB::transaction(function () use ($layout, $layoutData) {
            $newLayout = $this->layoutRepository->updateLayout($layout, $layoutData);
            $this->attachItemsToLayout($newLayout, $layoutData['items']);
        });
    }
}
