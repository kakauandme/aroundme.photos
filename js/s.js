////////Instagramm variables 

var APP_KEY = '4a37870c5f594c2c9c563a80fae04772'; // live


//var APP_KEY = '51533e28dbb84aeca7222a73ac49b70c'; // dev


var instagramUrl = 'https://api.instagram.com/v1/media/search?callback=processInstagramImages&client_id=' + APP_KEY;



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




var body = document.getElementById("body");


var mSeconds = 0;

var timerHolder = document.getElementById("timer").firstChild;

var timer = setInterval(function(){
		mSeconds+=100;
		var s = mSeconds/1000;
		timerHolder.textContent = s.toFixed(1) +" sec";

},100);

//////////Map Variables
var curentPosition = {lat: -37.803501, lng: 144.977001};  //Thick

curentPosition.lat = parseFloat(localStorage.lat) || curentPosition.lat;
curentPosition.lng = parseFloat(localStorage.lng) || curentPosition.lng;

var map;


//var GeoMarker;
var curPosMarker;

//Overlays
var markers = [];

var bounds;
var center;


var radius = 0;

var positionFlag = false;



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


function calcMapRadius(){


	center = map.getCenter();

	bounds = map.getBounds();

	var ne = bounds.getNorthEast();
	var top =  new google.maps.LatLng(ne.lat(), center.lng());
	var right =  new google.maps.LatLng(center.lat(), ne.lng());



	var toTop = getDistance(center, top );
	var toRight = getDistance(center, right );

	radius = (toTop < toRight)?toTop:toRight;

	//console.log("Radius: " + radius);

	var showAccuracy = curPosMarker.circle_.getRadius() > radius/3;
	curPosMarker.circle_.setVisible(showAccuracy);
	if(showAccuracy){
		//console.log("Accuracy shown");
	}else{
		//console.log("Accuracy hidden");
	}

	if(radius >= 5000){
		map.setOptions({ minZoom: map.getZoom()});
		//console.log("Zoom loocked(" + map.getZoom() + ")");
	}else{
		map.setOptions({ minZoom: null});
	}

	


}

function getImagesFromInstagram(){

	//console.log("Requesting images");
	
	

	var curUrl = instagramUrl;

	curUrl += "&lat=" + center.lat();
	curUrl += "&lng=" + center.lng();
	curUrl += "&distance=" + radius;


	//console.log(curUrl);
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
    script.src = curUrl;
    document.body.appendChild(script);
}

function processInstagramImages(respond){		

	if(respond.meta.code === 200){
		//console.log("Processing images (" + respond.data.length + ")");
		////console.log(respond.data);
		for(var i = 0; i < respond.data.length; i++){

			if(respond.data[i].type !== "image") {
				////console.log("video");
				continue;
			}
			if(typeof(localStorage[respond.data[i].id]) === "undefined"){
		    	markers.push(new PhotoOverlay(respond.data[i], map));
			}
			try{
				localStorage[respond.data[i].id] = JSON.stringify(respond.data[i]);
			}catch(e){
				//console.log("Localstorage error: " + e);
			}
		}

	}else{
		//console.log("Images failed");
	}


}


function getImagesFromLocalStorage(){
	//console.log("Adding images from LocalStorage (" + (localStorage.length - 2) + ")");
	var now = new Date();
	var photoTime;
	//var diff = 0;
	var photo;
	var cnt = 0;
	for(var key in localStorage) {
		 if(key !== "lat" && key !== "lng" && key !== "length"){
		 	photo = JSON.parse(localStorage[key]);
		 	photoTime =  new Date(parseInt(photo.created_time) * 1000); 	

		 	if(Math.ceil((now - photoTime)/ (1000 * 3600 * 24)) > 1){
		 		//console.log("Old photo deleted (" +photoTime.toDateString() +")");
		 		localStorage.removeItem(key);
		 	}else{

			    markers.push(new PhotoOverlay(photo));				 	
			    if(++cnt > 999){
			    	break;
			    }
			}
		}
	}
}

