<?php

namespace App\Services;

use App\Repository\AuthRepository;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Laminas\Diactoros\ServerRequestFactory;
use Laminas\Diactoros\Response as Psr7Response;
use Laravel\Passport\Http\Controllers\AccessTokenController;

class AuthService
{
    /**
     * Create a new class instance.
     */
    protected $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        //
        $this->authRepository=$authRepository;
    }

    public function authRegister($request){
        $request=$request->all();
        $request['password']=Hash::make($request['password']);
        $request['role']='user';
               
         return $this->authRepository->registerUser($request);
    }

    public function userLogin($request){

        if(!Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
              return false;
        };

        $user = Auth::user();

         // create API Token
         $token = $user->createToken('My API Token')->plainTextToken;

        $userData =[
            'user'=> new UserResource($user),
            'token'=>$token
        ];

        return $userData;

    }

    public function userProfile(){
        $authUser = Auth::user();

        if(!$authUser){
            return false;
        }

        return new UserResource($authUser);
    }

    public function userLogout(){
        $authUser = Auth::user();

        if($authUser){
            $authUser->currentAccessToken()->delete();
            return true;
        }
        return false;
    }

    public function getAuthUser(){
        return Auth::user();
    }
    
}
