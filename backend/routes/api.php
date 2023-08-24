<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\PrivateLayoutController;
use App\Http\Controllers\PublicLayoutController;
use App\Http\Controllers\FavoriteItemController;
use App\Http\Controllers\FavoriteLayoutController;
use App\Http\Controllers\UserInventoryController;

// 認証が不要なルート
Route::post('user/register', [UserController::class, 'register']);
Route::post('user/login', [UserController::class, 'login']);
Route::apiResource('items', ItemController::class)->only(['index', 'store', 'update', 'destroy']);
Route::get('items/{item}', [ItemController::class, 'show'])->middleware('AttachUserIdToRequest');
Route::get('layout', [PublicLayoutController::class, 'index']);
Route::get('layout/{layout}', [PublicLayoutController::class, 'show'])->middleware('AttachUserIdToRequest');

// 認証が必要なルート
Route::middleware(['auth:api'])->group(function () {
    // ユーザー関連のルート
    Route::prefix('user')->group(function () {
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('update', [UserController::class, 'update']);
        Route::post('delete', [UserController::class, 'delete']);
        Route::apiResource('layout', PrivateLayoutController::class);
        Route::apiResource('inventory', UserInventoryController::class)->only(['index']);
        Route::apiResource('favorite/items', FavoriteItemController::class)->only(['index']);
        Route::apiResource('favorite/layouts', FavoriteLayoutController::class)->only(['index', 'destroy']);
        Route::post('favorite/layouts/{layout}', [FavoriteLayoutController::class, 'store']);
        Route::post('inventory/{item}', [UserInventoryController::class, 'store']);
        Route::delete('inventory/{item}', [UserInventoryController::class, 'destroy']);
        Route::post('favorite/items/{item}', [FavoriteItemController::class, 'store']);
        Route::delete('favorite/items/{item}', [FavoriteItemController::class, 'destroy']);
    });
});
