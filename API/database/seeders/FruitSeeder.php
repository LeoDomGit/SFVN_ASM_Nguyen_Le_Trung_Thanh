<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
class FruitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=1; $i <31 ; $i++) { 
            $idCate = random_int(1,4);
            if($idCate==1){
                    DB::table('fruit_tbl')->insert(['name'=>'Durian '.$i,'unit'=>'kg','image'=>'durian.webp','quantity'=>random_int(50,200),'price'=>random_int(70000,300000),'idCate'=>$idCate]);
            }else if($idCate==2){
                    DB::table('fruit_tbl')->insert(['name'=>'Star fruit '.$i,'unit'=>'kg','image'=>'star-fruit.jpg','quantity'=>random_int(50,200),'price'=>random_int(30000,100000),'idCate'=>$idCate]);
            }else if($idCate==3){
                    DB::table('fruit_tbl')->insert(['name'=>'Apple '.$i,'unit'=>'kg','image'=>'apple.jpg','quantity'=>random_int(50,200),'price'=>random_int(70000,400000),'idCate'=>$idCate]);
            }else if($idCate==4){
                    DB::table('fruit_tbl')->insert(['name'=>'Rambutan '.$i,'unit'=>'kg','image'=>'Rambutan.jpg','quantity'=>random_int(50,200),'price'=>random_int(70000,400000),'idCate'=>$idCate]);

            }
        }
       

    }
}
