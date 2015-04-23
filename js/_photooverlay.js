
PhotoOverlay.prototype = new google.maps.OverlayView();


function PhotoOverlay(photo, m ) {
	this._map      = m || null;
	this._position = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);
	this._photo = photo;
	this._marker  = null; //div
	this._img  = null;
	this._HQ = false;
	this._zoomed = false;
	if(m){
		this.setMap(m);
	}
}

PhotoOverlay.prototype.onAdd = function() {


	increment();
	

	var curItem = this;
	var photo = this._photo;

	

	var marker = document.createElement('div');	
	marker.id = "marker-" + photo.id;
	marker.setAttribute('data-id', photo.id);
	marker.className = "marker";

	var img = new Image();


	

    img.onload = function(){  



		if(!curItem._HQ){

			marker.classList.add("loaded");
			marker.classList.add("flyin");
			
			setTimeout(function(){
				marker.classList.remove("flyin");
				google.maps.event.addDomListener(marker, 'click', function(m) {
					return function(event){
						event.stopPropagation(); 
						m.zoom();
						return false;
				    };		
				}(curItem));
			},1500);
			decrement();

		}
    };
    img.onerror = function(){ 
    	localStorage.removeItem(photo.id);
    	if(curItem._HQ){ // if hires failes fallback to thumbnail
    		img.src = photo.images.thumbnail.url;
    	}else{
    		decrement();
    	}

    };
    img.width = 150;
    img.height = 150;

    img.src = photo.images.thumbnail.url;

 


	

	marker.appendChild(img);	

	



	this._marker = marker;
	this._img = img;


	var panes = this.getPanes();
  	panes.overlayMouseTarget.appendChild(marker);
 // 	panes.overlayLayer.appendChild(container);


	

	
};
PhotoOverlay.prototype.getPosition = function() {
	return this._position;
};

PhotoOverlay.prototype.getLikes = function() {
	return parseInt(this._photo.likes.count);
};

PhotoOverlay.prototype.getMap = function () {
  return this._map;
};

PhotoOverlay.prototype.updateMap = function (m) {
  this._map = m;
  this.setMap(m);
};

PhotoOverlay.prototype.onRemove = function() {
	if(this === curMarker){
		curMarker = null;
	}
	google.maps.event.clearInstanceListeners(this._marker);
	this._marker.parentNode.removeChild(this._marker);
	this._marker = null;
	this._img  = null;
	this._HQ = false;
	this._zoomed = false;
	this._map  = null;
};


PhotoOverlay.prototype.draw = function() {

	var overlayProjection = this.getProjection();
	var point = overlayProjection.fromLatLngToDivPixel(this._position);

	var container = this._marker;

	var l = (point.x + (-container.offsetWidth/2));
	var t = (point.y + (-container.offsetHeight/2));

	container.style.left = l + 'px';
	container.style.top  = t + 'px';

};

PhotoOverlay.prototype.zoom = function() {


	//console.log("Zoomed");



	if(curMarker !== null){// marker is zoomed in

		var tmpMarker = curMarker._marker;
		
		curMarker._zoomed  = false;
		
		tmpMarker.classList.remove("zoomed");
		tmpMarker.getElementsByTagName("span")[0].className = "info";
		tmpMarker.getElementsByTagName("span")[0].title="Info";

		setTimeout(function(){
			tmpMarker.classList.remove("zoom");
		},300);

		if(curMarker === this){
			body.classList.remove("noui");
		}
	}


	if(curMarker !== this){// unzoomed marker is clicked
		var self = this;
		
		this._zoomed = true;
		//container.className = container.className.replace(new RegExp('(\\s|^)unzoomed(\\s|$)'),'zoomed');
		var marker = this._marker;
		

		var noUI = curMarker === null;
		setTimeout(function(){
				//marker.className += " zoom zoomed";
			if(noUI){
				//body.className += " noui";
				body.classList.add("noui");
			}
			marker.classList.add("zoom");
			marker.classList.add("zoomed");
			
		},100);
		
	
		

		ga('send', 'event', 'Photo', 'Zoomed');

		if(!this._HQ){
			this._HQ = true;
			//console.log("Updated to hi-res");
		    this._img.src = this._photo.images.standard_resolution.url;




			var overlay = document.createElement('div');	
			overlay.className = "overlay";



			var likes = document.createElement('p');
			likes.textContent = this._photo.likes.count; 
			likes.className = "likes";

			var hr = document.createElement('hr');


			var author = document.createElement('p');
			author.className = "author";
			author.textContent = "by ";

			var user = document.createElement('a');
			//user.href = this._photo.link;
			if(iOS){
				user.href = "instagram://user?username=" + this._photo.user.username;
			}else{
				user.href = "http://instagram.com/" + this._photo.user.username;
			}
			
			user.title =  (this._photo.user.full_name.length === 0)?this._photo.user.username:this._photo.user.full_name;
			user.target = "_blank";
			user.textContent =  this._photo.user.username;
			user.onclick = function(event) { event.stopPropagation(); };



			var i = document.createElement('span');
			i.title = "Info";
			i.className = "info";
			i.onclick = function(event) { 
				event.stopPropagation();
				if(this.className.length === 4){ // check if info
					ga('send', 'event', 'Photo', 'Details showed');
					this.title="Hide info";
					//this.className += " close";
					this.classList.add("close");
					this.parentNode.parentNode.classList.add("detailed"); 
				}else{
					this.title="Info";
					this.classList.remove("close");//remove .close
					this.parentNode.parentNode.classList.remove("detailed");
				}
			};

			this._marker.appendChild(overlay);
			overlay.appendChild(likes);
			overlay.appendChild(hr);
			overlay.appendChild(author);

			author.appendChild(user);

			overlay.appendChild(i);
		}

		map.panTo(this.getPosition());
		
		

		curMarker = this;

	}
	else{
		curMarker = null;
	}
	
};
