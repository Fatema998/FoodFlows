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
       Schema::create('size_guide_measurements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('size_guide_id')->constrained()->cascadeOnDelete();

            $table->string('size_label'); // S, M, L, XL, 1-2Y, etc.

            // Upper body
            $table->decimal('chest', 5, 2)->nullable();
            $table->decimal('waist', 5, 2)->nullable();
            $table->decimal('hip', 5, 2)->nullable();
            $table->decimal('body_length', 5, 2)->nullable();
            $table->decimal('sleeve_length', 5, 2)->nullable();
            $table->decimal('shoulder', 5, 2)->nullable();

            // Lower body
            $table->decimal('inseam', 5, 2)->nullable();
            $table->decimal('thigh', 5, 2)->nullable();
            $table->decimal('crotch_depth', 5, 2)->nullable();

            // Foot/shoes (optional)
            $table->decimal('foot_length', 5, 2)->nullable();

            // Lingerie/Bra (optional)
            $table->decimal('underbust', 5, 2)->nullable();
            $table->decimal('cup_size', 5, 2)->nullable();

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('size_guide_measurements');
    }
};
