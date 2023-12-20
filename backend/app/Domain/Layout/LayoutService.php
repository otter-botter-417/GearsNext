<?php

namespace App\Domain\Layout;

use App\Models\Layout;
use Illuminate\Database\Eloquent\Collection;

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

    public function __construct(
        LayoutRepositoryInterface $layoutRepository,
    ) {
        $this->layoutRepository = $layoutRepository;
    }

    /**
     * ユーザーの登録したレイアウトを取得
     * @param  int $userId
     * @return Collection
     */
    public function getLayouts(int $userId): Collection
    {
        return $this->layoutRepository->getUserLayouts($userId);
    }

    /**
     * 全てのレイアウトを取得
     * @return Collection
     */
    public function getAllLayouts(): Collection
    {
        return $this->layoutRepository->getAllLayouts();
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
