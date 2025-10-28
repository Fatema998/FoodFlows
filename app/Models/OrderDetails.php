<?php

namespace App\Models;

use App\Models\Size;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function color(){
         return $this->belongsTo(Color::class, 'color_id')->select('id','name');
    }

    public function size(){
         return $this->belongsTo(Size::class, 'size_id')->select('id','name');
    }

}
