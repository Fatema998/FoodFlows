<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\Color;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- STEP 1: CLEANUP ---
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('product_variants')->truncate();
        DB::table('product_sizes')->truncate();
        DB::table('products')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // --- STEP 2: PREPARE DATA ---
        // Create: [parentId => [subId, subId, ...]]
        $categoryMap = Category::whereNotNull('parent_id')
            ->get()
            ->groupBy('parent_id')
            ->map(fn($group) => $group->pluck('id')->toArray())
            ->toArray();

        $colors = Color::pluck('id')->toArray();
        $sizes = Size::pluck('id')->toArray();

        if (empty($categoryMap)) {
            $this->command->warn("No subcategories found. Please run CategorySeeder first!");
            return;
        }

        // --- STEP 3: SEED PRODUCTS ---
        foreach ($categoryMap as $parentId => $subIds) {
            // Create 10 products for every Parent Category group
            foreach (range(1, 5) as $index) {
                
                $randomSubId = $subIds[array_rand($subIds)];

                // Create the product passing the synced IDs
                $product = Product::factory()->create([
                    'category_id'    => $parentId,
                    'subcategory_id' => $randomSubId,
                ]);

                // --- STEP 4: ATTACH VARIANTS ---
                
                // Assign 3-5 random colors (Variants)
                $productColors = (array) array_rand(array_flip($colors), rand(3, 5));
                foreach ($productColors as $colorId) {
                    DB::table('product_variants')->insert([
                        'product_id' => $product->id,
                        'color_id'   => $colorId,
                        'image'      => '/assets/products/images/' . rand(1, 4) . '.jpg',
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }

                // Assign 1-4 random sizes
                $productSizes = (array) array_rand(array_flip($sizes), rand(1, 4));
                foreach ($productSizes as $sizeId) {
                    DB::table('product_sizes')->insert([
                        'product_id' => $product->id,
                        'size_id'    => $sizeId,
                        'created_at' => now(),
                        'updated_at' => now()
                    ]);
                }
            }
        }
        
        $this->command->info("Products seeded successfully with correct category mapping!");
    }
}