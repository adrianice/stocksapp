<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    require 'SECRETKEY.php';

    function verifyToken($token) {
        try {
            $decodedToken = JWT::decode($token, new Key(getSecretKey(), 'HS256'));
            //Valid token and signature
            return true;
        }
        catch (Exception $e) {
            //Not valid token or invalid signature
            return false;
        }
    }
?>