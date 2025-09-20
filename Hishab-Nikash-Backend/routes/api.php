<?php

use App\Http\Controllers\front\AccountController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
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

Route::post('/register',[AccountController::class,'register']);
Route::post('/login', [AccountController::class, 'login']);

Route::get('/user', function (Request $request){
    return $request->user();
})->middleware('auth:sanctum');

Route::post('chat', [App\Http\Controllers\ChatController::class, 'chat']);
/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('/transactions', [TransactionController::class, 'index']);
Route::post('/add-transaction', [TransactionController::class, 'store']);



