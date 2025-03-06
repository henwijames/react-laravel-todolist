<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //

    protected $guarded = ['id', 'completed'];

    protected $fillable = ['title', 'description'];

    public function createTask($task)
    {
        return $this->create($task);
    }

    public function getTaskList()
    {
        return $this->where('completed', false)->orderBy('created_at', 'desc')->get();
    }

    public function markAsDone($id)
    {
        $task = $this->find($id);

        if ($task) {
            $task->completed = true;
            $task->save();
            return true;
        }

        return false;
    }

    public function deleteTask($id)
    {
        $task = $this->find($id);

        if ($task) {
            $task->delete();
            return true;
        }

        return false;
    }
}
