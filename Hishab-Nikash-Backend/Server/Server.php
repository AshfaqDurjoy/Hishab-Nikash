<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$password = ""; 
$database = "hishab_nikash";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database Connection Failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];
$script_name = dirname($_SERVER['SCRIPT_NAME']); 
$path = str_replace($script_name, "", $_SERVER['REQUEST_URI']); 
$path = trim($path, "/"); 


if ($path === "" || $path === "server.php") {
    echo json_encode(["message" => "API is running"]);
    exit;
}


if ($path === "server.php/add-transaction" && $method === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['user_id'], $input['title'], $input['type'], $input['category'], $input['amount'])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing fields"]);
        exit;
    }

    $user_id  = $conn->real_escape_string($input['user_id']);
    $title    = $conn->real_escape_string($input['title']);
    $type     = $conn->real_escape_string($input['type']);
    $category = $conn->real_escape_string($input['category']);
    $amount   = (float)$input['amount'];

    $sql = "INSERT INTO transactions (user_id, title, type, category, amount) 
            VALUES ('$user_id', '$title', '$type', '$category', '$amount')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "message" => "Transaction Added Successfully",
            "transactionId" => $conn->insert_id
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Database Error", "error" => $conn->error]);
    }
    exit;
}


if ($path === "server.php/transactions" && $method === "GET") {
    $sql = "SELECT * FROM transactions ORDER BY created_at DESC";
    $result = $conn->query($sql);

    $transactions = [];
    while ($row = $result->fetch_assoc()) {
        $transactions[] = $row;
    }

    echo json_encode($transactions);
    exit;
}

http_response_code(404);
echo json_encode(["message" => "Route Not Found"]);
?>
