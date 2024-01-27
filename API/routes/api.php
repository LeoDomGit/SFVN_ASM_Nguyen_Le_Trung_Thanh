<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BillController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::prefix('admin')->group(function () {
    Route::prefix('category')->group(function () {
    Route::post('/', [CategoriesController::class,'store']);
    Route::post('/delete', [CategoriesController::class,'destroy']);
    Route::get('/', [CategoriesController::class,'index']);
    Route::post('/edit', [CategoriesController::class,'edit']);
    });
    Route::prefix('products')->group(function () {
    Route::post('/', [ProductController::class,'store']);
    Route::post('/update', [ProductController::class,'update']);
    Route::get('/', [ProductController::class,'show']);
    Route::get('/{id}', [ProductController::class,'getSingle']);
    });
    Route::prefix('roles')->group(function () {
    Route::post('/', [UserController::class,'storeRole']);
    Route::post('/delete', [UserController::class,'destroyRole']);
    Route::get('/', [UserController::class,'indexRole']);
    Route::post('/edit', [UserController::class,'editRole']);
    });
    Route::prefix('users')->group(function () {
        Route::post('/', [UserController::class,'store']);
        Route::post('/delete', [UserController::class,'destroy']);
        Route::get('/', [UserController::class,'index']);
        Route::post('/edit', [UserController::class,'edit']);
        Route::post('/checkLogin', [UserController::class,'checkLogin1']);

    });
    Route::prefix('bills')->group(function () {
        Route::get('/', [BillController::class,'index']);
        Route::get('/{id}', [BillController::class,'single']);

    
    });
});
Route::prefix('users')->group(function () {
    Route::get('/products', [ProductController::class,'userProduct']);
    Route::get('/products/{id}', [ProductController::class,'singleCateProduct']);
    Route::get('/cates', [CategoriesController::class,'userCate']);
    Route::post('/bill', [BillController::class,'store']);

});