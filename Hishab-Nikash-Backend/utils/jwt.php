<?php
function base64url_encode($data) {
  return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
  return base64_decode(strtr($data, '-_', '+/'));
}

function jwt_encode(array $payload, string $secret) {
  $header = ['alg' => 'HS256', 'typ' => 'JWT'];
  $segments = [
    base64url_encode(json_encode($header)),
    base64url_encode(json_encode($payload))
  ];
  $signing_input = implode('.', $segments);
  $signature = hash_hmac('sha256', $signing_input, $secret, true);
  $segments[] = base64url_encode($signature);
  return implode('.', $segments);
}

function jwt_decode(string $jwt, string $secret) {
  $parts = explode('.', $jwt);
  if (count($parts) !== 3) return null;

  list($h64, $p64, $s64) = $parts;
  $signing_input = $h64 . '.' . $p64;
  $signature = base64url_decode($s64);
  $valid = hash_equals($signature, hash_hmac('sha256', $signing_input, $secret, true));
  if (!$valid) return null;

  $payload = json_decode(base64url_decode($p64), true);
  if (!$payload) return null;

  // Exp check if present
  if (isset($payload['exp']) && time() >= $payload['exp']) return null;

  return $payload;
}
