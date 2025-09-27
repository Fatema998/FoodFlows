<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\TodoService;
use App\Http\Requests\TodoRequest;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{

    protected  $todoService;

    public function __construct(TodoService $todoService){
        $this->todoService=$todoService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            
            $todos =  $this->todoService->getTodos();

            if ($todos) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $todos,
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Unable to login user: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            
            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 400
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoRequest $request)
    {
        //
         try{
            
            $todo =  $this->todoService->storeTodo($request);

            if ($todo) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $todo,
                            statusCode: self::CREATED, 
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Unable to login user: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            
            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 400
            );
        }

    }

    /**
     * Display the specified resource.
     */
    public function show($todo)
    {
         try{
            
             $todoData = $this->todoService->showTodo($todo);
            //  dd($todoData);

            if ($todoData) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $todoData,
                            statusCode: self::SUCCESS, 
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Exception occured while fetching the todo: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            
            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 400
            );
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TodoRequest $request, Todo $todo)
    {
        //
          try{
            
             $todoData = $this->todoService->updateTodo($request,$todo);
            //  dd($todoData);

            if ($todoData) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message: self::SUCCESS_MESSAGE,
                            data: $todo,
                            statusCode: self::SUCCESS, 
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: self::FAILED_MESSAGE,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Exception occured while updating the todo: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            
            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 400
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
         try{
             $todo = $this->todoService->deleteTodo($todo);

            if ($todo) {
                return ApiResponse::success(
                            status: self::SUCCESS_STATUS,
                            message:'Todo ' .  self::DELETED_SUCCESS,
                            statusCode: self::SUCCESS, 
                        );
                }

                return ApiResponse::error(
                        status:self::ERROR_STATUS,
                        message: self::DELETED_FAILED,
                        statusCode: 400
                    );

        } catch (Exception $e) {
            Log::error('Exception occured while deleting the todo: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            
            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 400
            );
        }
    }
}
