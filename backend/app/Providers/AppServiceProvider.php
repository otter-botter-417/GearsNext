<?php

namespace App\Providers;

use App\Domain\FavoriteLayout\FavoriteLayoutService;
use App\Domain\Infrastructure\Storage\ImageUploadService;
use App\Domain\Infrastructure\Storage\S3StorageService;
use App\Domain\Infrastructure\Storage\StorageServiceInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Domain\Item\ItemRepositoryInterface',
            'App\Domain\Item\EloquentItemRepository'
        );
        $this->app->bind(
            'App\Domain\Item\BrandRepositoryInterface',
            'App\Domain\Item\BrandRepository'
        );
        $this->app->bind(
            'App\Domain\Item\CategoryRepositoryInterface',
            'App\Domain\Item\CategoryRepository'
        );
        $this->app->bind(
            'App\Domain\Item\SubCategoryRepositoryInterface',
            'App\Domain\Item\SubCategoryRepository'
        );
        $this->app->bind(
            'App\Domain\User\UserRepositoryInterface',
            'App\Domain\User\UserRepository'
        );
        $this->app->bind(
            'App\Domain\FavoriteItem\FavoriteItemRepositoryInterface',
            'App\Domain\FavoriteItem\FavoriteItemRepository'
        );
        $this->app->bind(
            'App\Domain\FavoriteLayout\FavoriteLayoutRepositoryInterface',
            'App\Domain\FavoriteLayout\FavoriteLayoutRepository'
        );
        $this->app->bind(
            'App\Domain\UserInventory\UserInventoryRepositoryInterface',
            'App\Domain\UserInventory\UserInventoryRepository'
        );
        $this->app->bind(
            'App\Domain\Layout\LayoutRepositoryInterface',
            'App\Domain\Layout\LayoutRepository'
        );
        $this->app->bind(
            'App\Domain\ViewHistory\ViewHistoryRepositoryInterface',
            'App\Domain\ViewHistory\ViewHistoryRepository'
        );
        $this->app->bind(
            'App\Domain\Comment\CommentRepositoryInterface',
            'App\Domain\Comment\CommentRepository'
        );

        $this->app->bind(StorageServiceInterface::class, S3StorageService::class);
        $this->app->bind(ImageUploadService::class);
        $this->app->bind(FavoriteLayoutService::class);
    }

    /**
     * @return void
     */
    public function boot()
    {
        //
    }
}
