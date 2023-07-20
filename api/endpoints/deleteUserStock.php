<?php
require realpath(__DIR__ . '/../db.php');
require 'jwt/verifyToken.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' || $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $token = $_SERVER['HTTP_AUTHORIZATION'];

        if (verifyToken($token)) {
            if (isset($_GET['_id']) && isset($_GET['symbol'])) {
                $collection = $db->selectCollection('favoriteStocks');

                $idvalue = $_GET['_id']['$oid'];
                $search = ['userid' => new MongoDB\BSON\ObjectId($idvalue)];

                $result = $collection->findOne($search);

                if ($result) {
                    $userStocks = iterator_to_array($result->stocks);

                    $symbolToDelete = $_GET['symbol'];

                    $userStocks = array_filter($userStocks, function ($stock) use ($symbolToDelete) {
                        return $stock->symbol !== $symbolToDelete;
                    });

                    $result->stocks = $userStocks;
                    $collection->replaceOne(['_id' => $result->_id], $result);

                    http_response_code(200);
                    echo json_encode(['message' => 'Stock successfully deleted']);
                } else {
                    http_response_code(201);
                    echo json_encode(['error' => 'User not found']);
                }
            } else {
                http_response_code(202);
                echo json_encode(['error' => 'Not all data received']);
            }
        } else {
            http_response_code(203);
            echo json_encode(['error' => 'Unauthorized']);
        }
    } else {
        http_response_code(203);
        echo json_encode(['error' => 'Unauthorized, token required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>