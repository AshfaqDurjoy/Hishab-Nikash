<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = DB::table('transactions')->orderBy('created_at', 'desc')->get();
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|integer',
            'title' => 'required|string',
            'type' => 'required|string',
            'category' => 'required|string',
            'amount' => 'required|numeric',
        ]);
        
        $data['created_at'] = Carbon::now();  
        $data['updated_at'] = Carbon::now();  

        $id = DB::table('transactions')->insertGetId($data);

        return response()->json([
            'message' => 'Transaction Added Successfully',
            'transactionId' => $id
        ]);
    }
}
