<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class BillDetailM extends Model
{
    protected $table ='bill_detail';
    protected $fillable=['id','idBill','idProduct','quantity','created_at','updated_at'];
    use HasFactory;
    public function bill(){
        return $this->belongsTo(BillM::class,'idBill');
    }
    public function product(){
        return $this->belongsTo(ProductModel::class,'idProduct');
    }
}
