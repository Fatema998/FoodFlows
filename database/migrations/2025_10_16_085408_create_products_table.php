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
       Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->string('slug')->unique();
            $table->unsignedBigInteger('brand_id')->index();
            $table->unsignedBigInteger('category_id')->index();
            $table->unsignedBigInteger('subcategory_id')->nullable()->index();
            $table->unsignedBigInteger('product_type_id')->index();

            // Price management
            $table->decimal('purchase_price', 10, 2)->default(0); // মূল ক্রয়মূল্য
            $table->decimal('price', 10, 2);                       // বিক্রয়মূল্য
            $table->integer('discount')->default(0);               // discount %
            $table->decimal('sell_price', 10, 2)->nullable();      // price after discount

            $table->string('product_code')->unique();
            $table->unsignedBigInteger('sell_count')->default(0);

            // Stock management
            $table->unsignedInteger('total_stock')->default(0);
            $table->unsignedInteger('reserved_stock')->default(0);

            $table->string('main_thumbnail')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('long_descriptions')->nullable();
            $table->longText('materials')->nullable();

            $table->boolean('is_active')->default(true)->index();
            $table->boolean('is_trending')->default(false)->index();
            $table->boolean('is_limited')->default(false)->index();
            $table->boolean('is_todays_pick')->default(false)->index();
            $table->boolean('is_new_arrival')->default(false)->index();
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_flash_deal')->default(false)->index();

            $table->dateTime('flash_deal_start')->nullable();
            $table->dateTime('flash_deal_end')->nullable();

            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();

            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('subcategory_id')->references('id')->on('categories')->onDelete('set null');

            $table->boolean('has_size')->default(false);
            $table->foreignId('size_guide_id')->nullable()->constrained()->nullOnDelete();

            // Composite indexes
            $table->index(['is_active', 'total_stock']);
            $table->index(['is_flash_deal', 'flash_deal_start']);

            $table->timestamps();
        });


        // Pivot table for sizes
        Schema::create('product_sizes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->index();
            $table->unsignedBigInteger('size_id')->index();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('size_id')->references('id')->on('sizes')->onDelete('cascade');

            $table->unique(['product_id', 'size_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_sizes');
        Schema::dropIfExists('products');
    }
};
