<?php
require __DIR__ . '/../middleware/cors.php';
require __DIR__ . '/../config/database.php';
require __DIR__ . '/../utils/response.php';
require __DIR__ . '/../utils/jwt.php';

$cfg = require __DIR__ . '/../config/config.php';
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';
$password = $input['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
  send_json(['ok' => false, 'error' => 'Invalid credentials'], 400);
}

$mysqli = db();
$stmt = $mysqli->prepare('SELECT id, email, password_hash, full_name FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user || !password_verify($password, $user['password_hash'])) {
  // Avoid leaking which field failed
  send_json(['ok' => false, 'error' => 'Invalid credentials'], 401);
}

// Create a short-lived JWT (e.g., 2 hours)
$now = time();
$payload = [
  'sub' => (string)$user['id'],
  'email' => $user['email'],
  'name' => $user['full_name'],
  'iss' => $cfg['jwt_issuer'],
  'iat' => $now,
  'exp' => $now + 2 * 60 * 60
];

$token = jwt_encode($payload, $cfg['jwt_secret']);

send_json([
  'ok' => true,
  'token' => $token,
  'user' => [
    'id' => (int)$user['id'],
    'email' => $user['email'],
    'full_name' => $user['full_name']
  ]
]);
