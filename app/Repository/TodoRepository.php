<?php

namespace App\Repository;

use App\Models\Todo;

class TodoRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getTodos($userId){
       return  Todo::where('user_id',$userId)->paginate(10);
    }


    public function storeTodo($todoRequest){
        return Todo::create($todoRequest);
    }

    public function getTodo($todo,$userId){

        return Todo::where('id',$todo)->where('user_id',$userId)->first();
    }
}
