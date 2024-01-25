<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'id'=>'sometimes|exists:fruit_tbl,id',
            'name'=>'required',
            'unit'=>'required',
            'quantity'=>'required',
            'idCate'=>'required|numeric|exists:cates_tbl,id',
            'price'=>'required|numeric|min:0',
            'image'=>'sometimes|mimes:jpeg,png,jpg,gif|max:2048',
            'status'=>'sometimes|numeric'
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'check' => false,
            'msg'  => $validator->errors(),
        ], 200));
    }
}
