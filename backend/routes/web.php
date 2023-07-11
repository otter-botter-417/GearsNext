<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRegisterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/users',[ UserRegisterController::class, 'store']);

// Route::prefix('users')->middleware(['auth'])
// ->controller(UserRegisterController::class)
// ->name('user.')
// ->group(function(){
//     Route::post('/', 'index')->name('index');

// });