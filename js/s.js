////////Instagramm variables 

var APP_KEY = '4a37870c5f594c2c9c563a80fae04772'; // live


//var APP_KEY = '51533e28dbb84aeca7222a73ac49b70c'; // dev


var instagramUrl = 'https://api.instagram.com/v1/media/search?callback=processInstagramImages&client_id=' + APP_KEY;

var curIcon = 'M44.3,38.1c-24.2,0-43.8,20-43.8,44.7s19.7,44.8,43.8,44.8s43.8-20.1,43.8-44.8S68.5,38.1,44.3,38.1z M47.9,114.9l-6.5-27.6l-26.8-6.9l53-19.9L47.9,114.9z M74.3,0.5c13.6,0,27.2,5.3,37.6,15.9s15.6,24.5,15.6,38.4h-11.7c0-10.9-4-21.7-12.2-29.9S84.9,12.5,74.2,12.5L74.3,0.5L74.3,0.5z M74.3,35c4.9,0,10,1.9,13.7,5.8c3.8,3.8,5.7,9,5.7,14H106c1.4-11.7-2.6-17.8-9.3-22.9c-6.2-6.3-14.3-9.5-22.5-9.5V35L74.3,35z';
var geoIcon = 'M37,49.5l46.9-17.2L66.5,79.4l-5.7-24L37,49.5z M115.1,52.6c0,28.7-24.8,47.6-51.1,73.8c-26.2-26.3-51.1-45.2-51.1-73.8C12.9,24.4,35.8,1.5,64,1.5S115.1,24.4,115.1,52.6z M101.5,51.1c0-20.7-16.8-37.5-37.5-37.5c-20.7,0-37.5,16.8-37.5,37.5c0,20.7,16.8,37.5,37.5,37.5C84.7,88.5,101.5,71.8,101.5,51.1z';

var colors = {	
	red :"#f74552", 
	"dark-purple" : "#4f007d", 
	purple: "#7329b0",
	blue: "#1a75cf", 
	green: "#66d43d", 
	yellow: "#fff5a1" , 
	black: "#24292e", 
	grey: "#414b56", 
	"light-grey" : "#8c8f91" 
};

var regnav = new RegExp('(\\s|^)nav(\\s|$)');
//var regzoomed = new RegExp('(\\s|^)zoomed(\\s|$)');
var regflyin = new RegExp('(\\s|^)flyin(\\s|$)');
var regdetailed = new RegExp('(\\s|^)detailed(\\s|$)');

var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );


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

var radius = 0;


var ham = document.getElementById("hamburger");



// @codekit-prepend "_geocodingmarker.js"
// @codekit-prepend "_geolocationmarker.js"
// @codekit-prepend "_photooverlay.js"
// @codekit-prepend "_search.js"


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


// _geolocationmarker;
var curPosMarker;


// _geocodingmarker
var cityMarker;


var autocomplete;



//Overlays
var markers = [];

var curMarker = null;

var bounds;
var center;



var loadingCount = 0;


function increment(){
	if(++loadingCount === 1){
		ham.title="Loading ...";
		ham.className = "loading";
	}

	//console.log(str + " + " + loadingCount);
}

function decrement(){
	if(--loadingCount === 0){
		ham.title="Info";
		ham.className = "";
		//loadingCount = 0;
	}

	//console.log(str + " - " + loadingCount);
}

if (window.navigator.standalone) {
    document.getElementById("c").style.paddingTop="10px";
}



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
  },{
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "on" }
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

	curPosMarker.circle_.setVisible(curPosMarker.circle_.getRadius() > radius/3);


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


	

	if(respond.meta.code === 200 && respond.data.length > 0){
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
			if(markers[i].getMap() !== null){
				markers[i].updateMap(null);
			}
		}
	}
	//console.log("Processing local images ("+inside+")");
}


