<?php

namespace Database\Seeders;

use App\Models\ShippingCharge;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ShippingChargeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        ShippingCharge::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

         DB::table('shipping_charges')->insert([
            [
                'name' => 'Inside City',
                'amount' => 60,
                 'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Outside City',
                'amount' => 120,
                  'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'International',
                'amount' => 500,
                 'status' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
