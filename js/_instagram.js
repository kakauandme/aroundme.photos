var instagram = instagram || {};


////////Instagramm variables

instagram.instagramAppKey = '4a37870c5f594c2c9c563a80fae04772'; // live



//instagram.instagramAppKey = '51533e28dbb84aeca7222a73ac49b70c'; // dev


instagram.instagramUrl = 'https://api.instagram.com/v1/media/search?callback=processInstagramImages&client_id=' + instagram.instagramAppKey;

function processInstagramImages(respond){

	if(respond.meta.code === 200 && respond.data.length > 0){
		//console.log("Processing images (" + respond.data.length + ")");
		//console.log(respond.data);
		for(var i = 0; i < respond.data.length; i++){

			if(respond.data[i].type !== "image") {
				////console.log("video");
				continue;
			}
			if(!localStorage.getItem(respond.data[i].id)){
		    	map.markers.push(new PhotoOverlay(respond.data[i], map.map));
			}
			try{
				localStorage.setItem(respond.data[i].id, JSON.stringify(respond.data[i]));
			}catch(e){
				console.error("Localstorage error: " + e);
			}
		}

	}
}

instagram.getImagesFromInstagram =  function(){

	//console.log("Requesting images");



	var curUrl = instagram.instagramUrl;


	curUrl += "&lat=" + map.center.lat();
	curUrl += "&lng=" + map.center.lng();
	curUrl += "&distance=" + map.radius;


	//console.log(curUrl);
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
    script.src = curUrl;
    document.body.appendChild(script);
};




instagram.getImagesFromLocalStorage = function(){
	//console.log("Adding images from LocalStorage (" + (localStorage.length - 2) + ")");

	var now = new Date();
	var photoTime;
	//var diff = 0;
	var photo;
	var cnt = 0;
	//console.log(localStorage);
	for(var key in localStorage) {
		 if(key !== "length" && key !== "key" && key !== "getItem" && key !== "setItem" && key !== "removeItem" && key !== "clear"){
		 	//console.log(key);
		 	photo = JSON.parse(localStorage.getItem(key));
		 	if(!photo){
		 		continue;
		 	}
		 	photoTime =  new Date(parseInt(photo.created_time) * 1000);

		 	if(Math.ceil((now - photoTime)/ (1000 * 3600 * 24)) > 1){
		 		//console.log("Old photo deleted (" +photoTime.toDateString() +")");
		 		localStorage.removeItem(key);
		 	}else{

			    map.markers.push(new PhotoOverlay(photo));
			    if(++cnt > 999){
			    	break;
			    }
			}
		}
	}
};

instagram.processLocalImages=  function(){
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
