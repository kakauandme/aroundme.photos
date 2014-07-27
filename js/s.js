////////Instagramm variables 

//var APP_KEY = '4a37870c5f594c2c9c563a80fae04772'; // live


var APP_KEY = '51533e28dbb84aeca7222a73ac49b70c'; // dev


var instagramUrl = 'https://api.instagram.com/v1/media/search?callback=processImages&client_id=' + APP_KEY;



var colors = {	
	red :"#f74552", 
	"dark-purple" : "#4f007d", 
	blue: "#1a75cf", 
	green: "#66d43d", 
	yellow: "#fff5a1" , 
	black: "#24292e", 
	grey: "#414b56", 
	"light-grey" : "#8c8f91" 
};


var rad = function(x) {
	return x * Math.PI / 180;
};


var getDistance = function(p1, p2) {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(p2.lat() - p1.lat());
	var dLong = rad(p2.lng() - p1.lng());
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
	Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
};


// @codekit-prepend "_geolocationmarker.js"
// @codekit-prepend "_photooverlay.js"
// @codekit-prepend "_markerclustererplus.js"



var body = document.getElementById("body");


	//var browserSupport = (typeof(Storage) !== "undefined") && navigator.geolocation;


var mSeconds = 0;

var timerHolder = document.getElementById("timer").firstChild;

var timer = setInterval(function(){
		mSeconds+=100;
		var s = mSeconds/1000;
		timerHolder.innerText = s.toFixed(1) +" sec";

},100);

//////////Map Variables
var curentPosition = {lat: -37.803501, lng: 144.977001};  //Thick

var map;


//var GeoMarker;
var marker;

var markerCluster;

var bounds;
var center;


var radius = 0;

var pin;


var stylers = [
{
"stylers": [
  { "visibility": "off" }
]
},{
"featureType": "water",
"elementType": "geometry",
"stylers": [
  { "visibility": "simplified" },
  { "color": colors.blue }
]
},{
"featureType": "landscape.natural",
"elementType": "geometry",
"stylers": [
  { "visibility": "simplified" },
  { "saturation": 100 },
  { "lightness": -10 }
]
},{
"featureType": "poi",
"elementType": "geometry",
"stylers": [
  { "visibility": "simplified" },
  { "saturation": 100 }
]
},{
"featureType": "road",
"elementType": "geometry",
"stylers": [
  { "visibility": "simplified" },
  { "saturation": 100 }
]
},{
"featureType": "transit",
"elementType": "geometry",
"stylers": [
  { "visibility": "simplified" },
  { "saturation": 100 }
]
},{
"featureType": "landscape.man_made",
"elementType": "geometry",
"stylers": [
  { "visibility": "simplified" },
  { "saturation": 100 }
]
},{
"featureType": "landscape.natural.terrain",
"stylers": [
  { "visibility": "off" }
]
}
];









var curTimestamp = 0;

//////////////Storage

if(typeof(Storage)!== "undefined"){
	curTimestamp = parseInt(localStorage.timestamp) || curTimestamp;
	curentPosition.lat = parseFloat(localStorage.lat) || curentPosition.lat;
	curentPosition.lng = parseFloat(localStorage.lng) || curentPosition.lng;
}


function calcMapRadius(){


	center = map.getCenter();

	bounds = map.getBounds();


	var ne = bounds.getNorthEast();
	var top =  new google.maps.LatLng(ne.lat(), center.lng());
	var right =  new google.maps.LatLng(center.lat(), ne.lng());



	var toTop = getDistance(center, top );
	var toRight = getDistance(center, right );

	radius = (toTop < toRight)?toTop:toRight;

	console.log("Radius: " + radius);

	var showAccuracy = marker.circle_.getRadius() > radius/3;
	marker.circle_.setVisible(showAccuracy);
	if(showAccuracy){
		console.log("Accuracy shown");
	}else
		console.log("Accuracy hidden");

	if(radius >= 5000){
		map.setOptions({ minZoom: map.getZoom()});
		console.log("Zoom loocked(" + map.getZoom() + ")");
	}else{
		map.setOptions({ minZoom: null});
	}

	


}

function getImagesFromInstagram(){

	console.log("Requesting images");
	
	

	var curUrl = instagramUrl;

	curUrl += "&lat=" + center.lat();
	curUrl += "&lng=" + center.lng();
	curUrl += "&distance=" + radius;
	// if(curTimestamp != 0) // check for location
	// 	curUrl += "&min_timestamp="+curTimestamp;


	console.log(curUrl);
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
    script.src = curUrl;
    document.body.appendChild(script);
}

function processImages(respond){		

	if(respond.meta.code == 200){
		console.log("Processing images (" + respond.data.length + ")");
		//console.log(respond.data);
		var markers = [];
		for(var i = 0; i < respond.data.length; i++){

			if(respond.data[i].type != "image") {
				//console.log("video");
				continue;
			}


			if(typeof(localStorage[respond.data[i].id]) === "undefined"){
				var overlay =  new PhotoOverlay(respond.data[i]);
		    	markers.push(overlay);
			}	
			localStorage[respond.data[i].id] = JSON.stringify(respond.data[i]);
		}
		markerCluster.addMarkers(markers);



	}else{
		console.log("Images failed");
	}


}


