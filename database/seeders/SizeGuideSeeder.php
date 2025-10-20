<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SizeGuide;
use Illuminate\Support\Facades\DB;

class SizeGuideSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        SizeGuide::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $sizeGuides = [
            [
                'sub_category_id' => null,
                'product_type' => 'apparel',
                'gender' => 'men',
                'title' => 'Men T-Shirt Size Guide',
                'description' => 'Standard measurements for men\'s t-shirts.',
                'image' => 'images/sizeguides/men_tshirt.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sub_category_id' => null,
                'product_type' => 'apparel',
                'gender' => 'women',
                'title' => 'Women Dress Size Guide',
                'description' => 'Size chart for women’s dresses and tops.',
                'image' => 'images/sizeguides/women_dress.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sub_category_id' => null,
                'product_type' => 'shoes',
                'gender' => 'unisex',
                'title' => 'Unisex Shoe Size Guide',
                'description' => 'Conversion chart for international shoe sizes.',
                'image' => 'images/sizeguides/shoes.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sub_category_id' => null,
                'product_type' => 'apparel',
                'gender' => 'kids',
                'title' => 'Kids Clothing Size Guide',
                'description' => 'Size guide for children\'s shirts, pants, and dresses.',
                'image' => 'images/sizeguides/kids_clothing.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        SizeGuide::insert($sizeGuides);
    }
}
