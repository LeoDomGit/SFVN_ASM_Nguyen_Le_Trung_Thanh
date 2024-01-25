<?php

namespace App\Http\Controllers;

use App\Models\RoleM;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;
use App\Http\Requests\CheckLogin;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Mail\CreateUserMail;
use DB;
class UserController extends Controller
{
    public function getAllRoles(){
        return RoleM::all();
    }
        /**
     * Display a listing of the resource.
     */
    public function storeRole(RoleRequest $request){
        $request->validated();
        RoleM::create(['name'=>$request->name]);
        $roles= $this->getAllRoles();
        return response()->json(['check'=>true, 'roles'=>$roles]);
    }
    /**
     * Display a listing of the resource.
     */
        public function editRole(RoleRequest $request){
        $request->validated();
        RoleM::where('id',$request->id)->update(['name'=>$request->name]);
        $roles= $this->getAllRoles();
        return response()->json(['check'=>true, 'roles'=>$roles]);
    }
    /**
     * Display a listing of the resource.
     */
    public function indexRole(){
        $roles= $this->getAllRoles();
        return response()->json($roles);
    }
    /**
     * Display a listing of the resource.
     */
    public function destroyRole(Request $request){
        if(!$request->has('id')){
            return response()->json(['check'=>false, 'msg'=>'idRole is required']);
        }
        $check = User::where('idRole',$request->id)->count('id');
        if($check!=0){
            return response()->json(['check'=>false,'msg'=>'Role has users']);
        }
        RoleM::where('id',$request->id)->delete();
        $roles= $this->getAllRoles();
        return response()->json(['check'=>true, 'roles'=>$roles]);
    }

    /**
     * Display a listing of the resource.
     */
    public function getAllUsers(){
        return DB::Table('users')->join('roles','users.idRole','=','roles.id')->select('users.*','roles.name as rolename')->get();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = $this->getAllUsers();
        return response()->json($result);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function checkLogin1(CheckLogin $request)
    {
         $request->validated();
         if(Auth::attempt(['email' => $request->email, 'password' => $request->password],true)){
            return response()->json(['check'=>true,'token'=>Auth::user()->remember_token]);
         }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $request->validated();
        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make(123),
            'idRole'=>$request->idRole,
        ]);
        $email = $request->email;
        $mailData = [
            'title' => 'Mail thông báo thông tin tài khoản ',
            'email' => $email,
            'name' => $request->name,
            'password' => 123,
        ];
        Mail::to($request->email)->send(new createUserMail($mailData));
        return response()->json(['check' => true]);

    }

    /**
     * Display the specified resource.
     */
    public function show(RoleM $roleM)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoleM $roleM)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RoleM $roleM)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,User $user)
    {
        if(!$request->has('id')){
            return response()->json(['check'=>false,'msg'=>'Id is required']);
        }
        User::where('id',$request->get('id'))->delete();
        $result=$this->getAllUsers();
        return response()->json(['check'=>true,'users'=>$result]);
    }
}
