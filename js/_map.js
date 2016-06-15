var map = map || {};

map.stylers = [
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
      { "color": global.colors.blue }
    ]
  },{
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [
      { "visibility": "on" }
    ]
  }
];

// function processGeolocation(response){
// 	if(response){
// 		//console.log(response);		
// 		map.setGeolocationByIp(response.loc);			
// 	}
// }

map.setGeolocationByIp = function(_lat, _lng, accuracy){
	var position = {};
	position.coords = {};
	position.coords.accuracy = accuracy || map.ipAccuracy;
	position.coords.latitude = _lat;
	position.coords.longitude = _lng;
	if(position.coords.latitude && position.coords.longitude){
		map.curPosMarker.updatePosition_(position);
	}
};

map.initialize =  function() {





	//curLatLng = new google.maps.LatLng(curentPosition.lat, curentPosition.lng);
	//console.log("Map initialization");



	map.center = new google.maps.LatLng(map.curentPosition.lat, map.curentPosition.lng);


	var mapOptions = {
	  center: map.center,
	  zoom: city?14:16,
	  disableDefaultUI: true,
	 // overviewMapControl: true,
	  disableDoubleClickZoom: true,
	  styles: map.stylers,
	  backgroundColor: "#FFEEC6"

	};


	map.map = new google.maps.Map(document.getElementById("map"),mapOptions);


	map.cityMarker = new GeocodingMarker(map.map);
	google.maps.event.addListener(map.cityMarker, 'position_changed', function() {

		//	console.log("City changed");

		map.center = this.getPosition();
	  	map.map.setCenter(map.center);
	  	var cityBounds = this.getBounds();
		var ne = cityBounds.getNorthEast();
		var sw = cityBounds.getSouthWest();

		var dist = map.getDistance(ne, sw);
		if(dist/2 < 5000){//fit city if zoom allows
	  		map.map.fitBounds(cityBounds);
	  	}


	});

    google.maps.event.addListener(map.cityMarker.getPin(), 'click', function() {
		map.map.panTo(map.cityMarker.getPosition());
		ga('send', 'event', 'Interface', 'City location marker');
		//console.log("Move to my location");

	});

	if(city){
		var address = city;
		if(country){
			address+=", " + country;
		}

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.cityMarker.updatePosition_(results[0]);

			} else {
				window.location.href =  "/404.php";
			}
		});
	}



	//////////////////////////////////////////////////////////////////////////
	map.curPosMarker = new GeolocationMarker(map.map);


	google.maps.event.addListener(map.curPosMarker.getPin(), 'click', function() {
		map.map.panTo(map.curPosMarker.getPosition());
		ga('send', 'event', 'Interface', 'Current location marker');
		//console.log("Move to my location");

	});

    google.maps.event.addListener(map.curPosMarker, 'position_changed', function() {

    	//console.log("Location found");

    	if(moveToCurPos && (map.accuracy == map.ipAccuracy || map.accuracy == 0)){

    		map.accuracy = this.getAccuracy();
			map.center = this.getPosition();
	  		map.map.panTo(map.center);

	  		//geocoding = true;// don't move map
	  	}

	  	global.createCookie("lat", this.getPosition().lat(),7);
		global.createCookie("lng", this.getPosition().lng(),7);
		global.createCookie("accuracy", this.getAccuracy(),7);

      	//map.setCenter(this.getPosition());
      	//map.fitBounds(this.getBounds());
    });

    google.maps.event.addListenerOnce(map.curPosMarker, 'geolocation_error', function(e) {
    	//console.log("Geolocation error: " + e);
    	if(!map.curPosMarker.getPosition()){

      		alert('There was an error obtaining your position. For better experience make sure that geolocation is enabled.');
      		//if(global.readCookie("lat") && global.readCookie("lng") && (acc = global.readCookie("accuracy"))){
      		map.setGeolocationByIp(map.curentPosition.lat, map.curentPosition.lng, parseInt(global.readCookie("accuracy")));
    //   		}else{
    //   			var t = document.getElementsByTagName('script')[0];
	   //    		var s = document.createElement('script');
				// s.type = 'text/javascript';  
				// s.async = "async";
				// t.parentNode.insertBefore(s, t);
				// s.src = "http://ipinfo.io/?callback=processGeolocation"; 
    //   		}
      		
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

	map.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);


	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.map.panTo(map.curPosMarker.getPosition());
		ga('send', 'event', 'Interface', 'Current location button');
		//console.log("Move to my location");
	});



	//////////////////////////////////////////////////////////////////////////
	photo.getLocalImages();
	//////////////////////////////////////////////////////////////////////////



	map.autocomplete = new google.maps.places.AutocompleteService();







	google.maps.event.addListener(map.map, 'dragstart', function(){
		//console.log("dragstart");

		global.increment();
	});

	google.maps.event.addListener(map.map, 'dragend', function(){
		//console.log("dragend");
		global.decrement();
	});




	google.maps.event.addListenerOnce(map.map, 'tilesloaded', function(){

		//console.log("tilesloadedONCE");
			clearInterval(global.timer);
			global.timer = 0;
			dom.body.className = "ready";
			setTimeout(function(){
				dom.body.className += " complete";
			},1200);




	});

	google.maps.event.addListener(map.map, 'idle', function(){
				//console.log("idle");
				global.increment();
				setTimeout(global.decrement, 1000);
			});

	google.maps.event.addListener(map.map, 'tilesloaded', function(){


		//console.log("tilesloaded");

		global.increment();




		if(map.radius === 0){ //run for a first time

			map.calcMapRadius();

		}else{

			map.center = map.map.getCenter();

			map.bounds = map.map.getBounds();
		}





		photo.getRemoteImages();

		photo.processLocalImages();


		setTimeout(global.decrement, 1000);





	});


	google.maps.event.addListener(map.map, 'zoom_changed', function(){

		//console.log("Zoomed(" + map.getZoom()+")");
		global.increment();

		setTimeout(global.decrement, 1000);

		map.calcMapRadius();

	});

	google.maps.event.addListener(map.map, 'resize', function(){

		//console.log("Resized");

		//console.log("Zoomed(" + map.getZoom()+")");
		global.increment();

		setTimeout(global.decrement, 1000);

		map.radius = 0;

	});

	window.onresize = function() {
		google.maps.event.trigger(map.map, 'resize');
	};
	/*********************Hamburger*********************************/

	


};

