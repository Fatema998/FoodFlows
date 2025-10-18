<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SizeGuideMeasurement;

class SizeGuideMeasurementSeeder extends Seeder
{
    public function run(): void
    {
        SizeGuideMeasurement::truncate();
        SizeGuideMeasurement::factory()->count(50)->create();
    }
}
