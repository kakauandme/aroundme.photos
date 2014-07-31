////////Instagramm variables 

var APP_KEY = '4a37870c5f594c2c9c563a80fae04772'; // live


//var APP_KEY = '51533e28dbb84aeca7222a73ac49b70c'; // dev


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



var stylers = [
  {
    "stylers": [
      { "saturation": 100 },
      { "visibility": "simplified" }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.natural.terrain",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "color": colors.blue }
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



	center = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);


	var mapOptions = {
	  center: center,
	  zoom: 16,
	  disableDefaultUI: true,
	  overviewMapControl: true,
	  disableDoubleClickZoom: true,
	  styles: stylers,
	  backgroundColor: "#FFEEC6"
		
	};


	map = new google.maps.Map(document.getElementById("map"),mapOptions);




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


	google.maps.event.addListener(marker.getMarker(), 'click', function() {
		map.panTo(marker.position);
		console.log("Move to my location");

	});

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


		//getImagesFromInstagram();


		
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