<?php
require __DIR__ . '/../middleware/cors.php';
require __DIR__ . '/../config/database.php';
require __DIR__ . '/../utils/response.php';

$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';
$password = $input['password'] ?? '';
$full_name = isset($input['full_name']) ? trim($input['full_name']) : null;

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
  send_json(['ok' => false, 'error' => 'Invalid email or short password (min 6)'], 400);
}

$mysqli = db();

// check exists
$stmt = $mysqli->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
  send_json(['ok' => false, 'error' => 'Email already registered'], 409);
}
$stmt->close();

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $mysqli->prepare('INSERT INTO users (email, password_hash, full_name) VALUES (?, ?, ?)');
$stmt->bind_param('sss', $email, $hash, $full_name);
if (!$stmt->execute()) {
  send_json(['ok' => false, 'error' => 'Registration failed'], 500);
}
$user_id = $stmt->insert_id;
$stmt->close();

send_json(['ok' => true, 'user' => ['id' => $user_id, 'email' => $email, 'full_name' => $full_name]]);
