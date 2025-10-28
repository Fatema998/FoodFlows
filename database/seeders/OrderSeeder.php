<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customerId = 1; // Ensure this customer exists
        $shippingChargeId = 1; // Ensure this exists in `shipping_charges` table
        $orderStatusId = 1; // Assuming 'Pending' exists
        $colorRedId = 1; // Ensure this exists in `colors` table
        $colorBlueId = 2;
        $sizeMId = 1; // Ensure this exists in `sizes` table
        $size32Id = 2;

        // === Insert into orders ===
        $orderId = DB::table('orders')->insertGetId([
            'invoice_id' => strtoupper(Str::random(8)),
            'total_amount' => 2500,
            'discount' => 200,
         
            'coupon_code' => 'SAVE10',
            'coupon_discount' => 100,
            'customer_id' => $customerId,
            'order_status_id' => $orderStatusId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // === Insert into shippings ===
        DB::table('shippings')->insert([
            'order_id' => $orderId,
            'customer_id' => $customerId,
            'name' => 'Rafiul Islam',
            'email' => 'rafi@example.com',
            'phone' => '017XXXXXXXX',
            'address' => 'House 45, Dhanmondi',
            'shipping_charge_id' => $shippingChargeId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // === Insert into order_details ===
        DB::table('order_details')->insert([
            [
                'order_id' => $orderId,
                'product_id' => 1,
                'product_name' => 'T-shirt',
                'product_code' => 'TS1001',
                'color_id' => $colorRedId,
                'size_id' => $sizeMId,
                'purchase_price' => 700,
                'sale_price' => 1000,
                'qty' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'order_id' => $orderId,
                'product_id' => 2,
                'product_name' => 'Jeans',
                'product_code' => 'JN2002',
                'color_id' => $colorBlueId,
                'size_id' => $size32Id,
                'purchase_price' => 1000,
                'sale_price' => 1500,
                'qty' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // === Insert into payments ===
        DB::table('payments')->insert([
            'order_id' => $orderId,
            'customer_id' => $customerId,
            'total_amount' => 2500,
            'trx_id' => 'TX' . strtoupper(Str::random(6)),
            'sender_number' => '017XXXXXXXX',
            'payment_method' => 'bKash',
            'payment_status' => 'paid',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
