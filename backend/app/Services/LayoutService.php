<?php

namespace App\Services;

use App\Models\Layout;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\LayoutRepositoryInterface;
use Aws\Exception\AwsException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
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

    public function __construct(
        LayoutRepositoryInterface $layoutRepository,
        ItemRepositoryInterface $itemRepository

    ) {
        $this->layoutRepository = $layoutRepository;
        $this->itemRepository = $itemRepository;
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
     */
    public function uploadImage(UploadedFile $imageFile, int $layoutId): void
    {
        try {
            $inputPath = $imageFile->path();
            $convertImage = Image::make($inputPath)->encode('jpg');
            $newFileName = 'layout/image/' . $layoutId . '.jpg';
            // $convertImage->storeAs('layout/image',new File($newFileName), 's3');
            Storage::disk('s3')->put($newFileName, (string) $convertImage, 'public');
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
        $layout = $this->layoutRepository->getLayout($layout);

        if ($userId) {
            $this->saveViewLayoutHistory($layout, $userId);
        }
        $this->incrementLayoutViewCount($layout);

        return $layout;
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