function getImagesFromLocalStorage(){
	console.log("Adding images from LocalStorage");

	var markers = [];
	var cnt = 0;
	for(var key in localStorage) {
		 if(key != "lat" && key != "lng" && key != "timestamp"){
		 	var photo = JSON.parse(localStorage[key]);
			var overlay =  new PhotoOverlay(photo);
		    markers.push(overlay);				 	
		    if(++cnt > 999)
		    	break;
		}
	}
	markerCluster.addMarkers(markers);

}


function initialize() {

	//curLatLng = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);
	console.log("Map initialization");			

	pin	= {
			path: 'M44.8,39.2C21.3,39.2,2.1,58.4,2.1,82s19.2,42.7,42.7,42.7S87.6,105.5,87.6,82S68.4,39.2,44.8,39.2zM48.3,112.7L42,86.4L16,79.8l51.6-18.9L48.3,112.7z M74,3.3c13.3,0,26.6,5.1,36.7,15.2c10.1,10.1,15.2,23.4,15.2,36.7h-11.3c0-10.4-4-20.8-11.8-28.6S84.5,14.8,74.1,14.8V3.3H74z M74,36.3c4.8,0,9.7,1.9,13.4,5.6c3.7,3.7,5.6,8.5,5.6,13.4h12c0-8-3.1-15.8-9-21.8c-6-6-14-9-21.8-9L74,36.3L74,36.3z',
			fillColor: colors.red,
			fillOpacity: 1,
			scale: 1,
			strokeWeight: 0,
			strokeColor:  colors.red,
			strokeOpacity: 0,
			anchor: new google.maps.Point(64, 64)
	};


	center = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);

	var saturatedMap = new google.maps.StyledMapType(stylers, {name: "Saturated Map"});

	var mapOptions = {
	  center: center,
	  zoom: 16,
	  disableDefaultUI: true,
	  overviewMapControl: true,
		mapTypeControlOptions: {
		  	mapTypeIds: ['Saturated']
		}		
	};


	map = new google.maps.Map(document.getElementById("map"),mapOptions);

	map.mapTypes.set('Saturated', saturatedMap);
	map.setMapTypeId('Saturated');


	markerCluster = new MarkerClusterer(map, []);
	getImagesFromLocalStorage();

	// Add curent position control
	var controlDiv = document.createElement('div');

	controlDiv.index = 1;

	var controlUI = document.createElement('div');
	controlUI.className = "cur-position-control";
	
	controlUI.title = 'Pan to my location';

	controlDiv.appendChild(controlUI);


	var img = new Image();
	img.src = "/img/location.gif"
	img.alt = "Pan to my location";
	controlUI.appendChild(img);


	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);


	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.panTo(marker.position);
		console.log("Move to my location");
	});


	marker = new GeolocationMarker();


    google.maps.event.addListenerOnce(marker, 'position_changed', function() {

    	console.log("Location changed");

		center = this.getPosition();

	  	//marker.setPosition(center);

	  	map.panTo(center);


	  	localStorage.lat = center.lat();
			localStorage.lng = center.lng();

      	//map.setCenter(this.getPosition());
      	//map.fitBounds(this.getBounds());
    });

    google.maps.event.addListener(marker, 'geolocation_error', function(e) {
      	alert('There was an error obtaining your position. Message: ' + e.message);
    });

	marker.setMap(map);



	google.maps.event.addListener(map, 'tilesloaded', function(){


		console.log("Bounds changed");

		
		if(radius == 0){ //run for a first time

			calcMapRadius();					

		}else{

			center = map.getCenter();

			bounds = map.getBounds();
		}


		getImagesFromInstagram();


		
		if(timer != 0){
			clearInterval(timer);
			timer = 0;
			body.className += " ready";
			setTimeout(function(){
				body.className += " complete";
			},600)
		}

		
	});


	google.maps.event.addListener(map, 'zoom_changed', function(){

		console.log("Zoomed(" + map.getZoom()+")");

		calcMapRadius();	

	});

	google.maps.event.addListener(map, 'resize', function(){

		console.log("Resized");

		radius = 0;

	});

	window.onresize = function(event) {
		google.maps.event.trigger(map, 'resize') 
	};


}
// function loadMapScript() {
// 	var script = document.createElement('script');
// 	script.type = 'text/javascript';
// 	script.src = '//maps.googleapis.com/maps/api/js?v=3.exp&callback=initialize&key=AIzaSyAdTpn_GSHnRcfX3vd6jcfibpJMpICcJW4';
// 	document.body.appendChild(script);
// }
//window.onload = loadMapScript;

if(!navigator.geolocation) { // add propper verification and better message
    alert('Your browser does not support geolocation ;/');
}else
	google.maps.event.addDomListener(window, 'load', initialize);


/*********************Hamburger*********************************/

document.getElementById("hamburger").addEventListener("click", function(){

	var reg = new RegExp('(\\s|^)nav(\\s|$)');
	if(reg.test(body.className))		
			body.className = body.className.replace(reg,'');
	else										
		body.className += " nav";
});