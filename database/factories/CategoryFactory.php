<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => $this->faker->word(),
            'slug' => $this->faker->unique()->slug(),
            'description' => $this->faker->sentence(),
            'image' => 'assets/category/top.jpg',
            'parent_id' => null, // or use $this->faker->numberBetween(1, 10) for random parent
            'is_active' => $this->faker->boolean(80), // 80% chance of being true
            'position' => $this->faker->numberBetween(1, 100),
            'meta_title' => $this->faker->sentence(),
            'meta_description' => $this->faker->paragraph(),
            'meta_keywords' => implode(', ', $this->faker->words(5)),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
