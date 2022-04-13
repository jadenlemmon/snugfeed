<?php

use App\Http\Controllers\FeedController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [FeedController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/saved', [FeedController::class, 'saved'])->name('saved');
    Route::post('/feed', [FeedController::class, 'store'])->name('feed.new');
});

require __DIR__.'/auth.php';
