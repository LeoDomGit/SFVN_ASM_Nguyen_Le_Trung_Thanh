<?php

namespace App\Http\Controllers;

use App\Models\BillM;
use App\Models\BillDetailM;
use App\Models\ProductModel;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\BillRequest;
use DB;
class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = BillM::with('user','detail')->paginate(4);
        return response()->json($result);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function single($id){
        $result = BillM::with('user')->where('bills.id',$id)->first();
        $detail = DB::Table('bill_detail')->join('fruit_tbl','bill_detail.idProduct','=','fruit_tbl.id')
        ->where('bill_detail.idBill',$id)
        ->select('fruit_tbl.*','bill_detail.quantity as qty')->get();
        return response()->json(['bill'=>$result,'list'=>$detail]);
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
    public function store(BillRequest $request)
    {
        $request->validated();
        $check = User::where('email',$request->email)->count('id');
        if($check==0){
            $id = User::insertGetId([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>123
            ]);
            $idBill =DB::Table('bills')
            ->insertGetId(['idUser'=>$id,'address'=>$request->address,'phone'=>$request->phone]);
            $arr = json_decode($request->products);
            foreach ($arr as $key => $value) {
                BillDetailM::create(['idBill' => $idBill, 'idProduct' => $value->id, 'quantity' => $value->qty]);
            }
        }else{
            $id = User::where('email', $request->email)->value('id');
            $idBill =DB::Table('bills')
            ->insertGetId(['address'=>$request->address,'idUser'=>5,'phone'=>$request->phone,'created_at'=>now()]);
            $arr = json_decode($request->products);
            foreach ($arr as $key => $value) {
                BillDetailM::create(['idBill' => $idBill, 'idProduct' => $value->id, 'quantity' => $value->qty]);
            }
        }
        return  response()->json(['check'=>true]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BillM $billM)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BillM $billM)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BillM $billM)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BillM $billM)
    {
        //
    }
}
