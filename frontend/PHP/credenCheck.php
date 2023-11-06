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

    $sql_query = "SELECT user_name,user_email FROM user where user_email='$data->email' AND user_psw='$data->password';";

    $res = $conn->prepare($sql_query);
    $res->execute();
    $res = $res->fetch(PDO::FETCH_ASSOC);
    if (isset($res["user_email"]))
        echo json_encode($res);
    else echo "false";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
