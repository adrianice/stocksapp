<?php
    require realpath(__DIR__ . '/../db.php');
    session_start();

    if($_SERVER['REQUEST_METHOD'] === 'POST'){
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
                $search = $collection -> find(['username' => $data['username']]);
                $count = $search -> count();

                //If username exists
                if($count > 0) {
                    $user = $search -> toArray()[0];

                    if(password_verify($data['password'], $user['password'])){
                        //Store session
                        $_SESSION['user_username'] = $user['username'];
                        $_SESSION['user_name'] = $user['name'];
                        $_SESSION['user_id'] = $user['_id'];

                        http_response_code(200);
                        echo json_encode(['message' => 'Succesfully logged in']);
                    }
                    else {
                        http_response_code(401);
                        echo json_encode(['error' => 'Invalid credentials']);
                    }
                }
                else {
                    http_response_code(401);
                    echo json_encode(['error' => 'Invalid credentials']);
                }

            }
            else {
                http_response_code(400);
                echo json_encode(['error' => 'Some data is missing']);
            }
        }
        else {
            http_response_code(400);
            echo json_encode(['error' => 'No data received']);
        }
    }
    else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
?>