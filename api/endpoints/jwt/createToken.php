<?php
    use Firebase\JWT\JWT;
    require 'SECRETKEY.php';

    function createToken($userid, $username, $name) {
        $payload = array(
            '_id' => $userid, 
            'username' => $username,
            'name' => $name
        );

        $token = JWT::encode($payload, getSecretKey(), 'HS256');

        return $token;
    }

?>