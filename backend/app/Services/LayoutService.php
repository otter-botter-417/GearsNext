<?php

namespace App\Services;

use App\Models\Layout;
use App\Contracts\ItemRepositoryInterface;
use App\Contracts\LayoutRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
    public function createLayout(array $data, int $userId,): void
    {
        DB::transaction(function () use ($data, $userId) {

            $itemIds = array_column($data['items'], 'item_id');
            $this->itemRepository->checkItemsExists($itemIds);
            $layout = $this->layoutRepository->createLayout($data['text'], $userId);
            $this->layoutRepository->createLayoutItems($layout, $data['items']);
        });
    }

    /**
     * レイアウトの詳細を取得する
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
