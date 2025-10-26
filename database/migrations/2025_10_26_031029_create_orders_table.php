<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED primary key

            $table->string('invoice_id', 55)->unique();
            $table->integer('amount')->default(0);              // Total amount before discount
            $table->integer('discount')->default(0);            // Discount amount
            $table->integer('shipping_charge')->default(0);     // Shipping cost

            // Coupon fields
            $table->string('coupon_code', 55)->nullable();      // Coupon used (e.g. SAVE10)
            $table->integer('coupon_discount')->default(0);     // Discount amount from coupon

            // Customer and status
            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->unsignedBigInteger('order_status_id')->nullable();
            $table->foreign('order_status_id')
                ->references('id')
                ->on('order_statuses')
                ->onDelete('set null');

            $table->timestamps();

            // Indexes for performance
            $table->index(['customer_id', 'order_status_id', 'coupon_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
     Schema::disableForeignKeyConstraints();

    Schema::dropIfExists('order_details');
    Schema::dropIfExists('orders');

    Schema::enableForeignKeyConstraints();    }
};
