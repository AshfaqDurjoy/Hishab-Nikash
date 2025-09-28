<?php

return [
    'paths' => ['api/*'], // add '*' temporarily if you also need OPTIONS on non-api paths
    'allowed_methods' => ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    'allowed_origins' => [
        'https://hishab-nikash-phi.vercel.app',   // your frontend
        // add local dev URLs if needed:
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // or enumerate if you prefer
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // keep if you send cookies/Authorization with fetch
];
