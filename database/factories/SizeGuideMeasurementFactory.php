<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\SizeGuideMeasurement;
use App\Models\SizeGuide;

class SizeGuideMeasurementFactory extends Factory
{
    protected $model = SizeGuideMeasurement::class;

    public function definition()
    {
        return [
            'size_guide_id' => SizeGuide::factory(),
            'size_label' => $this->faker->randomElement(['S','M','L','XL','6','7','8','9']),
            'chest' => $this->faker->randomFloat(2, 28, 48),
            'waist' => $this->faker->randomFloat(2, 24, 44),
            'hip' => $this->faker->randomFloat(2, 30, 50),
            'body_length' => $this->faker->randomFloat(2, 20, 40),
            'sleeve_length' => $this->faker->randomFloat(2, 7, 15),
            'shoulder' => $this->faker->randomFloat(2, 14, 20),
            'inseam' => $this->faker->randomFloat(2, 28, 36),
            'foot_length' => $this->faker->randomFloat(2, 6, 12),
        ];
    }
}
