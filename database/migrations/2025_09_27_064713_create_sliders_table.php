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
       Schema::create('sliders', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // index for faster search
            $table->string('subtitle')->nullable();
            $table->string('description')->nullable();
            $table->string('image')->nullable();
            $table->string('button_text')->nullable();
            $table->string('link')->nullable();
            $table->integer('position')->default(0); // index for ordering
            $table->boolean('is_active')->default(true)->index(); // index for filtering active sliders
            $table->enum('layout', ['left', 'right'])->default('left')->index(); // index for layout filtering
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sliders');
    }
};
