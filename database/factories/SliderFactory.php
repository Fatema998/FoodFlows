<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Slider>
 */
class SliderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'subtitle' => $this->faker->sentence,
            'image' => '/assets/sliders/slider-01.jpg',
            'button_text' => $this->faker->word,
            'link' => $this->faker->url,
            'position' => $this->faker->numberBetween(0, 10),
            'is_active' => $this->faker->boolean(80), // 80% chance of being true
            'layout' => $this->faker->randomElement(['left', 'right']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
