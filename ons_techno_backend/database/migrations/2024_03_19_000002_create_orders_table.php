<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending'); // pending, processing, completed, cancelled
            $table->string('payment_method'); // paypal, baridi_mob, cash_on_delivery
            $table->string('payment_status')->default('pending');
            $table->text('shipping_address');
            $table->text('billing_address');
            $table->string('currency')->default('DZD');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}; 