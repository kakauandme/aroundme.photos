var photo = photo || {};

//https://github.com/500px/api-documentation/blob/master/endpoints/photo/GET_photos_search.md

var params = {
        image_size: '200,600',
        callback: 'processImages',
        rpp: 20,
        sort: 'created_at'
    },
    uriParams = '';

for (paramName in params) {
    uriParams += '&' + paramName + '=' + params[paramName];
}

photo.apiURL= 'https://api.500px.com/v1/photos/search.jsonp?consumer_key=jYmLQ1Ocnhs7xNhR2udoJPAKXGROI1GCiNPxO4Gf' + uriParams;



function processImages(respond){
	if(respond.photos && respond.photos.length > 0){
		//console.log("Processing images (" + respond.data.length + ")");
		//console.log(respond.data);
		for(var i = 0; i < respond.photos.length; i++){

			
			if(!respond.photos[i].latitude || !respond.photos[i].longitude){
				continue;
			}
			if(!localStorage.getItem(respond.photos[i].id)){// not in storage

				respond.photos[i] = photo.addJitterToCoordinates(respond.photos[i]);

				//console.log("add from photo");
		    	map.markers.push(new PhotoOverlay(respond.photos[i], map.map));
		    	
		    	try{
					localStorage.setItem(respond.photos[i].id, JSON.stringify(respond.photos[i]));
				}catch(e){
					console.error("Localstorage error: " + e);
				}
			}
			
		}

	}
}


photo.addJitterToCoordinates = function(photo){
	//console.log(location);

	//add 10 random meters
	var lc = map.jitter(photo.latitude, photo.longitude, 10);
	photo.latitude = lc.latitude;
	photo.longitude = lc.longitude;
	//console.log(location);
	return photo;
}	


photo.getRemoteImages =  function(){

	//console.log("Requesting images");



	var curUrl = photo.apiURL;


	curUrl += "&geo=" + map.center.lat()+","+map.center.lng()+","+Math.ceil(map.radius/1000)+"km";
	


	//console.log(curUrl);
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
    script.src = curUrl;
    document.body.appendChild(script);
};




photo.getLocalImages = function(){
	//console.log("Adding images from LocalStorage (" + (localStorage.length) + ")");

	var now = new Date();
	var photoTime;
	//var diff = 0;
	var photo;
	var cnt = 0;
	//console.log(localStorage);
	for(var key in localStorage) {
		 if(key !== "length" && key !== "key" && key !== "getItem" && key !== "setItem" && key !== "removeItem" && key !== "clear"){
		 	//console.log(key);
		 	try{


			 	photo = JSON.parse(localStorage.getItem(key));
			 	if(!photo){
			 		continue;
			 	}
			 	photoTime =  new Date(photo.created_at);
			 	//console.log(now - photoTime);
			 	if(Math.ceil((now - photoTime)/ (1000 * 3600 * 24)) > 7){ //remove pictures created more than 1 week ago
			 		//console.log("Old photo deleted (" +photoTime.toDateString() +")");
			 		localStorage.removeItem(key);
			 	}else{
			 		//console.log("add from storage");
				    map.markers.push(new PhotoOverlay(photo));
				    if(++cnt > 999){
				    	break;
				    }
				}
			}catch(e){
				console.error(e);
				localStorage.removeItem(key);
			}
		}
	}
};

photo.processLocalImages=  function(){
	var inbounds = false;
	var inside = 0;
	for (var i = 0; i < map.markers.length; i++) {
		inbounds = map.bounds.contains(map.markers[i].getPosition());

		if(inbounds){
			if(++inside > 99){
				break;
			}
			if(map.markers[i].getMap() === null){
				map.markers[i].updateMap(map.map);
			}
		}else {
			if(map.markers[i].getMap() !== null){

				if(map.markers[i]._zoomed){
					//body.classList.remove("noui");
					var tmp = map.markers[i];
					tmp.zoom();
					setTimeout(function(){
						tmp.updateMap(null);
					}, 600);
				}else{
					map.markers[i].updateMap(null);
				}



			}
		}
	}
	//console.log("Processing local images ("+inside+")");
}
