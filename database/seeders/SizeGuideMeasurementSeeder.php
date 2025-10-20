<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SizeGuideMeasurement;

class SizeGuideMeasurementSeeder extends Seeder
{
    public function run(): void
    {
        SizeGuideMeasurement::truncate();

        $measurements = [
            // 👕 MEN T-SHIRT (size_guide_id = 1)
            ['size_guide_id' => 1, 'size_label' => 'S',  'chest' => 36, 'waist' => 30, 'hip' => null, 'body_length' => 26, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 1, 'size_label' => 'M',  'chest' => 38, 'waist' => 32, 'hip' => null, 'body_length' => 27, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 1, 'size_label' => 'L',  'chest' => 40, 'waist' => 34, 'hip' => null, 'body_length' => 28, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 1, 'size_label' => 'XL', 'chest' => 42, 'waist' => 36, 'hip' => null, 'body_length' => 29, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],

            // 👗 WOMEN DRESS (size_guide_id = 2)
            ['size_guide_id' => 2, 'size_label' => 'S',  'chest' => 34, 'waist' => 26, 'hip' => 36, 'body_length' => 34, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 2, 'size_label' => 'M',  'chest' => 36, 'waist' => 28, 'hip' => 38, 'body_length' => 36, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 2, 'size_label' => 'L',  'chest' => 38, 'waist' => 30, 'hip' => 40, 'body_length' => 38, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 2, 'size_label' => 'XL', 'chest' => 40, 'waist' => 32, 'hip' => 42, 'body_length' => 40, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],

            // 👟 UNISEX SHOES (size_guide_id = 3)
            ['size_guide_id' => 3, 'size_label' => '6',  'chest' => null, 'waist' => null, 'hip' => null, 'body_length' => null, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => 24.0, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 3, 'size_label' => '7',  'chest' => null, 'waist' => null, 'hip' => null, 'body_length' => null, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => 24.8, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 3, 'size_label' => '8',  'chest' => null, 'waist' => null, 'hip' => null, 'body_length' => null, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => 25.6, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 3, 'size_label' => '9',  'chest' => null, 'waist' => null, 'hip' => null, 'body_length' => null, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => 26.4, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 3, 'size_label' => '10', 'chest' => null, 'waist' => null, 'hip' => null, 'body_length' => null, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => 27.2, 'underbust' => null, 'cup_size' => null],

            // 🧒 KIDS CLOTHING (size_guide_id = 4)
            ['size_guide_id' => 4, 'size_label' => '2-3Y', 'chest' => 22, 'waist' => 21, 'hip' => null, 'body_length' => 36, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 4, 'size_label' => '4-5Y', 'chest' => 24, 'waist' => 22, 'hip' => null, 'body_length' => 42, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 4, 'size_label' => '6-7Y', 'chest' => 26, 'waist' => 23, 'hip' => null, 'body_length' => 48, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 4, 'size_label' => '8-9Y', 'chest' => 28, 'waist' => 24, 'hip' => null, 'body_length' => 54, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
            ['size_guide_id' => 4, 'size_label' => '10-11Y', 'chest' => 30, 'waist' => 25, 'hip' => null, 'body_length' => 58, 'sleeve_length' => null, 'shoulder' => null, 'inseam' => null, 'thigh' => null, 'crotch_depth' => null, 'foot_length' => null, 'underbust' => null, 'cup_size' => null],
        ];

        SizeGuideMeasurement::insert($measurements);
    }
}
