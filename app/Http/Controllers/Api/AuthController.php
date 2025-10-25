<?php

namespace App\Http\Controllers\Api;

use App\Helper\ApiResponse;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthLogin;
use App\Http\Requests\Auth\AuthRegister;

/**
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     tags={"Auth"},
     *     summary="User Registration",
     *     description="Register a new user. Role is automatically set to 'user'.",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password","password_confirmation"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="123456"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User registered successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="User registered successfully"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="email", type="string", example="john@example.com"),
     *                 @OA\Property(property="role", type="string", example="user")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="status", type="string", example="error"),
     *             @OA\Property(property="message", type="string", example="Validation failed"),
     *             @OA\Property(property="errors", type="object",
     *                 @OA\Property(property="email", type="string", example="The email has already been taken.")
     *             )
     *         )
     *     )
     * )
     */
    public function register(AuthRegister $request)
    {
        try {
            $response = $this->authService->authRegister($request);

            if ($response) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $response,
                     statusCode: 201
                );
            }

            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::FAILED_MESSAGE,
                statusCode: 400
            );
        } catch (\Exception $e) {
            Log::error('Unable to register user: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 500
            );
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     tags={"Auth"},
     *     summary="User login",
     *     description="Authenticate user with email and password",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful login",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Login successful"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOi..."),
     *                 @OA\Property(property="user", type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="John Doe"),
     *                     @OA\Property(property="email", type="string", example="john@example.com")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response=401, description="Invalid credentials")
     * )
     */
    public function login(AuthLogin $request)
    {
        try {
            $loginResponse = $this->authService->userLogin($request);

            if (! $loginResponse) {
                return ApiResponse::error(
                    status: self::ERROR_STATUS,
                    message: self::INVALID_CREDENTIALS,
                    statusCode: 401
                );
            }

            return ApiResponse::success(
                status: self::SUCCESS_STATUS,
                message: self::SUCCESS_MESSAGE,
                data: $loginResponse
            );
        } catch (\Exception $e) {
            Log::error('Exception occurred while logging in user: ' . $e->getMessage());
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 500
            );
        }
    }

    /**
     * @OA\Get(
     *     path="/api/auth/profile",
     *     tags={"Auth"},
     *     summary="Get User Profile",
     *     description="Retrieve authenticated user profile",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Profile retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Profile retrieved successfully"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="name", type="string", example="John Doe"),
     *                 @OA\Property(property="email", type="string", example="john@example.com")
     *             )
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function userProfile()
    {
        try {
            $authUser = $this->authService->userProfile();

            if ($authUser) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    message: self::SUCCESS_MESSAGE,
                    data: $authUser
                );
            }

            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::USER_NOT_FOUND,
                statusCode: 404
            );
        } catch (\Exception $e) {
            Log::error('Unable to fetch profile: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 500
            );
        }
    }

    /**
     * @OA\Get(
     *     path="/api/auth/logout",
     *     tags={"Auth"},
     *     summary="User Logout",
     *     description="Logout and revoke access token",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="User logged out successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="User logged out successfully")
     *         )
     *     ),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function userLogout()
    {
        try {
            $response = $this->authService->userLogout();

            if ($response) {
                return ApiResponse::success(
                    status: self::SUCCESS_STATUS,
                    
                    message: self::USER_LOGGED_OUT
                );
            }

            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::USER_NOT_FOUND,
                statusCode: 400
            );
        } catch (\Exception $e) {
            Log::error('Unable to logout user: ' . $e->getMessage() . ' - Line no. ' . $e->getLine());
            return ApiResponse::error(
                status: self::ERROR_STATUS,
                message: self::EXCEPTION_MESSAGE . $e->getMessage(),
                statusCode: 500
            );
        }
    }
}
