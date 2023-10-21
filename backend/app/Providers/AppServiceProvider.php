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
            'App\Contracts\BrandRepositoryInterface',
            'App\Repositories\BrandRepository'
        );
        $this->app->bind(
            'App\Contracts\CategoryRepositoryInterface',
            'App\Repositories\CategoryRepository'
        );
        $this->app->bind(
            'App\Contracts\SubCategoryRepositoryInterface',
            'App\Repositories\SubCategoryRepository'
        );
        $this->app->bind(
            'App\Domain\User\UserRepositoryInterface',
            'App\Domain\User\UserRepository'
        );
        $this->app->bind(
            'App\Contracts\FavoriteItemRepositoryInterface',
            'App\Repositories\FavoriteItemRepository'
        );
        $this->app->bind(
            'App\Contracts\FavoriteLayoutRepositoryInterface',
            'App\Repositories\FavoriteLayoutRepository'
        );
        $this->app->bind(
            'App\Contracts\UserInventoryRepositoryInterface',
            'App\Repositories\UserInventoryRepository'
        );
        $this->app->bind(
            'App\Domain\Layout\LayoutRepositoryInterface',
            'App\Domain\Layout\LayoutRepository'
        );
        $this->app->bind(
            'App\Contracts\ViewItemHistoryRepositoryInterface',
            'App\Repositories\ViewItemHistoryRepository'
        );
        $this->app->bind(
            'App\Contracts\CommentRepositoryInterface',
            'App\Repositories\CommentRepository'
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
