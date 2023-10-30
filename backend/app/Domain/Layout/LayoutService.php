<?php

namespace App\Domain\Layout;

use App\Models\Layout;
use App\Domain\Item\ItemRepositoryInterface;
use App\Domain\FavoriteLayout\FavoriteLayoutRepositoryInterface;
use Aws\Exception\AwsException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManagerStatic as Image;


/**
 * レイアウトに関するサービスクラス
 * @package App\Services
 */
class LayoutService
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
     * @var FavoriteLayoutRepositoryInterface
     */
    protected $favoriteLayoutRepository; 

    public function __construct(
        LayoutRepositoryInterface $layoutRepository,
        ItemRepositoryInterface $itemRepository,
        FavoriteLayoutRepositoryInterface $favoriteLayoutRepository,

    ) {
        $this->layoutRepository = $layoutRepository;
        $this->itemRepository = $itemRepository;
        $this->favoriteLayoutRepository = $favoriteLayoutRepository;
    }

    /**
     * ユーザーの登録したレイアウトを取得
     * @param  int $userId
     * @return Collection
     */
    public function getLayouts(int $userId): Collection
    {
        return $this->layoutRepository->getLayouts($userId);
    }

    /**
     * 全てのレイアウトを取得
     * @return Collection
     */
    public function getLayoutsAll(): Collection
    {
        return $this->layoutRepository->getLayoutsAll();
    }

    /**
     * レイアウトを登録
     * @param  array $data レイアウトデータ
     * @param  int $userId
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function createLayout(UploadedFile $imageFile, array $data, int $userId,): void
    {
        DB::transaction(function () use ($imageFile, $data, $userId) {

            // textがnullであれば空文字列を設定
            $text = isset($data['text']) ? $data['text'] : "";
            // itemsが存在しない、または空であれば空の配列を設定
            $items = isset($data['items']) && !empty($data['items']) ? $data['items'] : [];  
            // image_map_positionsが存在しない、または空であれば空の配列を設定
            $imageMapPositions = isset($data['image_map_positions']) && !empty($data['image_map_positions']) ? $data['image_map_positions'] : [];
            
            $itemIds = array_column($items, 'item_id');
            $this->itemRepository->checkItemsExists($itemIds);

            $layout = $this->layoutRepository->createLayout($text, $items, $userId);
            $this->layoutRepository->createLayoutPositions($layout, $imageMapPositions);
            $this->uploadImage($imageFile, $layout->layout_id);
        });
    }

    /**
     * 画像jpgに変換しS3にアップロード
     * リソースの解放も行う
     */
    public function uploadImage(UploadedFile $imageFile, int $layoutId): void
    {
        try {
            $inputPath = $imageFile->path();
            $convertImage = Image::make($inputPath)->encode('jpg');
            $newFileName = 'layout/image/' . $layoutId . '.jpg';
            Storage::disk('s3')->put($newFileName, (string) $convertImage, 'public');
            $convertImage->destroy(); //リソースの解放
            } catch (AwsException $e) {
                Log::error("AWS Error: " . $e->getMessage());
                throw $e;
        }
    }

    /**
     * レイアウトの詳細を取得する
     * 認証されたユーザーの場合は閲覧履歴を保存する
     * @param  Layout $layout
     * @param  int $userId
     * @return Layout
     */
    public function getLayoutWithHistory(Layout $layout, ?int $userId): Layout
    {
        $layoutData = $this->layoutRepository->getLayout($layout);

        if (!$userId) {
            $layoutData->userFavoriteExists = false;
            $layoutData->userInventoryExists = false;
            return $layoutData;
        }
        $userLayoutStatus = $this->getItemFavoriteAndInventoryStatus($userId, $layout->layout_id);
        $layoutData->userFavoriteExists = $userLayoutStatus['userFavoriteLayoutExists'];
        // $layoutData->userInventoryExists = $userLayoutStatus['userInventoryLayoutExists'];
        $this->saveViewLayoutHistory($layout, $userId);
        $this->incrementLayoutViewCount($layout);

        return $layoutData;
    }

        /**
     * ユーザーが商品のお気に入りと持っている物に登録しているかを取得
     * @param  int $userId
     * @param  int $layoutId
     * @return array
     */
    private function getItemFavoriteAndInventoryStatus(int $userId,int $layoutId): array
    {
        $userFavoriteExists = $this->favoriteLayoutRepository->getUserFavoriteExists($userId, $layoutId);
        // $userInventoryExists = $this->userInventoryRepository->getUserInventoryExists($userId, $layoutId);
        return [
            'userFavoriteLayoutExists' => $userFavoriteExists,
            // 'userInventoryLayoutExists' => $userInventoryExists
        ];;
    }

    /**
     * レイアウトの閲覧数をインクリメント
     * @param  Layout  $layout
     * @return void
     */
    public function incrementLayoutViewCount(Layout $layout): void
    {
        $this->layoutRepository->incrementLayoutViewCount($layout);
    }

    /**
     * レイアウトの閲覧履歴を保存
     * @param  Layout  $layout
     * @param  int $userId
     * @return void
     */
    public function saveViewLayoutHistory(Layout $layout, int $userId): void
    {
        $this->layoutRepository->saveViewLayoutHistory($layout, $userId);
    }

    /**
     * レイアウトを更新
     * @param  Layout  $layout
     * @param  array $data レイアウトデータ
     * @return void
     * @throws ItemNotFoundException 商品が見つからない
     */
    public function updateLayout(Layout $layout, array $data): void
    {
        DB::transaction(function () use ($layout, $data) {
            $itemIds = array_column($data['items'], 'item_id');
            $this->itemRepository->checkItemsExists($itemIds);
            $this->layoutRepository->updateLayout($layout, $data);
        });
    }

    /**
     * レイアウトを削除
     * @param  Layout  $layout
     * @return void
     */
    public function removeLayout(Layout $layout): void
    {
        $this->layoutRepository->removeLayout($layout);
    }
}
