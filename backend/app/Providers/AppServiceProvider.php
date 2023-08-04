<?php

namespace App\Providers;

use App\Repositories\EloquentItemRepository;
use App\Repositories\ItemRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (config('app.env') === 'testing') {
            // テスト環境の場合、モックリポジトリをバインド
            $this->app->bind(ItemRepositoryInterface::class, MockEloquentItemRepository::class);
        } else {
            // それ以外の環境では、実際のリポジトリをバインド
            $this->app->bind(ItemRepositoryInterface::class, EloquentItemRepository::class);
        }
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
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
