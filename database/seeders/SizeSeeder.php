<?php

namespace Database\Seeders;

use App\Models\Size;
use App\Models\ProductType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('sizes')->delete();
        $productTypesData = [
            'men' => [
                ['name'=>'pant','size_required'=>true],
                ['name'=>'shirt','size_required'=>true],
                ['name'=>'t-shirt','size_required'=>true],
                ['name'=>'polo-shirt','size_required'=>true],
                ['name'=>'jersey','size_required'=>true],
                ['name'=>'panjabi','size_required'=>true],
                ['name'=>'belt','size_required'=>false],
                ['name'=>'hat','size_required'=>false]
            ],
            'women' => [
                ['name'=>'dress','size_required'=>true],
                ['name'=>'penti','size_required'=>true],
                ['name'=>'jacket','size_required'=>true],
                ['name'=>'skirt','size_required'=>true],
                ['name'=>'tops','size_required'=>true],
                ['name'=>'bra','size_required'=>true],
                ['name'=>'bag','size_required'=>false],
                ['name'=>'scarf','size_required'=>false]
            ],
            'kids' => [
                ['name'=>'t-shirt','size_required'=>true],
                ['name'=>'pant','size_required'=>true],
                ['name'=>'dress','size_required'=>true],
                ['name'=>'top','size_required'=>true],
            ],
            'unisex' => [
                ['name'=>'shoes','size_required'=>true],
                ['name'=>'socks','size_required'=>false],
                ['name'=>'cap','size_required'=>false],
            ]
        ];

        $adultSizes = [
            ['name'=>'XS','numeric'=>34],
            ['name'=>'S','numeric'=>36],
            ['name'=>'M','numeric'=>38],
            ['name'=>'L','numeric'=>40],
            ['name'=>'XL','numeric'=>42],
            ['name'=>'XXL','numeric'=>44],
            ['name'=>'XXXL','numeric'=>46],
        ];

        $kidsSizes = [
            ['name'=>'1-2Y','start'=>1,'end'=>2],
            ['name'=>'3-4Y','start'=>3,'end'=>4],
            ['name'=>'5-6Y','start'=>5,'end'=>6],
            ['name'=>'7-8Y','start'=>7,'end'=>8],
        ];

        foreach($productTypesData as $gender => $products){
            foreach($products as $product){
                $productType = ProductType::create([
                    'name' => $product['name'],
                    'gender' => $gender,
                    'size_required' => $product['size_required'],
                    'is_active' => true
                ]);

                if(!$product['size_required']){
                    continue; // skip size generation
                }

                $sizes = $gender === 'kids' ? $kidsSizes : $adultSizes;

                foreach($sizes as $pos => $size){
                    Size::create([
                        'product_type_id' => $productType->id,
                        'type' => $gender,
                        'name' => $size['name'],
                        'numeric' => $size['numeric'] ?? $size['start'] ?? null,
                        'chest_min'=> in_array($product['name'],['t-shirt','shirt','polo-shirt','jersey','panjabi','jacket','dress','tops','bra']) ? 32+$pos*2 : null,
                        'chest_max'=> in_array($product['name'],['t-shirt','shirt','polo-shirt','jersey','panjabi','jacket','dress','tops','bra']) ? 32+$pos*2+2 : null,
                        'waist_min'=> in_array($product['name'],['pant','penti','shirt','t-shirt','polo-shirt','jersey','panjabi','dress','tops']) ? 28+$pos*2 : null,
                        'waist_max'=> in_array($product['name'],['pant','penti','shirt','t-shirt','polo-shirt','jersey','panjabi','dress','tops']) ? 28+$pos*2+2 : null,
                        'hip_min'=> in_array($product['name'],['pant','penti','dress','shirt','t-shirt','polo-shirt','jersey','panjabi','jacket']) ? 34+$pos*2 : null,
                        'hip_max'=> in_array($product['name'],['pant','penti','dress','shirt','t-shirt','polo-shirt','jersey','panjabi','jacket']) ? 34+$pos*2+2 : null,
                        'bust_min'=> in_array($product['name'],['t-shirt','shirt','polo-shirt','jersey','panjabi','jacket','dress','tops','bra']) ? 30+$pos*2 : null,
                        'bust_max'=> in_array($product['name'],['t-shirt','shirt','polo-shirt','jersey','panjabi','jacket','dress','tops','bra']) ? 30+$pos*2+2 : null,
                        'position' => $pos+1,
                        'is_active'=>true
                    ]);
                }
            }
        }
    }
}
