<?php

$cacheBuster="99";
if($_SERVER['REMOTE_ADDR'] == "127.0.0.1"){
	$cacheBuster = time();
}
$siteName = "Around me photos";

$shortName = "Around me";

$baseURL = "http://" . $_SERVER["HTTP_HOST"];

$URL =  $baseURL . $_SERVER["REQUEST_URI"];


$title = $siteName;
$subtitle = 'Explore social activity next to you';
$pageTitle = $siteName . " | " . $subtitle;

$path = strtolower(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if(preg_match('/^\/([a-z-]+)\/([a-z-]+)\/?$/', $path, $matches)){
	if(count($matches) == 3){
		$country = ucfirst(str_replace("-", " ", $matches[1]));
		$city = ucfirst(str_replace("-", " ", $matches[2]));

	}
}elseif(preg_match('/^\/([a-z-]+)\/?$/', $path, $matches)){
	if(count($matches) == 2){
		
		$city = ucfirst(str_replace("-", " ", $matches[1]));

	}
}

$countryExists = isset($country);
if($cityExists = isset($city)){

	$title = "Photos of " . $city;

	$subtitle = 'Explore social activity in ' . $city . " area";

	$pageTitle = $city . " | " . $siteName;
}

$description = 'Check out real-time photo updates on a map and discover what is happening ' .($cityExists?'around '.$city:'at your location') . ' through pictures and images taken nearby.';

$twitterTitle = ($cityExists?$title:$siteName . " - " . $subtitle);

$socialTitle = ($cityExists?$title:$subtitle);


$SEO = "Check out real-time Instagram updates in your area and discover what is happening around you through pictures and images taken by people in your nearby location. Map out what's next you with Around me photos.";