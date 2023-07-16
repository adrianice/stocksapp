<?php
    require './vendor/autoload.php';
    
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');

    $request = $_SERVER['REQUEST_URI'];

    $endpoints = [
        '/api/signin' => 'endpoints/signin.php',
        '/api/login' => 'endpoints/login.php',
        '/api/logout' => 'endpoints/logout.php',
        '/api/checkLogged' => 'endpoints/checkLogged.php'
    ];

    if (array_key_exists($request, $endpoints)) {
        require $endpoints[$request];
    }
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
?>