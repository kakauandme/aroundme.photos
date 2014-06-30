// @codekit-prepend "_photooverlay.js"


	var body = document.getElementById("body");

	//var browserSupport = (typeof(Storage) !== "undefined") && navigator.geolocation;




	var colors = {
		purple : "#7329b0", 
		red :"#f74552", 
		"dark-purple" : "#4f007d", 
		blue: "#1a75cf", 
		green: "#66d43d", 
		yellow: "#fff5a1" , 
		black: "#24292e", 
		grey: "#414b56", 
		"light-grey" : "#8c8f91" 
	};

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
	var marker;

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


////////Instagramm variables 

	var APP_KEY = '4a37870c5f594c2c9c563a80fae04772';

	var instagramUrl = 'https://api.instagram.com/v1/media/search?callback=processImages&client_id=' + APP_KEY;


	var curTimestamp = 0;

//////////////Storage

	if(typeof(Storage)!== "undefined"){
		curTimestamp = parseInt(localStorage.timestamp) || curTimestamp;
		curentPosition.lat = parseFloat(localStorage.lat) || curentPosition.lat;
		curentPosition.lng = parseFloat(localStorage.lng) || curentPosition.lng;
	}




		function addImage(photo){



			var imgPos = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);


			/*if(!bounds.contains(imgPos)){ // remove when cluster is ready
				return;
			}*/

			var img = new Image();

			//if(bounds.contains())

		    img.onload = function(){
		    	//alert(this.src);
		    	if(this.getAttribute('data-url') != this.src)
		    		var overlay =  new PhotoOverlay(map, imgPos, this);
		    }; 

		    img.onerror = function(){
		    	 localStorage.removeItem(photo.id);
		    };

			img.src = photo.images.thumbnail.url;
			img.setAttribute('data-url',photo.images.standard_resolution.url);
			img.alt = ((photo.caption)?photo.caption.text + " by ":"") + photo.user.username;

		}

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


		function getCurLocation(){
			// Try W3C Geolocation (Preferred)
			console.log("Finding location");

			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					function(position) { //location found


						console.log("Location found");

						center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

					  	marker.setPosition(center);

					  	map.panTo(center);

					  //	bounds = map.getBounds();

					  	localStorage.lat = center.lat();
		 				localStorage.lng = center.lng();

					  	
					},
					function(error){ //location failed
						console.log("Location failed");
						marker.setTitle("Geolacation is unavailable");
						switch(error.code) {
					        case error.PERMISSION_DENIED:
					           console.log("User denied the request for Geolocation.");
					            break;
					        case error.POSITION_UNAVAILABLE:
					            console.log("Location information is unavailable.");
					            break;
					        case error.TIMEOUT:
					            console.log("The request to get user location timed out.");
					            break;
					        case error.UNKNOWN_ERROR:
					            console.log("An unknown error occurred.");
					            break;
					    }		
					}
				);
			}else { // browser doesn't support
				console.log("Location unsupported");
				marker.setTitle("Geolacation is unavailable");
			}
		}

		function calcMapRadius(){



			var ne = bounds.getNorthEast();
			var top =  new google.maps.LatLng(ne.lat(), center.lng());
			var right =  new google.maps.LatLng(center.lat(), ne.lng());



			var toTop = getDistance(center, top );
			var toRight = getDistance(center, right );

			radius = (toTop < toRight)?toTop:toRight;

			console.log("Radius: " + radius);
			


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
				if(typeof(Storage)!== "undefined"){
					for(var i = 0; i < respond.data.length; i++){

						if(respond.data[i].type != "image") {
							//console.log("video");
							continue;
						}

						// if(curTimestamp < (t = parseInt(respond.data[i].created_time))){
						// 	curTimestamp = t;
						// 	localStorage.timestamp = curTimestamp;
						// }


						if(typeof(localStorage[respond.data[i].id]) === "undefined"){
							addImage(respond.data[i]);
						}	
						localStorage[respond.data[i].id] = JSON.stringify(respond.data[i]);
					}
				}


			}else{
				console.log("Images failed");
			}


		}

		function getImagesFromStorage(){
			
			console.log("Images from LocalStorage");
			for(var key in localStorage) {
				 if(key != "lat" && key != "lng" && key != "timestamp"){
				 	addImage(JSON.parse(localStorage[key]));
				 }
			}
			
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

			var thickMap = new google.maps.StyledMapType(stylers, {name: "Thick Map"});

			var mapOptions = {
			  center: center,
			  zoom: 16,
			  minZoom: 12,
			  disableDefaultUI: true,
			  overviewMapControl: true,
				mapTypeControlOptions: {
				  	mapTypeIds: ['Thick']
				}		
			};


			map = new google.maps.Map(document.getElementById("map"),mapOptions);

			map.mapTypes.set('Thick', thickMap);
			map.setMapTypeId('Thick');

			marker = new google.maps.Marker({
				position: center,
				icon: pin,
				map: map,
				title: "You are here!",
				zIndex: 100
			});

	
			
			//getImagesFromStorage();
			getCurLocation();


			google.maps.event.addListener(map, 'tilesloaded', function(){


				console.log("Bounds changed");

				center = map.getCenter();

				bounds = map.getBounds();


				//calcMapRadius();

				if(radius == 0){
					calcMapRadius();

					if(radius >= 5000){
						map.setOptions({ minZoom: map.getZoom()});
						console.log("Zoom loocked(" + map.getZoom() + ")");
					}
				}


				

				getImagesFromInstagram();


				
				if(timer != 0){
					clearInterval(timer);
					timer = 0;
					body.className += " ready";

				}

				
			});


			google.maps.event.addListener(map, 'zoom_changed', function(){

				console.log("Zoomed(" + map.getZoom()+")");
				map.setOptions({ minZoom: 12});
				radius=0;

			});

			window.onresize = function(event) {

				console.log("Resized");
				map.setOptions({ minZoom: 12});
				radius=0;
			};


		}
		// function loadMapScript() {
		// 	var script = document.createElement('script');
		// 	script.type = 'text/javascript';
		// 	script.src = '//maps.googleapis.com/maps/api/js?v=3.exp&callback=initialize&key=AIzaSyAdTpn_GSHnRcfX3vd6jcfibpJMpICcJW4';
		// 	document.body.appendChild(script);
		// }
		//window.onload = loadMapScript;
		google.maps.event.addDomListener(window, 'load', initialize);


		document.getElementById("hamburger").addEventListener("click", function(){

			var reg = new RegExp('(\\s|^)nav(\\s|$)');
			if(reg.test(body.className))		
					body.className = body.className.replace(reg,'');
			else										
				body.className += " nav";

		});

		


