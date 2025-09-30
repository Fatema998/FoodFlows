<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sizes', function (Blueprint $table) {
            $table->id();
            
            // Foreign key column
            $table->unsignedBigInteger('product_type_id');

            $table->enum('type', ['men', 'women', 'kids', 'other', 'unisex'])->default('other');
            $table->string('name');
            $table->integer('numeric')->nullable();
            $table->float('chest_min')->nullable();
            $table->float('chest_max')->nullable();
            $table->float('waist_min')->nullable();
            $table->float('waist_max')->nullable();
            $table->float('hip_min')->nullable();
            $table->float('hip_max')->nullable();
            $table->float('bust_min')->nullable();
            $table->float('bust_max')->nullable();
            $table->integer('position')->default(1);
            $table->boolean('is_active')->default(true);

            // Index for faster queries
            $table->index('product_type_id');

            // Foreign key constraint
            // $table->foreign('product_type_id')
            //     ->references('id')
            //     ->on('product_types')
            //     ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sizes');
    }
};
