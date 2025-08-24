<?php
// Edit these for your local MySQL
return [
  'db_dsn'     => 'mysql:host=127.0.0.1;dbname=hishabnikash;charset=utf8mb4',
  'db_user'    => 'root', // XAMPP default
  'db_pass'    => '',     // XAMPP default is empty password
  'jwt_secret' => 'change-this-to-a-long-random-secret',
  'jwt_issuer' => 'hishab-nikash-local',
  'cors_origin'=> 'http://localhost:5173'
];