<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\SizeSeeder;
use Database\Seeders\BrandSeeder;
use Database\Seeders\ColorSeeder;
use Database\Seeders\SliderSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\CategorySeeder;
use Illuminate\Support\Facades\Hash;
use Database\Seeders\SizeGuideSeeder;
use Database\Seeders\ProductTypeSeeder;
use Database\Seeders\SizeGuideMeasurementSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user
        User::factory()->admin()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'phone' => '0123456789',
        ]);

        // Create a specific normal user
        User::factory()->create([
            'name' => 'Rafi',
            'email' => 'raficse00@gmail.com',
            'password' => bcrypt('12345678'),
            'phone' => '0123456789',
        ]);

        // Create 10 normal users
        User::factory(20)->create();

        // Call other seeders
        $this->call([
            CategorySeeder::class,
            BrandSeeder::class,
            SliderSeeder::class,
            ColorSeeder::class,
            ProductTypeSeeder::class,
            SizeSeeder::class,
            SizeGuideSeeder::class,
            SizeGuideMeasurementSeeder::class,
            ProductSeeder::class,
            
        ]);
    }
}
