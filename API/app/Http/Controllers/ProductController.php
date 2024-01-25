<?php

namespace App\Http\Controllers;

use App\Models\ProductModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProductRequest;
use File;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = ProductModel::paginate(8);
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $request->validated();
        $file = $request->file('file');
        $imageName = $file->getClientOriginalName();
        move_uploaded_file($_FILES['file']['tmp_name'],'images/'.$imageName);
        ProductModel::create(['name'=>$request->name,'unit'=>$request->unit,'quantity'=>$request->quantity,'image'=>$imageName,'price'=>$request->price,'idCate'=>$request->idCate]);
        $products= $this->index();
        return response()->json(['check'=>true,'products'=>$products]);
    }
    // ===============================
    public function userProduct()
    {
        $result = ProductModel::with('cates')->where('status',1)->select('id','name','price','unit','quantity','image','idCate')->paginate(8);
        return response()->json($result);
    }
    /**
     * Display the specified resource.
     */
    public function show(ProductModel $productModel)
    {
        $products= $this->index();
        return response()->json($products);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function getSingle(ProductModel $productModel,$id)
    {
        $product= ProductModel::find($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, ProductModel $productModel)
    {
        $request->validated();
        if(!$request->has('image')){
            ProductModel::where('id',$request->id)->update(['name'=>$request->name,'unit'=>$request->unit,'quantity'=>$request->quantity,'price'=>$request->price,'idCate'=>$request->idCate]);
        }else{
            $old = ProductModel::where('id',$request->id)->value('image');
            $check = ProductModel::where('id','!=',$request->id)->where('image',$old)->count('id');
            $filePath = 'public/images/' . $old;
            if (File::exists(public_path('images/'.$old)) && $check==0) {
                unlink(public_path('images/'.$old));
            }
            $file = $request->file('file');
            $imageName = $_FILES['image']['name'];
            move_uploaded_file($_FILES['image']['tmp_name'],'images/'.$imageName);
             ProductModel::where('id',$request->id)->update(['name'=>$request->name,'unit'=>$request->unit,'quantity'=>$request->quantity,'image'=>$imageName,'price'=>$request->price,'idCate'=>$request->idCate]);
        }
        $products= $this->index();
        return response()->json(['check'=>true,'products'=>$products]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductModel $productModel)
    {
        //
    }
}