function initialize() {


	
	

	//curLatLng = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);
	//console.log("Map initialization");			



	center = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);


	var mapOptions = {
	  center: center,
	  zoom: geocoding?14:16,
	  disableDefaultUI: true,
	 // overviewMapControl: true,
	  disableDoubleClickZoom: true,
	  styles: stylers,
	  backgroundColor: "#FFEEC6"
		
	};


	map = new google.maps.Map(document.getElementById("map"),mapOptions);


	cityMarker = new GeocodingMarker(map);
	google.maps.event.addListener(cityMarker, 'position_changed', function() {

		//	console.log("City changed");

		center = this.getPosition();
	  	map.setCenter(center);
	  	var cityBounds = this.getBounds();
		var ne = cityBounds.getNorthEast();
		var sw = cityBounds.getSouthWest();

		var dist = getDistance(ne, sw );			
		if(dist/2 < 5000){
	  		map.fitBounds(cityBounds);
	  	}
		  

	});

    google.maps.event.addListener(cityMarker.getPin(), 'click', function() {
		map.panTo(cityMarker.getPosition());
		ga('send', 'event', 'Interface', 'City location marker');
		//console.log("Move to my location");

	});

	if(geocoding){
		var address = city;
		if(typeof country !== "undefined" && country.length !== 0){
			address+=", " + country;
		}

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				cityMarker.updatePosition_(results[0]);

			} else {
				window.location.href =  "/404.php";
			}
		});
	}
	


	//////////////////////////////////////////////////////////////////////////
	curPosMarker = new GeolocationMarker(map);


	google.maps.event.addListener(curPosMarker.getPin(), 'click', function() {
		map.panTo(curPosMarker.getPosition());
		ga('send', 'event', 'Interface', 'Current location marker');
		//console.log("Move to my location");

	});

    google.maps.event.addListenerOnce(curPosMarker, 'position_changed', function() {

    	//console.log("Location found");
 
    	if(!geocoding){
			center = this.getPosition();
	  		map.panTo(center);
	  	}

	  	localStorage.lat = this.getPosition().lat();
		localStorage.lng = this.getPosition().lng();

      	//map.setCenter(this.getPosition());
      	//map.fitBounds(this.getBounds());
    });

    google.maps.event.addListenerOnce(curPosMarker, 'geolocation_error', function(e) {
    	//console.log("Geolocation error: " + e);
    	if(!curPosMarker.getPosition() && !geocoding){
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

	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);


	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.panTo(curPosMarker.getPosition());
		ga('send', 'event', 'Interface', 'Current location button');
		//console.log("Move to my location");
	});

	

	//////////////////////////////////////////////////////////////////////////
	getImagesFromLocalStorage();
	//////////////////////////////////////////////////////////////////////////



	autocomplete = new google.maps.places.AutocompleteService();





	

	google.maps.event.addListener(map, 'dragstart', function(){
		//console.log("dragstart");
		
		increment();
	});

	google.maps.event.addListener(map, 'dragend', function(){
		//console.log("dragend");
		decrement();
	});




	google.maps.event.addListenerOnce(map, 'tilesloaded', function(){

		//console.log("tilesloadedONCE");
			clearInterval(timer);
			timer = 0;
			body.className = "ready";
			setTimeout(function(){
				body.className += " complete";
			},1200);


				

	});

	google.maps.event.addListener(map, 'idle', function(){
				//console.log("idle");
				increment();
				setTimeout(decrement, 1000);
			});

	google.maps.event.addListener(map, 'tilesloaded', function(){


		//console.log("tilesloaded");

		increment();

	

		
		if(radius === 0){ //run for a first time

			calcMapRadius();					

		}else{

			center = map.getCenter();

			bounds = map.getBounds();
		}



	

		getImagesFromInstagram();

		processLocalImages();

		
		setTimeout(decrement, 1000);


		

		
	});


	google.maps.event.addListener(map, 'zoom_changed', function(){

		//console.log("Zoomed(" + map.getZoom()+")");
		increment();

		setTimeout(decrement, 1000);

		calcMapRadius();	

	});

	google.maps.event.addListener(map, 'resize', function(){

		//console.log("Resized");

		//console.log("Zoomed(" + map.getZoom()+")");
		increment();

		setTimeout(decrement, 1000);

		radius = 0;

	});

	window.onresize = function() {
		google.maps.event.trigger(map, 'resize');
	};


}



	

/*********************Hamburger*********************************/

ham.addEventListener("click", function(){

	if(ham.className.length !== 0){
		return;
	}


	
	if(regnav.test(body.className)){
			body.className = body.className.replace(regnav,'');
			ham.title="Info";

	} else{
		body.className += " nav";
		ham.title="Close";
		ga('send', 'event', 'Interface', 'Hamburger');

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

if((!navigator.geolocation ||  (typeof(Storage) === "undefined") || navigator.userAgent.indexOf("Opera") !== -1) && !modernBrowser) {
    var str = '<p>Yоu аrе usіng аn <strong>оutdаtеd</strong> brоwsеr. <br>Рlеаsе <a href="http://www.google.com/chrome/browser/" target="_blank">uрgrаdе yоur brоwsеr</a> tо usе thіs wеbsіtе.</p>';
    document.getElementById("browserhappy").innerHTML = str;
    body.className= "ie";
    clearInterval(timer);
	timer = 0;
	timerHolder.textContent = "";

}else{	

	google.maps.event.addDomListenerOnce(window, 'load', loadResources);

}