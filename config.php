<?php

$siteName = "Around me photos";

$shortName = "Around me";

$baseURL = "http://" . $_SERVER["HTTP_HOST"];

$URL =  $baseURL . $_SERVER["REQUEST_URI"];



$latlng = "0,0";
if(isset($_COOKIE["lat"]) && isset($_COOKIE["lng"])){
	$latlng = $_COOKIE["lat"] . ",". $_COOKIE["lng"];
}elseif(isset($_SERVER["HTTP_X_APPENGINE_CITYLATLONG"])){
	$latlng = $_SERVER['HTTP_X_APPENGINE_CITYLATLONG'];
}else{
	$latlng = "-37.803501,144.977001"; //Thick
}
$arrlatlng = explode(",", $latlng); 
$lat = $arrlatlng[0];
$lng = $arrlatlng[1];



$title = $siteName;
$subtitle = 'Explore social activity next to you';
$pageTitle = $siteName . " | " . $subtitle;

$path = strtolower(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));


$city = FALSE;
$country = FALSE;
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

if($city){

	$title = "Photos of " . $city;

	$subtitle = 'Explore social activity in ' . $city . " area";

	$pageTitle = $city . " | " . $siteName;
}

$description = 'Check out real-time photo updates on a map and discover what is happening ' .($city?'around '.$city:'at your location') . ' through pictures and images taken nearby.';

$twitterTitle = ($city?$title:$siteName . " - " . $subtitle);

$socialTitle = ($city?$title:$subtitle);


$SEO = "Check out real-time Instagram updates in your area and discover what is happening around you through pictures and images taken by people in your nearby location. Map out what's next you with Around me photos.";