function processLocalImages(){		
	var inbounds = false;
	var inside = 0;
	var outside = 0;
	for (var i = 0; i < markers.length; i++) {
		inbounds = bounds.contains(markers[i].getPosition());

		if(inbounds){
			if(++inside > 99){
				break;
			}
			if(markers[i].getMap() === null){
				markers[i].updateMap(map);
			}
		}else {
			outside++;
			if(markers[i].getMap() !== null){
				markers[i].updateMap(null);
			}
		}
	}
	//console.log("Processing local images ("+inside+":"+outside+")");
}


function initialize() {


	
	

	//curLatLng = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);
	//console.log("Map initialization");			



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


	//////////////////////////////////////////////////////////////////////////
	curPosMarker = new GeolocationMarker(map);


	google.maps.event.addListener(curPosMarker.getPin(), 'click', function() {
		map.panTo(curPosMarker.getPosition());
		//console.log("Move to my location");

	});

    google.maps.event.addListenerOnce(curPosMarker, 'position_changed', function() {

    	//console.log("Location changed");
    	positionFlag = true;

		center = this.getPosition();

	  	//curPosMarker.setPosition(center);

	  	map.panTo(center);


	  	localStorage.lat = center.lat();
		localStorage.lng = center.lng();

      	//map.setCenter(this.getPosition());
      	//map.fitBounds(this.getBounds());
    });

    google.maps.event.addListenerOnce(curPosMarker, 'geolocation_error', function(e) {
    	//console.log("Geolocation error: " + e);
    	if(!positionFlag){
      		alert('There was an error obtaining your position. Please make sure that geolocation is enabled.');
      	}
    });


	//////////////////////////////////////////////////////////////////////////
	// Add curent position control
	var controlDiv = document.createElement('div');

	controlDiv.index = 1;

	var controlUI = document.createElement('div');
	controlUI.className = "cur-position-control";
	
	controlUI.title = 'Pan to my location';

	controlDiv.appendChild(controlUI);


	var img = new Image();
	img.src = "/img/location.gif";
	img.alt = "Pan to my location";
	controlUI.appendChild(img);


	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);


	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.panTo(curPosMarker.getPosition());
		//console.log("Move to my location");
	});

	

	//////////////////////////////////////////////////////////////////////////
	getImagesFromLocalStorage();
	//////////////////////////////////////////////////////////////////////////






	google.maps.event.addListener(map, 'tilesloaded', function(){


		//console.log("Bounds changed");

		
		if(radius === 0){ //run for a first time

			calcMapRadius();					

		}else{

			center = map.getCenter();

			bounds = map.getBounds();
		}


		getImagesFromInstagram();

		processLocalImages();


		if(timer !== 0){
			clearInterval(timer);
			timer = 0;
			body.className = "ready";
			setTimeout(function(){
				body.className += " complete";
			},1200);
		}

		
	});


	google.maps.event.addListener(map, 'zoom_changed', function(){

		//console.log("Zoomed(" + map.getZoom()+")");

		calcMapRadius();	

	});

	google.maps.event.addListener(map, 'resize', function(){

		//console.log("Resized");

		radius = 0;

	});

	window.onresize = function() {
		google.maps.event.trigger(map, 'resize');
	};


}



	

/*********************Hamburger*********************************/

document.getElementById("hamburger").addEventListener("click", function(){

	var reg = new RegExp('(\\s|^)nav(\\s|$)');
	if(reg.test(body.className)){
			body.className = body.className.replace(reg,'');
	} else{
		body.className += " nav";
	}
});

function loadResources() {

	initialize();
			
	//CSS
	var stylesheet = document.createElement('link');
	stylesheet.href = '/css/footer.css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);



	// GA 
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-40067737-9', 'aroundme.photos');
	ga('require', 'displayfeatures');
	ga('send', 'pageview');

}

if(!navigator.geolocation ||  (typeof(Storage) === "undefined") || navigator.userAgent.indexOf("Opera") !== -1) {
    //alert('Your browser does not support geolocation ;/');
    var str = '<p>You are using an <strong>outdated</strong> browser. <br>Please <a href="http://www.google.com/chrome/browser/"  target="_blank">upgrade your browser</a> to use this website.</p>';
    document.getElementById("browserhappy").innerHTML = str;
    body.className+= " ie";
    clearInterval(timer);
	timer = 0;
	timerHolder.textContent = "";

}else{	

	google.maps.event.addDomListener(window, 'load', loadResources);

}