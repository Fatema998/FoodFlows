<?php

namespace App\Services;

use App\Services\AuthService;
use App\Repository\TodoRepository;

class TodoService
{

    protected $todoRepository, $authService;
    /**
     * Create a new class instance.
     */
    public function __construct(TodoRepository $todoRepository,AuthService $authService)
    {
        $this->todoRepository= $todoRepository;
        $this->authService= $authService;
    }

    public function getTodos(){

      //get  Auth user
        $authUser = $this->authService->getAuthUser();      //get todos
       return  $this->todoRepository->getTodos($authUser->id);
    }


    public function storeTodo($todoRequest){

     $todoRequest = $this->prepareTodoRequest($todoRequest);

      return  $this->todoRepository->storeTodo($todoRequest);
    }


    public function prepareTodoRequest($todoRequest){
        $authUser = $this->authService->getAuthUser();      //get todos
        $todoRequest = $todoRequest->all();
        $todoRequest['user_id']=$authUser->id;
        return $todoRequest;
    }

    public function showTodo($todo){
       $authUser = $this->authService->getAuthUser();      //get todos

       return $this->todoRepository->getTodo($todo,$authUser->id);
    }

    public function updateTodo($todoRequest,$todo){

       $todo = $this->showTodo($todo->id);
       if($todo){
        $todo->title = $todoRequest->title;
        $todo->description = $todoRequest->description;
       return  $todo->save();
       }
    }


    public function deleteTodo($todo){
        $todo = $this->showTodo($todo->id);

        if($todo){
           return $todo->delete();   
        }
    }
}
