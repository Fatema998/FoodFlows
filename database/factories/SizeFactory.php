<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Size;

class SizeFactory extends Factory
{
    protected $model = Size::class;

    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement(['men','women','kids','other','unisex']),
            'name' => $this->faker->word,
            'numeric' => $this->faker->numberBetween(1,50),
            'chest_min' => $this->faker->numberBetween(20,50),
            'chest_max' => $this->faker->numberBetween(20,50),
            'waist_min' => $this->faker->numberBetween(20,50),
            'waist_max' => $this->faker->numberBetween(20,50),
            'hip_min' => $this->faker->numberBetween(20,50),
            'hip_max' => $this->faker->numberBetween(20,50),
            'bust_min' => $this->faker->numberBetween(20,50),
            'bust_max' => $this->faker->numberBetween(20,50),
            'is_active' => true,
            'position' => 1,
        ];
    }
}
