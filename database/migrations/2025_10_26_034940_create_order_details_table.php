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
    Schema::create('order_details', function (Blueprint $table) {
                $table->id(); // BIGINT UNSIGNED

                // Foreign keys
                $table->unsignedBigInteger('order_id');
                $table->foreign('order_id')
                    ->references('id')
                    ->on('orders')
                    ->onDelete('cascade');

                $table->unsignedBigInteger('product_id');
                $table->foreign('product_id')
                    ->references('id')
                    ->on('products')
                    ->onDelete('cascade');

                // Product snapshot info
                $table->string('product_name');
                $table->string('product_code')->nullable();

                // Variant details
                $table->string('color', 55)->nullable();
                $table->string('size', 55)->nullable();

                // Pricing & quantity
                $table->integer('purchase_price')->default(0);
                $table->integer('sale_price')->default(0);
                $table->integer('qty')->default(1);

                $table->timestamps();

                $table->index(['order_id', 'product_id']);
            });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
