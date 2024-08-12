<?php
$server = "localhost";
$username = "root";
$password = "";

$con = mysqli_connect($server, $username, $password);
if(!$con){echo "Success connecting to the db";}

$insert = false;
if(isset($_POST['name']))
    $server = "localhost";
    $username = "root";
    $password = "";

    $con = mysqli_connect($server, $username, $password);

    if(!$con){
        die("connection to this database failed due to" . mysqli_connect_error());
    }
    // echo "Success connecting to the db";

    $name = $_POST['name'];
    $gender = $_POST['age'];
    $age = $_POST['gender'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $text = $_POST['text'];
    $sql = "INSERT INTO 'work'.'work'(`name`, `age`,`gender`, `email`, `phone`, `text`, `dt`) VALUES ('$name', '$age','$gender','$email', '$phone', 'text', current_timestamp());";
    if($con->query($sql) == true){
        echo "Successfully inserted";}
        $con->close();
