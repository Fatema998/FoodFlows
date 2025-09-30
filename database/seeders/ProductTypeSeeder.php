<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductType;

class ProductTypeSeeder extends Seeder
{
    public function run(): void
    {
        // Clear old data
        ProductType::truncate();

        $productTypesData = [
            'men' => [
                ['name'=>'pant','size_required'=>true],
                ['name'=>'shirt','size_required'=>true],
                ['name'=>'t-shirt','size_required'=>true],
                ['name'=>'polo-shirt','size_required'=>true],
                ['name'=>'jersey','size_required'=>true],
                ['name'=>'panjabi','size_required'=>true],
                ['name'=>'belt','size_required'=>false],
                ['name'=>'hat','size_required'=>false]
            ],
            'women' => [
                ['name'=>'dress','size_required'=>true],
                ['name'=>'penti','size_required'=>true],
                ['name'=>'jacket','size_required'=>true],
                ['name'=>'skirt','size_required'=>true],
                ['name'=>'tops','size_required'=>true],
                ['name'=>'bra','size_required'=>true],
                ['name'=>'bag','size_required'=>false],
                ['name'=>'scarf','size_required'=>false]
            ],
            'kids' => [
                ['name'=>'t-shirt','size_required'=>true],
                ['name'=>'pant','size_required'=>true],
                ['name'=>'dress','size_required'=>true],
                ['name'=>'top','size_required'=>true],
            ],
            'unisex' => [
                ['name'=>'shoes','size_required'=>true],
                ['name'=>'socks','size_required'=>false],
                ['name'=>'cap','size_required'=>false],
            ]
        ];

        foreach($productTypesData as $gender => $products) {
            foreach($products as $product) {
                ProductType::create([
                    'name' => $product['name'],
                    'gender' => $gender,
                    'size_required' => $product['size_required'],
                    'is_active' => true
                ]);
            }
        }
    }
}
