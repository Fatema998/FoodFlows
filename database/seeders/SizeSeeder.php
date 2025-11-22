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
        $apparelSizes = [
            'XS' => 'Extra Small',
            'S'  => 'Small',
            'M'  => 'Medium',
            'L'  => 'Large',
            'XL' => 'Extra Large',
            'XXL'=> 'Double Extra Large',
        ];
        foreach ($apparelSizes as $name => $label) {
            Size::create(['name' => $name, 'type' => 'apparel', 'label' => $label]);
        }

        // Adult shoe sizes
        $shoeSizes = [
            '6'  => '6',
            '7'  => '7',
            '8'  => '8',
            '9'  => '9',
            '10' => '10',
        ];
        foreach ($shoeSizes as $name => $label) {
            Size::create(['name' => $name, 'type' => 'shoes', 'label' => $label]);
        }

        // Kids apparel sizes
        $kidsApparelSizes = [
            '1-2Y' => '1-2 Years',
            '2-3Y' => '2-3 Years',
            '3-4Y' => '3-4 Years',
            '4-5Y' => '4-5 Years',
            '5-6Y' => '5-6 Years',
        ];
        foreach ($kidsApparelSizes as $name => $label) {
            Size::create(['name' => $name, 'type' => 'kids_apparel', 'label' => $label]);
        }

        // Kids shoe sizes
        $kidsShoeSizes = [
            '1' => '1',
            '2' => '2',
            '3' => '3',
            '4' => '4',
            '5' => '5',
            '6' => '6',
        ];
        foreach ($kidsShoeSizes as $name => $label) {
            Size::create(['name' => $name, 'type' => 'kids_shoes', 'label' => $label]);
        }
    }
}
