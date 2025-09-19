<?php
$host = 'localhost';
$dbname = 'hishab_nikash';
$username = 'root';
$password = '';

// Create a connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Add transaction
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];
    $title = $_POST['title'];
    $type = $_POST['type'];
    $category = $_POST['category'];
    $amount = $_POST['amount'];

    $sql = "INSERT INTO transactions (user_id, title, type, category, amount) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $title, $type, $category, $amount]);

    echo json_encode(['status' => 'success', 'message' => 'Transaction Added']);
} 

// Fetch all transactions
elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($transactions);
}
?>
