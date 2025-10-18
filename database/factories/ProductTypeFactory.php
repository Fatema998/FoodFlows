<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ProductType;

class ProductTypeFactory extends Factory
{
    protected $model = ProductType::class;

    public function definition()
    {
        $types = ['apparel', 'shoes', 'accessories', 'electronics'];
        return [
            'name' => $this->faker->unique()->randomElement($types),
        ];
    }
}
