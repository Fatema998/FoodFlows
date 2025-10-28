<?php

namespace App\Models;

use App\Models\Payment;
use App\Models\Shipping;
use App\Models\OrderStatus;
use App\Models\OrderDetails;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ShippingCharge;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

      protected $fillable = [
        'customer_id',
        'invoice_id',
        'total_amount',
        'discount',
        'shipping_charge',
        'coupon_code',
        'coupon_discount',
        'order_status_id',
    ];

    public function orderdetails()
    {
        return $this->hasMany(OrderDetails::class, 'order_id');
    }
    public function product()
    {
        return $this->belongsTo(OrderDetails::class, 'id', 'order_id')->select('id','order_id','product_id');
    }
    public function status()
    {
        return $this->belongsTo(OrderStatus::class, 'order_status_id');
    }
    public function shipping()
    {
        return $this->belongsTo(Shipping::class, 'id', 'order_id');
    }
    public function payment()
    {
        return $this->belongsTo(Payment::class, 'id', 'order_id');
    }
    public function customer()
    {
        return $this->belongsTo(User::class,'customer_id');
    }


}
