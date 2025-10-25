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
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index(); // index for faster search by name
            $table->string('slug')->unique(); // unique index (already creates index)
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true)->index(); // index for filtering active brands
            $table->integer('position')->default(0)->index(); // index for ordering
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
