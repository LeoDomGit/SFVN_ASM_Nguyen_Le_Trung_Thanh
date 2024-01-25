<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillM extends Model
{
    protected $table ='bills';
    protected $fillable=['id','idUser','address','phone','created_at','updated_at'];
    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class,'idUser','id');
    }
    public function detail(){
        return $this->hasMany(BillDetailM::class,'idBill');
    }
}
