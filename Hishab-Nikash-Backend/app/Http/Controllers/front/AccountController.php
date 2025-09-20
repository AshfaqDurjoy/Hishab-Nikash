<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AccountController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ]);
           if ($validator->fails()){
            return response()->json([
                 'status' => 400,
                 'errors' => $validator->errors()
            ],400);
           }

           $user= new User();
           $user->name = $request->name;
           $user->email = $request->email;
           $user->password= Hash::make($request->password);
           $user->save();

            return response()->json([
                 'status' => 200,
                 'message' => 'User registered succesfully'
            ],200);
    }

    public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'errors' => $validator->errors(),
        ], 400);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'status' => 401,
            'message' => 'Invalid credentials',
        ], 401);
    }

    // Using Sanctum to generate token
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'status' => 200,
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user,
    ], 200);
}

}
