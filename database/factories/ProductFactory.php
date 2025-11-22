<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\ProductType;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = $this->faker->numberBetween(50, 1000); // selling price
        $purchasePrice = $this->faker->numberBetween(30, $price - 10); // cost price
        $discount = $this->faker->numberBetween(0, 30); // percentage discount
        $sellPrice = $price - ($price * $discount / 100);

        $brandIds = Brand::pluck('id')->toArray();
        $categoryIds = Category::pluck('id')->toArray();
        $subcategoryId = $this->faker->optional()->randomElement($categoryIds);
        $productTypeIds = ProductType::pluck('id')->toArray();

        $totalStock = $this->faker->numberBetween(10, 100);
        $reservedStock = $this->faker->numberBetween(0, 5);

        return [
            'title' => $title = $this->faker->words(3, true),
            'slug' => Str::slug($title) . '-' . Str::random(5),
            'brand_id' => $this->faker->randomElement($brandIds),
            'category_id' => $this->faker->randomElement($categoryIds),
            'subcategory_id' => $subcategoryId,
            'product_type_id' => $this->faker->randomElement($productTypeIds),
            
            // 'purchase_price' => $purchasePrice,
            // 'price' => $price,
            // 'discount' => $discount,
            // 'sell_price' => $sellPrice,

            'purchase_price' => (int) $purchasePrice,
            'price' => (int) $price,
            'discount' => (int) $discount,
            'sell_price' => (int) $sellPrice,


            'product_code' => strtoupper(Str::random(8)),
            'sell_count' => $this->faker->numberBetween(0, 100),

            'total_stock' => $totalStock,
            'reserved_stock' => $reservedStock,

            'main_thumbnail' => '/assets/products/thumbnail/product-4.jpg',
            'short_description' => $this->faker->sentence(),
            'long_descriptions' => $this->faker->paragraphs(3, true),
            'materials' => $this->faker->paragraph(),

            'is_todays_pick'=> $this->faker->boolean(25),
            'is_new_arrival' => $this->faker->boolean(30),
            'is_trending' => $this->faker->boolean(20),
            'is_limited' => $this->faker->boolean(10),
            'is_active' => $this->faker->boolean(90),
            'is_featured' => $this->faker->boolean(15),
            'is_flash_deal' => $this->faker->boolean(5),
            'flash_deal_start' => $this->faker->optional()->dateTimeBetween('now', '+7 days'),
            'flash_deal_end' => $this->faker->optional()->dateTimeBetween('+8 days', '+15 days'),

            'meta_title' => $this->faker->sentence(),
            'meta_description' => $this->faker->paragraph(),
            'meta_keywords' => implode(', ', $this->faker->words(5)),

            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
