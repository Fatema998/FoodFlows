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
            $table->id();
            $table->string('invoice_id', 55)->unique();
            $table->integer('total_amount')->default(0);
            $table->integer('discount')->default(0);
            $table->integer('shipping_charge')->default(0);
            $table->string('coupon_code', 55)->nullable();
            $table->integer('coupon_discount')->default(0);

            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Use slug instead of numeric ID
            $table->string('order_status', 50)->nullable()->default('pending');
            $table->foreign('order_status')
                ->references('slug')
                ->on('order_statuses')
                ->onDelete('set null');

            $table->timestamps();

            // Indexes
            $table->index(['customer_id', 'order_status', 'coupon_code']);
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
