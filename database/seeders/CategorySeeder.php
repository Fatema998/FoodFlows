<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks to avoid FK errors
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Category::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Define parent categories
        $parentCategories = [
            'Men',
            'Women',
            'Kids',
            'Electronics',
            'Accessories'
        ];

        foreach ($parentCategories as $parentName) {
            $parent = Category::create([
                'name' => $parentName,
                'slug' => strtolower(str_replace(' ', '-', $parentName)),
                'image' => '/assets/categories/top.jpg',
                'is_active' => true,
                'position' => 0,
            ]);

            // Add subcategories for each parent
            switch ($parentName) {
                case 'Men':
                    $subCategories = ['T-Shirts', 'Pants', 'Shoes', 'Jumpsuits', 'Underwear'];
                    break;
                case 'Women':
                    $subCategories = ['Tops', 'Pants', 'Shoes', 'Jumpsuits', 'Bra & Panties'];
                    break;
                case 'Kids':
                    $subCategories = ['T-Shirts', 'Pants', 'Shoes', 'Jumpsuits', 'Accessories'];
                    break;
                case 'Electronics':
                    $subCategories = ['Mobiles', 'Laptops', 'Headphones', 'Wearables'];
                    break;
                case 'Accessories':
                    $subCategories = ['Bags', 'Belts', 'Hats', 'Sunglasses'];
                    break;
                default:
                    $subCategories = [];
            }

            foreach ($subCategories as $subName) {
                 $slug = strtolower(str_replace(' ', '-', $parent->name . '-' . $subName));
                Category::create([
                    'name' => $subName,
                    'slug' => $slug,
                    'parent_id' => $parent->id,
                    'image' => '/assets/categories/top.jpg',
                    'is_active' => true,
                    'position' => 0,
                ]);
            }
        }
    }
}
