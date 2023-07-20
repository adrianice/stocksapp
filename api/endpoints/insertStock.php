<?php
    require realpath(__DIR__ . '/../db.php');
    require 'jwt/verifyToken.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $token = $_SERVER['HTTP_AUTHORIZATION'];

            if (verifyToken($token)) {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                if ($data !== null) {
                    if (isset($data['_id']) && isset($data['stock'])) {
                        $stock = $data['stock'];

                        $collection = $db -> selectCollection('favoriteStocks');

                        $idvalue = $data['_id']['$oid'];

                        $search = [
                            'userid' => new MongoDB\BSON\ObjectId($idvalue),
                            'stocks.symbol' => $stock['symbol']
                        ];

                        $result = $collection -> findOne($search);

                        if (!$result) {
                            $filter = ['userid' => $search['userid']];
                            $update = ['$addToSet' => ['stocks' => $stock]];

                            $collection -> updateOne($filter, $update);

                            http_response_code(200);
                            echo json_encode(['message' => 'Stock successfully added']);
                        }
                        else {
                            http_response_code(201);
                            echo json_encode(['error' => 'User already has this symbol']);
                        }
                    }
                    else {
                        http_response_code(201);
                        echo json_encode(['error' => 'Not all data received']);
                    }
                }
                else {
                    http_response_code(202);
                    echo json_encode(['error' => 'No data recieved']);
                }
            }
            else {
                http_response_code(202);
                echo json_encode(['error' => 'Unauthorized']);
            }
        }
        else {
            http_response_code(202);
            echo json_encode(['error' => 'Unauthorized, token required']);
        }
    }
    else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
?>