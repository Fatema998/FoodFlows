<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    public function run(): void
    {
        // Clear table safely
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Size::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Adult apparel sizes
        $apparelSizes = ['XS','S','M','L','XL'];
        foreach ($apparelSizes as $size) {
            Size::create(['name' => $size, 'type' => 'apparel']);
        }

        // Adult shoe sizes
        $shoeSizes = ['6','7','8','9','10'];
        foreach ($shoeSizes as $size) {
            Size::create(['name' => $size, 'type' => 'shoes']);
        }

        // Kids apparel sizes
        $kidsApparelSizes = ['1-2Y','2-3Y','3-4Y','4-5Y','5-6Y'];
        foreach ($kidsApparelSizes as $size) {
            Size::create(['name' => $size, 'type' => 'kids_apparel']);
        }

        // Kids shoe sizes
        $kidsShoeSizes = ['1','2','3','4','5','6'];
        foreach ($kidsShoeSizes as $size) {
            Size::create(['name' => $size, 'type' => 'kids_shoes']);
        }
    }
}
