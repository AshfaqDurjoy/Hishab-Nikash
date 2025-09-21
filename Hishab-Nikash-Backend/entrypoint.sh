#!/bin/bash

# Wait for database to be ready
echo "Waiting for database connection..."
sleep 15

# Test database connection
echo "Testing database connection..."
php artisan migrate:status || echo "Migration status check failed, continuing..."

# Clear Laravel caches
echo "Clearing Laravel caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Optional: Create a default user (uncomment if needed)
# echo "Seeding default data..."
# php artisan db:seed --force

# Cache configurations for better performance
echo "Caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions again (just in case)
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

# Start Apache in foreground
echo "Starting Apache server..."
exec apache2-foreground