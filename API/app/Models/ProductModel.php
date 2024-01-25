<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    protected $table='fruit_tbl';
    protected $fillable=['id','name','unit','quantity','image','price','status','idCate','created_at','updated_at'];
    use HasFactory;
    public function cates(){
        return $this->belongsTo('App\Models\CateModel','idCate','id');
    }
}
