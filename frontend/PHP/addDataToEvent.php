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
    $sql_query = "INSERT INTO user_event values ('$data->userID','$data->event_status','$data->timestamp', '$data->description','$data->location',$data->amount);";
    $res = $conn->query($sql_query);
    if ($res) {
        echo "true";
    } else "false";
    $conn = null;
} catch (Exception $e) {
    echo "false";
}
