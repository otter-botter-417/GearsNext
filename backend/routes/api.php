<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\UserInventoryController;
use App\Http\Controllers\FavoriteItemController;

// ユーザー関連のルート
Route::prefix('user')->group(function () {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::middleware(['auth:api'])->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('update', [UserController::class, 'update']);
        Route::post('delete', [UserController::class, 'delete']);
    });
});

// アイテム関連のルート
Route::apiResource('items', ItemController::class)->only(['index', 'show', 'store']);

Route::middleware(['auth:api'])->group(function () {
    // ユーザーのインベントリ関連のルート
    Route::apiResource('user/inventory', UserInventoryController::class)
        ->only(['index', 'store', 'destroy']);
    // ユーザーのお気に入りアイテム関連のルート
    Route::apiResource('user/favorite/items', FavoriteItemController::class)
        ->only(['index', 'store', 'destroy']);
});
