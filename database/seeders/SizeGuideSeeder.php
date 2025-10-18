<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SizeGuide;
use Illuminate\Support\Facades\DB;

class SizeGuideSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Clear existing data safely
        SizeGuide::truncate();

        // Enable foreign key checks again
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Seed new size guides
        SizeGuide::factory()->count(5)->create();
    }
}
