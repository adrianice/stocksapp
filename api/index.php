<?php
    require './vendor/autoload.php';
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    //header('Access-Control-Max-Age: 86400');

    $request = $_SERVER['REQUEST_URI'];
    $basePath = parse_url($request, PHP_URL_PATH);

    $endpoints = [
        '/api/signin' => 'endpoints/signin.php',
        '/api/login' => 'endpoints/login.php',
        '/api/logout' => 'endpoints/logout.php',
        '/api/checkLogged' => 'endpoints/checkLogged.php',
        '/api/insertStock' => 'endpoints/insertStock.php',
        '/api/getUserStocks' => 'endpoints/getUserStocks.php',
        '/api/deleteUserStock' => 'endpoints/deleteUserStock.php'
    ];

    if (array_key_exists($basePath, $endpoints)) {
        require $endpoints[$basePath];
    }
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
?>