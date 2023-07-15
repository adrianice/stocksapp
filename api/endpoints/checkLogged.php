<?php
    session_start();

    if(isset($_SESSION['user_username'])) {
        http_response_code(200);
        echo json_encode(['message' => 'User logged in', 'status' => true, 'user' => ['id' => $_SESSION['id'], 'username' => $_SESSION['username']]]);
    }
    else {
        http_response_code(200);
        echo json_encode(['message' => 'User not logged in', 'status' => false]);
    }
?>