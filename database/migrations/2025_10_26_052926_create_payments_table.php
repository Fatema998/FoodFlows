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
        Schema::create('payments', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED primary key

            // Foreign keys
            $table->unsignedBigInteger('order_id');
            $table->foreign('order_id')
                ->references('id')
                ->on('orders')
                ->onDelete('cascade');

            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            // Payment details
            $table->integer('amount')->default(0);
            $table->string('trx_id', 55)->nullable();          // Transaction ID
            $table->string('sender_number', 55)->nullable();   // Mobile/bank account number
            $table->string('payment_method', 55)->nullable();  // e.g., bKash, Nagad, Cash
            $table->string('payment_status', 55)->default('pending'); // pending, paid, failed

            $table->timestamps();

            // Index for fast lookup
            $table->index(['order_id', 'customer_id', 'payment_status']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
