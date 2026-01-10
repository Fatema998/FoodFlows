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
            'title' => $this->faker->words(3, true), // Cleaner way to get 3 words
            'subtitle' => $this->faker->words(2, true),
            'description'=> $this->faker->sentence,
            'image' => '/assets/sliders/slider-fashion-' . $this->faker->numberBetween(1, 3) . '.png',
            'button_text' => $this->faker->word,
            'link' => $this->faker->url,
            'position' => $this->faker->numberBetween(0, 10),
            'is_active' => 1,
            'layout' => $this->faker->randomElement(['left', 'right']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
