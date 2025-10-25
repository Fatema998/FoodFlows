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
          Schema::create('users', function (Blueprint $table) {
                $table->bigIncrements('id'); // scalable primary key
                $table->string('name', 191)->index(); // indexed for searches
                $table->string('email', 191)->unique(); // unique index
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->string('phone', 20)->nullable()->index(); // unique index
                $table->enum('role', ['admin', 'user'])->default('user')->index(); // indexed for filtering
                $table->string('avatar')->nullable();

                $table->boolean('is_active')->default(true)->index(); // indexed for filtering
                $table->boolean('is_ban')->default(false)->index(); // indexed for filtering

                $table->dateTime('last_login_at')->nullable()->index(); // indexed for recent activity
                $table->ipAddress('last_login_ip')->nullable();

                $table->rememberToken();
                $table->timestamps();

                // Optional composite index for combined lookups
                $table->index(['email', 'phone']); 
            });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
