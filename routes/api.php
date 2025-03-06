<?php

use App\Http\Controllers\Api\TaskApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/save-task', [TaskApiController::class, 'saveTask']);
Route::get('/get-task-list', [TaskApiController::class, 'getAllTasks']);
Route::put('/update-task-list/{id}', [TaskApiController::class, 'markAsDone']);
Route::delete('/delete-task-list/{id}', [TaskApiController::class, 'deleteTask']);
