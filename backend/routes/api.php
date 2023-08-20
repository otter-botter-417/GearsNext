<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserInventoryController;
use App\Http\Controllers\FavoriteItemController;
use App\Http\Controllers\FavoriteLayoutController;
use App\Http\Controllers\PrivateLayoutController;
use App\Http\Controllers\PublicLayoutController;

// ユーザー関連のルート
Route::prefix('user')->group(function () {
    // 認証が不要なユーザー関連のルート
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);

    // 認証が必要なユーザー関連のルート
    Route::middleware(['auth:api'])->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('update', [UserController::class, 'update']);
        Route::post('delete', [UserController::class, 'delete']);
    });
});

// パブリックなレイアウト関連のルート
Route::get('layout', [PublicLayoutController::class, 'index']);
Route::get('layout/{id}', [PublicLayoutController::class, 'show'])
    ->middleware('AttachUserIdToRequest');


// アイテム関連のルート
Route::apiResource('items', ItemController::class)->only(['index', 'store']);
Route::get('items/{id}', [ItemController::class, 'show'])
    ->middleware('AttachUserIdToRequest');

// 認証が必要なルート
Route::middleware(['auth:api'])->group(function () {
    // ユーザーのレイアウト関連のルート
    Route::apiResource('user/layout', PrivateLayoutController::class);

    // ユーザーのインベントリ関連のルート
    Route::apiResource('user/inventory', UserInventoryController::class)
        ->only(['index', 'store', 'destroy']);

    // ユーザーのお気に入りアイテム関連のルート
    Route::apiResource('user/favorite/items', FavoriteItemController::class)
        ->only(['index', 'store', 'destroy']);
    // ユーザーのお気に入りレイアウト関連のルート
    Route::apiResource('user/favorite/layouts', FavoriteLayoutController::class)
        ->only(['index', 'destroy']);
    Route::post('user/favorite/layouts/{layout}', [FavoriteLayoutController::class, 'store']);
});
