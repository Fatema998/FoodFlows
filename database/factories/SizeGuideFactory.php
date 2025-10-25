<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\SizeGuide;

class SizeGuideFactory extends Factory
{
    protected $model = SizeGuide::class;

    public function definition()
    {
        return [
            'sub_category_id' => null,
            'product_type' => 'apparel',
            'gender' => $this->faker->randomElement(['men','women','kids']),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'image' => null,
        ];
    }
}
