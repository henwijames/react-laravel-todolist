<?php

use App\Http\Controllers\Api\TaskApiController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(TaskApiController::class)->group(function () {
    Route::post('/save-task', 'saveTask');
    Route::get('/get-task-list', 'getAllTasks');
    Route::put('/update-task-list/{id}', 'markAsDone');
    Route::delete('/delete-task-list/{id}', 'deleteTask');
});


Route::controller(UserController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::get('/logout', [UserController::class, 'logout']);
});
