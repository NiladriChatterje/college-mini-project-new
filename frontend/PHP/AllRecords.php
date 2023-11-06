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
    $var1 = null;
    if ($data->filter == "All")
        $var1 = "SELECT timestamp,purpose,amount,event_status,location FROM user_event WHERE user_email='$data->userID';";
    else
        $var1 = "SELECT timestamp,purpose,amount,event_status,location FROM user_event WHERE user_email='$data->userID' AND event_status='$data->filter';";
    $res = $conn->prepare($var1);

    $res->execute();

    echo json_encode($res->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
