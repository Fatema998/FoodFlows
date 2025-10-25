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
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Processing',
                'slug' => 'processing',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Shipped',
                'slug' => 'shipped',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Delivered',
                'slug' => 'delivered',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cancelled',
                'slug' => 'cancelled',
                'status' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}
