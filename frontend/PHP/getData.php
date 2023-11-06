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

    $var1 = "SELECT DISTINCT event_status,SUM(amount) as sum FROM user_event WHERE user_email='$data->userID' GROUP BY event_status";

    $var2 = "SELECT DATE_FORMAT(timestamp,'%M') AS 'month',SUM(amount) as sum FROM user_event WHERE user_email='$data->userID' GROUP BY MONTH(timestamp)";
    $var3 = "SELECT SUM(amount) as sum FROM user_event WHERE user_email='$data->userID';";
    $var4 = "SELECT event_status,timestamp,amount from user_event where user_email='$data->userID' order by timestamp desc LIMIT 4;";
    $res = $conn->prepare($var1);
    $res2 = $conn->prepare($var2);
    $res3 = $conn->prepare($var3);
    $res4 = $conn->prepare($var4);

    $res3->execute();
    $res2->execute();
    $res4->execute();
    $res->execute();

    echo json_encode(["event_total" => $res->fetchAll(), "month_total" => $res2->fetchAll(), "total" => $res3->fetch(), "recent" => $res4->fetchAll()]);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
