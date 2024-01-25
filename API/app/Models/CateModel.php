<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CateModel extends Model
{
    protected $table='cates_tbl';
    protected $fillable=['id','name','status','created_at','updated_at'];
    use HasFactory;
    public function products(){
        return $this->hasMany('App\Models\ProductModel','idCate','id');
    }
}
