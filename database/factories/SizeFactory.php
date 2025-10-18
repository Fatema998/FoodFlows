<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Size;

class SizeFactory extends Factory
{
    protected $model = Size::class;

    public function definition()
    {
        $sizes = ['XS','S','M','L','XL','6','7','8','9','10'];
        $types = ['apparel','shoes'];

        return [
            'name' => $this->faker->randomElement($sizes),
            'type' => $this->faker->randomElement($types),
        ];
    }
}
