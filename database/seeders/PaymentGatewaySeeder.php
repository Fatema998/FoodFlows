<?php

namespace Database\Seeders;

use App\Models\PaymentGateway;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PaymentGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        PaymentGateway::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('payment_gateways')->insert([
            [
                'name' => 'Cash on Devlivery',
                'type' => 'cash',
                "link" => "",
                'app_key' => '',
                'app_secret' => '',
                'username' => '',
                'password' => '',
                'base_url' => '',
                'success_url' => '',
                'return_url' => '',
                'prefix' => 'BK',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bkash',
                'type' => 'bkash',
                "link" => "",
                'app_key' => 'your_bkash_app_key',
                'app_secret' => 'your_bkash_secret',
                'username' => 'bkash_user',
                'password' => 'bkash_pass',
                'base_url' => 'https://tokenized.pay.bkash.com',
                'success_url' => 'https://yourapp.com/payment/success',
                'return_url' => 'https://yourapp.com/payment/return',
                'prefix' => 'BK',
                'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nagad',
                'type' => 'nagad',
                "link" => "",
                'app_key' => 'your_nagad_app_key',
                'app_secret' => 'your_nagad_secret',
                'username' => 'nagad_user',
                'password' => 'nagad_pass',
                'base_url' => 'https://api.mynagad.com',
                'success_url' => 'https://yourapp.com/payment/success',
                'return_url' => 'https://yourapp.com/payment/return',
                'prefix' => 'NG',
                 'status' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'SSLCOMMERZ',
                'type' => 'sslcommerz',
                "link" => "",
                'app_key' => 'your_ssl_store_id',
                'app_secret' => 'your_ssl_password',
                'username' => 'ssl_user',
                'password' => 'ssl_pass',
                'base_url' => 'https://sandbox.sslcommerz.com',
                'success_url' => 'https://yourapp.com/payment/success',
                'return_url' => 'https://yourapp.com/payment/return',
                'prefix' => 'SSL',
                'status' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
