<?php

$siteName = "Around me photos";

$baseURL = "http://" . $_SERVER[HTTP_HOST];

$URL =  $baseURL . $_SERVER[REQUEST_URI];


$title = $siteName;
$subtitle = 'Explore social activity next to you';
$pageTitle = $siteName . " | " . $subtitle;



if($countryExists = isset($_GET["country"])){
	$country = ucfirst(str_replace("-", " ", $_GET["country"]));
}

if($cityExists = isset($_GET["city"])){

	$city = ucfirst(str_replace("-", " ", $_GET["city"]));

	$title = "Photos of " . $city;

	$subtitle = 'Explore social activity in ' . $city . " area";

	$pageTitle = $city . " | " . $siteName;
}

$description = 'Checkout real-time updates on a map and discover what is happening in ' .($cityExists?$city:'your') . ' area.';

$twitterTitle = ($cityExists?$title:$siteName . " - " . $subtitle);

$socialTitle = ($cityExists?$title:$subtitle);


$SEO = "Check out real-time Instagram updates in your area and discover what is happening around you through pictures and images taken by people in your nearby location. Map out what's next you with Around me photos.";


?>