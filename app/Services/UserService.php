<?php

namespace App\Services;

use Illuminate\Support\Str;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    // Create user (hashes password)
    public function createUser(array $data)
    {
        // password hash
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }else{
            $data['password'] = Hash::make("12345678");
        }

        // Generate unique email if not provided
        // if user is not login but he ordered basic information then create to the user account set random email but phone number valid 
        if (empty($data['email'])) {
            do {
                $randomEmail = strtolower(Str::random(10) . '@example.com');
            } while ($this->userRepository->findByEmail($randomEmail));

            $data['email'] = $randomEmail;
        }
          
        $data['role']='user';

        return $this->userRepository->create($data);
    }

    // Get user by ID
    public function getUserById(int $id)
    {
        return $this->userRepository->findById($id);
    }

    // Get user by email
    public function getUserByEmail($email)
    {
        if (!$email) {
            return null;
        }
        return $this->userRepository->findByEmail($email);
    }

    // Get user by phone
    public function getUserByPhone($phone)
    {
        if (!$phone) {
           return null;
        }
        return $this->userRepository->findByPhone($phone);
    }

    // Update user
    public function updateUser(int $id, array $data)
    {
        $user = $this->getUserById($id);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $this->userRepository->update($user, $data);
    }

    // Delete user
    public function deleteUser(int $id)
    {
        $user = $this->getUserById($id);
        return $this->userRepository->delete($user);
    }
}
