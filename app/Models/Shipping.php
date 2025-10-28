<?php

namespace App\Models;

use App\Models\ShippingCharge;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shipping extends Model
{
    /** @use HasFactory<\Database\Factories\ShippingFactory> */
    use HasFactory;

     protected $fillable = [
        'order_id',
        'customer_id',
        'name',
        'email',
        'phone',
        'address',
        'shipping_charge_id',
    ];

    public function shippingCharge()
    {
        return $this->belongsTo(ShippingCharge::class,'shipping_charge_id');
    }
}
