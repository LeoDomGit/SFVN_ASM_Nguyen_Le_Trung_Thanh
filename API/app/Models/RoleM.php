<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleM extends Model
{
    protected $table = 'roles';
    protected $fillable=[
    'id',
    'name',
    'status',
    'created_at',
    'updated_at'];
    use HasFactory;
    public function users(){
        return $this->hasMany(User::class);
    }
}
