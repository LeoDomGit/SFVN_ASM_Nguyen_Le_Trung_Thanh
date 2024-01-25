<?php

namespace App\Http\Controllers;

use App\Models\CateModel;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use App\Http\Requests\CategroryRequest;
use Illuminate\Support\Facades\Validator;
class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAll(){
        $result = CateModel::all();
        return $result;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json($this->getAll());
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
    public function userCate(){
        $result = CateModel::where('status',1)->select('id','name')->get();
        return response()->json($result);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CategroryRequest $request)
    {
        $request->validated();
        CateModel::create(['name'=>$request->name]);
        $cates= $this->getAll();
        return response()->json(['check'=>true,'cates'=>$cates]);
    }

    /**
     * Display the specified resource.
     */
    public function edit(CategroryRequest $request,CateModel $cateModel)
    {
        $request->validated();
        CateModel::where('id',$request->id)->update(['name'=>$request->name]);
       $cates= $this->getAll();
        return response()->json(['check'=>true,'cates'=>$cates]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function show(CateModel $cateModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CateModel $cateModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:cates_tbl,id',
        ]);
 
        if ($validator->fails()) {
            return response()->json(['check'=>false,'msg'=> $validator->errors()]);
        }
        $check = ProductModel::where('idCate',$request->id)->first();
        if(!$check){
            CateModel::where('id',$request->id)->delete();
            $cates= $this->getAll();
            return response()->json(['check'=>true,'cates'=>$cates]);
        }else {
            return response()->json(['check'=>false,'msg'=> 'The category has products']);
            
        }

    }
}
