<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      DB::statement('SET FOREIGN_KEY_CHECKS=0;');
      Brand::truncate(); // safer than delete() as it resets auto-increment
      DB::statement('SET FOREIGN_KEY_CHECKS=1;');

      Brand::factory()->count(10)->create();
    }
}
