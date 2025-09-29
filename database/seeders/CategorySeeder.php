<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    
     DB::table('categories')->delete(); // clear table before seeding
     $parents =  Category::factory()->count(5)->create();

      // Create 5 subcategories for each parent
      $parents->each(function ($parent) {
          Category::factory()->count(3)->create([
              'parent_id' => $parent->id,
          ]);
      });
    }
}
