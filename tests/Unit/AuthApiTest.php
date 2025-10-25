<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test user registration
     */
    public function test_user_can_register()
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => '123456',
            'password_confirmation' => '123456',
        ]);

        $response->assertStatus(201) // Registration returns 201
                 ->assertJsonStructure([
                     'status',
                     'message',
                     'data' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at']
                 ])->assertJson([
                     'status' => 'success',
                     'message' => 'Request processed successfully',
                 ]);
    }

    /**
     * Test user login
     */
    public function test_user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'john@example.com',
            'password' => bcrypt('123456'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'john@example.com',
            'password' => '123456',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'status',
                     'message',
                     'data' => ['token']
                 ])->assertJson([
                     'status' => 'success',
                     'message' => 'Request processed successfully',
                 ]);
    }

    /**
     * Test user profile (requires token)
     */
    public function test_user_can_view_profile()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/auth/profile');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'status',
                     'message',
                     'data' => ['id', 'name', 'email', 'role', 'created_at', 'updated_at']
                 ])->assertJson([
                     'status' => 'success',
                     'message' => 'Request processed successfully',
                 ]);
    }

    /**
     * Test user logout
     */
    public function test_user_can_logout()
    {
        $user = User::factory()->create();
        $token = $user->createToken('TestToken')->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
                         ->getJson('/api/auth/logout');

        $response->assertStatus(200) // Logout returns 200
                 ->assertJson([
                     'status' => 'success',
                     'message' => 'User logged out successfully', // Match actual message
                     'data' => [],
                 ]);
    }
}
