<?php
    //Connecto to db
    $uri = 'mongodb://localhost:27017';
    $client = new MongoDB\Client($uri);

    $db = $client -> stocks;
?>