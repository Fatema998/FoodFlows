<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetails extends Model
{
    /** @use HasFactory<\Database\Factories\OrderDetailsFactory> */
    use HasFactory;

    public function shipping(){
        return $this->belongsTo(Shipping::class, 'order_id','order_id')->select('id','order_id','name','phone','address');
    }
    public function order(){
        return $this->belongsTo(Order::class, 'order_id')->select('id','invoice_id');
    }
}
