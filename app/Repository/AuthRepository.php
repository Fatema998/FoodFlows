<?php

namespace App\Repository;

use App\Models\User;

class AuthRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function registerUser($userRequest){
      // Register 
      return User::create($userRequest);
    }
}
