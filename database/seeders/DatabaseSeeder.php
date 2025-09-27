<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\BrandSeeder;
use Database\Seeders\CategorySeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'admin@example.com'],
        //     [
        //         'name' => 'Admin',
        //         'password' => Hash::make('password'),
        //         'email_verified_at' => now(),
        //     ]
        // );
         // Create one admin
        User::factory()->admin()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'phone' => '0123456789',
        ]);

        // Create 10 normal users
        User::factory(10)->create();

           $this->call([
            CategorySeeder::class,
            BrandSeeder::class,
        ]);
    }
}
