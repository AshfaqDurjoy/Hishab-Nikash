<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    public function chat(Request $req)
    {
        $message = $req->input('message');
        $faq=config('faq');
        $faqContext = "You are a helpful assistant for Hishab-Nikash website. Use the following FAQ if it is relevant to the user's question. If the user's question is unrelated to Hishab Nikash, answer based on general knowledge:\n\n";
        $faqContext .= "You can answer questions about Hishab-Nikash, personal finance, banking, budgeting, or finance tracking  and general finance concepts. ";
        $faqContext .= "Use the FAQ below if relevant. ";
        $faqContext .= "If the question is about a completely unrelated topic (like movies, sports, or general knowledge not related to finance), respond: 'I’m sorry, I can only answer questions about Hishab-Nikash or finance topics.'\n\n";
        
        foreach ($faq as $item) {
            $faqContext .= "- Q: {$item['question']}\n  A: {$item['answer']}\n";
        }

        $payload = [
            'contents' => [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $faqContext . "\nUser question: " . $message]
                    ]
                ]
            ]
        ];

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

        $resp = Http::withHeaders([
            'x-goog-api-key' => config('services.gemini.key'),
            'Content-Type' => 'application/json'
        ])->post($url, $payload);

        if ($resp->failed()) {
            return response()->json([
                'error' => 'API error',
                'details' => $resp->body()
            ], 500);
        }

        $text = data_get($resp->json(), 'candidates.0.content.parts.0.text', '');

        return response()->json(['reply' => $text]);
    }
}
