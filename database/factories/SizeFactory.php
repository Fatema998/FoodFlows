<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Size;

class SizeFactory extends Factory
{
    protected $model = Size::class;

    public function definition()
    {
        // Define available sizes and their corresponding labels
        $sizeMap = [
            'XS'  => 'Extra Small',
            'S'   => 'Small',
            'M'   => 'Medium',
            'L'   => 'Large',
            'XL'  => 'Extra Large',
            'XXL' => 'Double Extra Large',  // <-- Added XXL
            '6'   => '6',
            '7'   => '7',
            '8'   => '8',
            '9'   => '9',
            '10'  => '10',
        ];

        $types = ['apparel', 'shoes'];

        $name = $this->faker->randomElement(array_keys($sizeMap));

        return [
            'name'  => $name,
            'type'  => $this->faker->randomElement($types),
            'label' => $sizeMap[$name],

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
