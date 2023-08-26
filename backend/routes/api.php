<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    UserController,
    ItemController,
    PrivateLayoutController,
    PublicLayoutController,
    FavoriteItemController,
    FavoriteLayoutController,
    HomeController,
    UserInventoryController,
    CommentController,
};

// 認証が不要なルート
Route::group([], function () {
    Route::get('home', [HomeController::class, 'index']);
    
    Route::post('user/register', [UserController::class, 'register']);
    Route::post('user/login', [UserController::class, 'login']);
    
    Route::apiResource('items', ItemController::class)
         ->except(['show', 'create', 'edit']);

    Route::get('items/{item}', [ItemController::class, 'show'])
         ->middleware('AttachUserIdToRequest');

    Route::get('layout', [PublicLayoutController::class, 'index']);
    Route::get('layout/{layout}', [PublicLayoutController::class, 'show'])
         ->middleware('AttachUserIdToRequest');
});

// 認証が必要なルート
Route::middleware(['auth:api'])->group(function () {
    Route::prefix('user')->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('update', [UserController::class, 'update']);
        Route::post('delete', [UserController::class, 'delete']);
        
        // Layouts
        Route::apiResource('layout', PrivateLayoutController::class);

        // Inventory
        Route::apiResource('inventory', UserInventoryController::class)
             ->only(['index']);
        Route::post('inventory/{item}', [UserInventoryController::class, 'store']);
        Route::delete('inventory/{item}', [UserInventoryController::class, 'destroy']);

        // Favorites
        Route::apiResource('favorite/items', FavoriteItemController::class)
             ->only(['index']);
        Route::post('favorite/items/{item}', [FavoriteItemController::class, 'store']);
        Route::delete('favorite/items/{item}', [FavoriteItemController::class, 'destroy']);
        
        Route::apiResource('favorite/layouts', FavoriteLayoutController::class)
             ->except(['store', 'create', 'edit']);
        Route::post('favorite/layouts/{layout}', [FavoriteLayoutController::class, 'store']);

        // Comments
        Route::apiResource('layout/comment', CommentController::class)
             ->except(['index', 'store', 'create', 'show', 'edit']);
        Route::post('layout/comment/{layout}', [CommentController::class, 'store']);
    });
});
