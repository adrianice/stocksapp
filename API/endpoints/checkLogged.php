<?php
    require 'jwt/verifyToken.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if(isset($data['token'])) {

            $token = $data['token'];
            if(verifyToken($token)) {
                http_response_code(200);
                echo json_encode(['logged' => true]);
            }
            else {
                http_response_code(200);
                echo json_encode(['logged' => false]);
            }
        }
        else {
            http_response_code(203);
            echo json_encode(['error' => 'Token not provided']);
        }
    }
    else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
?>