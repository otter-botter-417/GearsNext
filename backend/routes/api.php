<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemViewCountController;
use App\Http\Controllers\UserInventoryController;
use App\Http\Controllers\FavoriteItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('users', [UserController::class, 'store']);
// Route::get('/items', [ItemController::class, 'index']);
// Route::get('/items/{id}', [ItemController::class, 'show']);
Route::put('/items/increment-view-count/{id}', [ItemViewCountController::class, 'update']);
Route::post('/user/inventory/register', [UserInventoryController::class, 'store']);
Route::post('/user/inventory/unregister', [UserInventoryController::class, 'destroy']);
Route::get('/user/inventory/{id}', [UserInventoryController::class, 'show']);
Route::post('/user/favorite/item/register', [FavoriteItemController::class, 'store']);
Route::post('/user/favorite/item/unregister', [FavoriteItemController::class, 'destroy']);
Route::get('/user/favorite/items/{id}', [FavoriteItemController::class, 'show']);



// Route::apiResource('/items', ItemController::class);
Route::apiResource('items', ItemController::class)->only(['index', 'show', 'store']);
// Route::apiResource('items', FavoriteItemController::class)->only(['index', 'show', 'store']);
