<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing products
     DB::statement('SET FOREIGN_KEY_CHECKS=0;');

     DB::table('product_variants')->truncate();
     DB::table('product_sizes')->truncate();
     DB::table('products')->truncate();

     DB::statement('SET FOREIGN_KEY_CHECKS=1;');


        // Create 10 products
        $products = Product::factory()->count(50)->create();

        // Attach random colors and sizes
        $colors = Color::pluck('id')->toArray();
        $sizes = Size::pluck('id')->toArray();

        foreach ($products as $product) {
            // Assign 1-3 random colors
            $productColors = array_rand(array_flip($colors), rand(1, 3));
            foreach ((array)$productColors as $colorId) {
                DB::table('product_variants')->insert([
                    'product_id' => $product->id,
                    'color_id' => $colorId,
                    'image' => '/assets/products/images/women-yellow-1.jpg',
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            // Assign 1-4 random sizes
            $productSizes = array_rand(array_flip($sizes), rand(1, 4));
            foreach ((array)$productSizes as $sizeId) {
                DB::table('product_sizes')->insert([
                    'product_id' => $product->id,
                    'size_id' => $sizeId,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
