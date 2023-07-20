<?php
    require realpath(__DIR__ . '/../db.php');

    if($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
        //Get the POST data
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        //If there is data
        if($data !== null){
            //If all fields were sent
            if(isset($data['username']) && isset($data['password']) && isset($data['name'])) {
                //Use users collection
                $collection = $db -> selectCollection('users');

                //Search if the user already exists
                $search = $collection -> find(['username' => $data['username']]);
                $count = count(iterator_to_array($search));

                //If username does not exists
                if($count <= 0) {
                    //Hash password
                    $newUser = [
                        'username' => $data['username'],
                        'password' => password_hash($data['password'], PASSWORD_DEFAULT),
                        'name' => $data['name']
                    ];

                    //Insert user on collection
                    $collection -> insertOne($newUser);
                    
                    //Get the inserted user from db to get _id
                    $insertedUser = $collection -> findOne(['username' => $data['username']]);
                    $user = $insertedUser -> jsonSerialize();

                    //Insert user favorite stocks
                    $collectionFavoriteStocks = $db -> selectCollection('favoriteStocks');
                    $collectionFavoriteStocks -> insertOne(['userid' => $user -> _id, 'stocks' => []]);

                    http_response_code(201);
                    echo json_encode(['message' => 'User correctly registered']);
                }
                else {
                    http_response_code(202);
                    echo json_encode(['error' => 'User already exists']);
                }

            }
            else {
                http_response_code(202);
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