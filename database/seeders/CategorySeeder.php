<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Category::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Define parents with their specific images
        $categories = [
            'Men'         => '/assets/categories/men.jpg',
            'Women'       => '/assets/categories/top.jpg',
            'Kids'         => '/assets/categories/kid.jpg',
            'Accessories'   => '/assets/categories/accessories.jpg',
        ];

        foreach ($categories as $name => $image) {
            $parent = Category::create([
                'name'      => $name,
                'slug'      => Str::slug($name),
                'image'     => $image,
                'is_active' => true,
                'position'  => 0,
            ]);

            // Define subcategories based on parent name
            $subCategories = match ($name) {
                'Men'         => ['T-Shirts', 'Pants', 'Shoes', 'Jumpsuits', 'Underwear'],
                'Women'       => ['Tops', 'Pants', 'Shoes', 'Jumpsuits', 'Bra & Panties'],
                'Kids'         => ['T-Shirts', 'Pants', 'Shoes', 'Jumpsuits', 'Accessories'],
                'Accessories'   => ['Bags', 'Belts', 'Hats', 'Sunglasses'],
                default       => [],
            };

            foreach ($subCategories as $subName) {
                Category::create([
                    'name'      => $subName,
                    // Slug includes parent for uniqueness: e.g., men-shoes
                    'slug'      => Str::slug($parent->name . '-' . $subName),
                    'parent_id' => $parent->id,
                    'image'     => $image, // Subcategories inherit parent image category
                    'is_active' => true,
                    'position'  => 0,
                ]);
            }
        }
    }
}