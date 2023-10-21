<?php

namespace App\Providers;

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
            'App\Domain\ViewItemHistory\ViewItemHistoryRepositoryInterface',
            'App\Domain\ViewItemHistory\ViewItemHistoryRepository'
        );
        $this->app->bind(
            'App\Domain\Comment\CommentRepositoryInterface',
            'App\Domain\Comment\CommentRepository'
        );

        //Brandとかのモックを作ってないからItemだけモックを採用するとエラーが発生する為一時的にコメントアウト
        // if (config('app.env') === 'testing') {
        //     // テスト環境の場合、モックリポジトリをバインド
        //     $this->app->bind(ItemRepositoryInterface::class, MockEloquentItemRepository::class);
        // } else {
        //     // それ以外の環境では、実際のリポジトリをバインド
        //     $this->app->bind(ItemRepositoryInterface::class, EloquentItemRepository::class);
        // }
    }

    /**
     * @return void
     */
    public function boot()
    {
        //
    }
}
