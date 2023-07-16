<?php
    require realpath(__DIR__ . '/../db.php');
    require 'jwt/createToken.php';

    if($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        //Get the POST data
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
        
        //If there is data
        if($data !== null){
            //If all fields were sent
            if(isset($data['username']) && isset($data['password'])) {
                //Use users collection
                $collection = $db -> selectCollection('users');

                //Search if the user already exists
                $search = $collection -> findOne(['username' => $data['username']]);

                //If username exists
                if(isset($search)) {
                    $user = $search -> jsonSerialize();

                    if(password_verify($data['password'], $user -> password)){
                        $token = createToken($user -> _id, $user -> username, $user -> name);

                        http_response_code(200);
                        echo json_encode(['message' => 'Succesfully logged in', 'token' => $token]);
                    }
                    else {
                        http_response_code(201);
                        echo json_encode(['error' => 'Invalid credentials']);
                    }
                }
                else {
                    http_response_code(201);
                    echo json_encode(['error' => 'Invalid credentials']);
                }

            }
            else {
                http_response_code(201);
                echo json_encode(['error' => 'Some data is missing']);
            }
        }
        else {
            http_response_code(202);
            echo json_encode(['error' => 'No data received']);
        }
    }
    else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
?>