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
    $sql_query1 = "SELECT user_email,user_name FROM user where user_email='$data->email'";

    $sql_query = "INSERT INTO user values ('$data->name','$data->email','$data->password', $data->tel)";

    $res = $conn->prepare($sql_query1);
    $res->execute();
    if (empty($res->fetchAll())) {
        $res = $conn->prepare($sql_query);
        $res->execute();
        echo json_encode($res);
    } else throw new Exception('user already exist');
} catch (Exception $e) {
    echo false;
}
