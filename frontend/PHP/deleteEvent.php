<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');


$host     = '127.0.0.1';
$db       = 'expense_tracker';
$user     = 'root';
$password = '';
$port     = 3306;


// Create connection
try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $var1 = "DELETE FROM user_event WHERE user_id=$data->userID AND event_status='$data->status';";

    $res = $conn->prepare($var1);

    $res->execute();
    if (isset($res))
        echo "true";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
