<?php
// Add this to routes/web.php temporarily

Route::get('/setup-database', function () {
    try {
        // Test connection
        DB::connection()->getPdo();
        $connectionStatus = "✅ Database connected successfully";
        
        // Run migrations
        Artisan::call('migrate', ['--force' => true]);
        $migrationResult = Artisan::output();
        
        // Check tables
        $tables = DB::select('SHOW TABLES');
        
        return [
            'connection' => $connectionStatus,
            'migration_output' => $migrationResult,
            'tables_created' => count($tables),
            'tables' => $tables,
            'database_info' => [
                'host' => config('database.connections.mysql.host'),
                'port' => config('database.connections.mysql.port'),
                'database' => config('database.connections.mysql.database')
            ]
        ];
        
    } catch (\Exception $e) {
        return [
            'error' => $e->getMessage(),
            'database_config' => [
                'host' => config('database.connections.mysql.host'),
                'port' => config('database.connections.mysql.port'),
                'database' => config('database.connections.mysql.database'),
                'username' => config('database.connections.mysql.username')
            ]
        ];
    }
});

Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return [
            'status' => 'OK',
            'database' => 'Connected',
            'timestamp' => now()
        ];
    } catch (\Exception $e) {
        return [
            'status' => 'ERROR',
            'database' => 'Failed: ' . $e->getMessage()
        ];
    }
});
// Remove this route after setup is complete!