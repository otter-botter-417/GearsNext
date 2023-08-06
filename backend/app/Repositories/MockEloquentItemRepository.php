<?php

namespace App\Repositories;

use App\Contracts\ItemRepositoryInterface;
use App\Exceptions\ItemAlreadyRegisteredException;
use App\Exceptions\ItemNotFoundException;
use Illuminate\Database\Eloquent\Collection;


/**
 * 商品リポジトリ モック
 * @mixin ItemRepositoryInterface
 */
class MockEloquentItemRepository implements ItemRepositoryInterface
{
    protected $items = [];

    public function getAll(): Collection
    {
        return collect($this->items);
    }

    public function find(int $id): ?\App\Models\Item
    {
        return $this->items[$id] ?? null;
    }


    public function getItemsByCategory(int $categoryId): Collection
    {
        return collect(array_filter($this->items, function ($item) use ($categoryId) {
            return $item->category_id === $categoryId;
        }));
    }

    public function ensureExists(int $itemId): \App\Models\Item
    {
        if (!isset($this->items[$itemId])) {
            throw new ItemNotFoundException();
        }
        return $this->items[$itemId];
    }

    public function ensureItemNotExists(string $asin): void
    {
        foreach ($this->items as $item) {
            if ($item->asin === $asin) {
                throw new ItemAlreadyRegisteredException();
            }
        }
    }

    public function getAllItemsWithRelations(): Collection
    {
        // このモックでは、関連情報は返さない
        return collect($this->items);
    }

    public function getItemDataWithRelations(\App\Models\Item $item): Collection
    {
        // このモックでは、関連情報は返さない
        return collect([$item]);
    }

    public function createItemData(array $itemData, array $entities): \App\Models\Item
    {
        $item = new \App\Models\Item($itemData);
        $item->id = count($this->items) + 1;
        $this->items[$item->id] = $item;
        return $item;
    }

    public function incrementViewCount(\App\Models\Item $item): void
    {
        if (isset($this->items[$item->id])) {
            $this->items[$item->id]->view_count++;
        }
    }
}
