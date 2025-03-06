<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskApiController extends Controller
{
    protected $taskModel;
    function __construct()
    {
        $this->taskModel = new Task();
    }
    public function saveTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:25', 'regex:/^[a-zA-Z\s]+$/'],
            'description' => ['required', 'string', 'regex:/^[a-zA-Z0-9\s""\'!@]+$/']
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $this->taskModel->createTask([
            'title' => $request->title,
            'description' => $request->description
        ]);

        return response()->json(['message' => 'Task created successfully'], 200);
    }

    public function getAllTasks()
    {
        return response()->json(['data' => $this->taskModel->getTaskList(), 200]);
    }

    public function markAsDone($taskId)
    {
        $isUpdated = $this->taskModel->markAsDone($taskId);

        if ($isUpdated) {
            return response()->json(['message' => 'Task marked as done'], 200);
        }

        return response()->json(['error' => 'Task not found'], 422);
    }

    public function deleteTask($taskId)
    {
        $isDeleted = $this->taskModel->deleteTask($taskId);

        if ($isDeleted) {
            return response()->json(['message' => 'Task deleted successfully'], 200);
        }

        return response()->json(['error' => 'Task not found'], 422);
    }
}
