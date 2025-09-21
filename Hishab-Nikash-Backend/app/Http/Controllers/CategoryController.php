<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    // Add new category
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'category_name' => 'required|string|max:255',
        ]);

        // Check for duplicate
        $exists = Category::where('user_id', $request->user_id)
                          ->where('category_name', $request->category_name)
                          ->first();

        if ($exists) {
            return response()->json(['message' => 'Category already exists'], 400);
        }

        $category = Category::create([
            'user_id' => $request->user_id,
            'category_name' => $request->category_name,
        ]);

        return response()->json(['success' => true, 'category' => $category]);
    }

    // Fetch categories for a user
    public function userCategories($userId)
    {
        $categories = Category::where('user_id', $userId)
                              ->pluck('category_name');
        return response()->json(['categories' => $categories]);
    }
}