map.rad = function(x) {
	return x * Math.PI / 180;
};

map.R =  6378137; // Earth’s mean radius in m
map.one_m    = 1 / ((Math.PI * map.R) / 180);


map.randomInRange = function(from, to) {
  return (Math.random() * (to - from) + from).toFixed(10) * 1;
};

map.jitter = function(lat, lng, m) {
  return {
    latitude : map.randomInRange(
      lat - (m * map.one_m),
      lat + (m * map.one_m)
    ),
    longitude : map.randomInRange(
      lng - (m * map.one_m),
      lng + (m * map.one_m)
    )
  };
}



map.getDistance = function(p1, p2) {

	
	
	var dLat = map.rad(p2.lat() - p1.lat());
	var dLong = map.rad(p2.lng() - p1.lng());
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	Math.cos(map.rad(p1.lat())) * Math.cos(map.rad(p2.lat())) *
	Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = map.R * c;
	return d; // returns the distance in m
};

map.calcMapRadius = function(){


	map.center = map.map.getCenter();

	map.bounds = map.map.getBounds();

	var ne = map.bounds.getNorthEast();
	var top =  new google.maps.LatLng(ne.lat(), map.center.lng());
	var right =  new google.maps.LatLng(map.center.lat(), ne.lng());



	var toTop = map.getDistance(map.center, top );
	var toRight = map.getDistance(map.center, right );

	map.radius = (toTop < toRight)?toTop:toRight;

	//console.log("Radius: " + radius);

	map.curPosMarker.circle_.setVisible(map.curPosMarker.circle_.getRadius() > map.radius/3);


	if(map.radius >= 10000){// zoom out limitation
		map.map.setOptions({ minZoom: map.map.getZoom()});
		//console.log("Zoom loocked(" + map.getZoom() + ")");
	}else{
		map.map.setOptions({ minZoom: null});
	}

};

//////////Map Variables
map.curentPosition = {lat: lat, lng: lng};
localStorage.removeItem("lat"); //legacy
localStorage.removeItem("lng"); // legacy

map.map = null;


// _geolocationmarker;
map.curPosMarker = null;


// _geocodingmarker
map.cityMarker = null;


map.autocomplete = null;



//Overlays
map.markers = [];

map.curMarker = null;

map.bounds = null;
map.center = null;

map.radius = 0;

map.ipAccuracy = 5000;
map.accuracy = 0;

