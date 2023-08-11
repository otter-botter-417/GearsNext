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
            'App\Contracts\ItemRepositoryInterface',
            'App\Repositories\EloquentItemRepository'
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
            'App\Contracts\UserRepositoryInterface',
            'App\Repositories\UserRepository'
        );
        $this->app->bind(
            'App\Contracts\FavoriteItemRepositoryInterface',
            'App\Repositories\FavoriteItemRepository'
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
