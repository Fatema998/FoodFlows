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
            if (!Schema::hasTable('size_guides')) {
                Schema::create('size_guides', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('sub_category_id')->nullable()->index();
                    $table->foreign('sub_category_id')->references('id')->on('categories')->onDelete('set null');
                    $table->string('product_type'); // apparel, shoes, kids_apparel
                    $table->string('gender')->nullable(); // men, women, kids, unisex
                    $table->string('title'); // e.g., "Men T-Shirt Size Guide"
                    $table->text('description')->nullable();
                    $table->string('image')->nullable(); // optional chart image
                    $table->timestamps();
                });
            }
        }
        
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('size_guides');
    }
};
