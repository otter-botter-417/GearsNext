<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRegisterController;
use App\Http\Controllers\itemController;
use App\Http\Controllers\ItemViewCountController;
use App\Http\Controllers\UserInventoryController;

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

Route::post('/register',[ UserRegisterController::class, 'store']);
Route::get('/items/search', [itemController::class, 'index']);
Route::get('/items/get/{id}', [itemController::class, 'show']);
Route::put('/items/increment-view-count/{id}', [ItemViewCountController::class, 'update']);
Route::post('/user/inventory/register', [UserInventoryController::class, 'store']);
Route::get('/user/inventory/{id}', [UserInventoryController::class, 'show']);

Route::apiResource('/items', itemController::class);