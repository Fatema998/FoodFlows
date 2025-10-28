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
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->integer('order_id');
            $table->integer('customer_id');
            $table->string('name')->length('255');  
            $table->string('email')->length('255');                
            $table->string('phone')->length('255');    
            $table->string('address')->length('255')->nullable();
            $table->unsignedBigInteger('shipping_charge_id')->nullable();
            $table->foreign('shipping_charge_id') ->references('id') ->on('shipping_charges') ->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shippings');
    }
};
