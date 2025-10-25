<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductType;

class ProductTypeSeeder extends Seeder
{
    public function run(): void
    {
        
        ProductType::truncate();
        
        $types = ['apparel', 'kids_apparel', 'shoes', 'accessories', 'electronics'];

        foreach($types as $type) {
            ProductType::create(['name' => $type]);
        }
    }
}
