<?php

namespace App\Http\Controllers\Auth;


use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\AuthLogin;
use App\Http\Requests\AuthRegister;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Register new User
     * @params App/Requests/RegisterRequest $request
     * @return JSONResponse
     */
    public function register(AuthRegister $request)
    {
        try{
            
            $response =  $this->authService->authRegister($request);

        if ($response) {
           return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message:  self::SUCCESS_MESSAGE,
                    data: $response,
                 );     
        }

        return ApiResponse::error(
            status:self::ERROR_STATUS,
             message: self::FAILED_MESSAGE,
             statusCode: 400
            );     

        }catch(Exception $e){
            Log::error('Unable to Register user :' . $e->getMessage() . '- Line no. ' . $e.getLine());
            return ApiResponse::error(
                    status:self::ERROR_STATUS,
                    message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                    statusCode: 400
                );     
        }
    }

    /**
     * Login User.
     */
   public function login(AuthLogin $request)
    {
        try {
            $loginResponse = $this->authService->userLogin($request);

            if (! $loginResponse) {
                return ApiResponse::error(status: self::ERROR_STATUS, message: self::INVALID_CREDENTIALS, statusCode: self::ERROR);
            }

            return ApiResponse::success(status: self::SUCCESS_STATUS, message: self::SUCCESS_MESSAGE, data: $loginResponse, statusCode: self::SUCCESS);

        } catch (Exception $e) {
            Log::error('Exception occured while logging user' . $e->getMessage());
            return ApiResponse::success(status: self::ERROR_STATUS, message: self::EXCEPTION_MESSAGE, statusCode: self::ERROR);
        }
    }


    /**
     * Function : Auth user data / Profile data
     * @params NA
     * @return JSONResponse
     */
    public function userProfile()
    {
 
           try {

            
           $authUser =  $this->authService->userProfile();

            if ($authUser) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $authUser,
                );
            }

            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::USER_NOT_FOUND,
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
     * Function : Auth user data / Profile data
     * @params NA
     * @return JSONResponse
     */
    public function userLogout()
    {
           try {
           $response =  $this->authService->userLogout();

            if ($response) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::USER_LOGGED_OUT,
                );
            }

            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::USER_NOT_FOUND,
                statusCode: 400
            );

        } catch (Exception $e) {
            Log::error('Unable to logout user: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            
            return ApiResponse::error(
                status:self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 400
            );
        }
    }
}
