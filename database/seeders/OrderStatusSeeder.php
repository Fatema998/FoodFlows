<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        OrderStatus::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        DB::table('order_statuses')->insert([
            [
                'name' => 'Pending',
                'slug' => 'pending',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Processing',
                'slug' => 'processing',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Shipped',
                'slug' => 'shipped',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Success',
                'slug' => 'success',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cancelled',
                'slug' => 'cancelled',
                'is_active' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}
