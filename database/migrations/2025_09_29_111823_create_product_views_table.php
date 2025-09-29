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
        Schema::create('product_views', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->index(); // index for faster lookups
            $table->string('ip_address', 45)->index(); // index for searching by IP
            
            // prevent duplicate (product_id + ip_address) pair
            $table->unique(['product_id', 'ip_address']);  
            
            $table->timestamps();

            // optional: add foreign key constraint
            $table->foreign('product_id')
                ->references('id')->on('products')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_views');
    }
};
