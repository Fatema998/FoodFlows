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
       Schema::create('product_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index(); // index for faster search by name
            $table->enum('gender', ['men', 'women', 'kids', 'other', 'unisex'])->default('other')->index(); // index for gender queries
            $table->boolean('is_active')->default(true)->index(); // index for filtering active types
            $table->boolean('size_required')->default(true);  // Indicates if products of this type require size selection
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_types');
    }
};
