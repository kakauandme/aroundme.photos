PhotoOverlay.prototype = new google.maps.OverlayView();


function PhotoOverlay(photo) {
	//this.map_      = map;
	this._position = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);
	this._photo = photo;
	this._marker  = null;
	this._img  = null;
	this._overlay  = null;
	this._zoomed = false;
	this._isAdded = false;
}

PhotoOverlay.prototype.onAdd = function() {
	
	var curItem = this;
	var photo = this._photo;

	

	var marker = document.createElement('div');	
	marker.id = "marker-" + photo.id;
	marker.setAttribute('data-id', photo.id);
	marker.className = "marker";

	var img = new Image();

    img.onload = function(){    	
    };
    img.onerror = function(){ 
    	localStorage.removeItem(photo.id);
    	if(curItem._zoomed) // if hires failes fallback to thumbnail
    		img.src = photo.images.thumbnail.url;
    };

    img.src = photo.images.thumbnail.url;


	var overlay = document.createElement('div');	
	overlay.className = "overlay";


	// var x = document.createElement('span');
	// x.title = "Close";
	// x.className = "close";
	// x.textContent = 'x';

	// var i = document.createElement('span');
	// i.title = "Info";
	// i.className = "info";
	// i.textContent = 'i';


	

	marker.appendChild(img);	

	marker.appendChild(overlay);

	// marker.appendChild(x);
	// marker.appendChild(i);	

	this._marker = marker;
	this._img = img;
	this._overlay = overlay;


	var panes = this.getPanes();
  	panes.overlayMouseTarget.appendChild(marker);
 // 	panes.overlayLayer.appendChild(container);


	google.maps.event.addDomListener(marker, 'click', function(e) {
		return function(){
			e.zoom();
	    }		
	}(this));

	
}
PhotoOverlay.prototype.getPosition = function() {
	return this._position;
};

PhotoOverlay.prototype.getLikes = function() {
	return parseInt(this._photo.likes.count);
};

PhotoOverlay.prototype.getisAdded = function() {
	return _isAdded;
};
PhotoOverlay.prototype.setisAdded = function(isAdded) {
	return this._isAdded = isAdded;
};

PhotoOverlay.prototype.onRemove = function() {
  google.maps.event.clearInstanceListeners(this._marker);
  this._marker.parentNode.removeChild(this._marker);
  this._marker = null;
};


PhotoOverlay.prototype.draw = function() {

	var overlayProjection = this.getProjection();
	var point = overlayProjection.fromLatLngToDivPixel(this._position);

	var container = this._marker;

	container.style.left = (point.x + (-container.offsetWidth/2)) + 'px';
	container.style.top  = (point.y + (-container.offsetHeight/2)) + 'px';
}

PhotoOverlay.prototype.zoom = function() {



	var marker = this._marker;
	console.log("Zoomed");


	var reg = new RegExp('(\\s|^)zoomed(\\s|$)');
	if(reg.test(marker.className)){
		
		marker.className = marker.className.replace(reg,'');
		//container.className += " unzoomed";

	}else{
		
		//container.className = container.className.replace(new RegExp('(\\s|^)unzoomed(\\s|$)'),'zoomed');
		marker.className += " zoomed";

		if(!this._zoomed){
			this._zoomed = true;
			console.log("Updated to hi-res");
		    this._img.src = this._photo.images.standard_resolution.url;



			var likes = document.createElement('p');
			likes.textContent = this._photo.likes.count; 
			likes.className = "likes";

			var hr = document.createElement('hr');


			var author = document.createElement('p');
			author.className = "author";
			author.textContent = "by ";

			var user = document.createElement('a');
			user.href = this._photo.link;
			user.title = this._photo.user.username;
			user.target = "_blank";
			user.textContent = (this._photo.user.full_name.length === 0)?this._photo.user.username:this._photo.user.full_name;

			this._overlay.appendChild(likes);
			this._overlay.appendChild(hr);
			this._overlay.appendChild(author);

			author.appendChild(user);



		}


	}
};
