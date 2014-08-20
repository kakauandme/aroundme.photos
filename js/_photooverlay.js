
PhotoOverlay.prototype = new google.maps.OverlayView();



function PhotoOverlay(photo, m ) {
	this._map      = m || null;
	this._position = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);
	this._photo = photo;
	this._marker  = null; //div
	this._img  = null;
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



		if(!curItem._zoomed){

			marker.className+= " loaded flyin";
			
			setTimeout(function(){
				marker.className = marker.className.replace(regflyin,'');
				google.maps.event.addDomListener(marker, 'click', function(e) {
					return function(){
						e.zoom();
				    };		
				}(curItem));
			},1500);
			decrement();

		}
    };
    img.onerror = function(){ 
    	localStorage.removeItem(photo.id);
    	if(curItem._zoomed){ // if hires failes fallback to thumbnail
    		img.src = photo.images.thumbnail.url;
    	}else{
    		decrement();
    	}

    };

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
  google.maps.event.clearInstanceListeners(this._marker);
  this._marker.parentNode.removeChild(this._marker);
  this._marker = null;
	this._img  = null;
	this._zoomed = false;
	this._map  = null;
};


PhotoOverlay.prototype.draw = function() {

	var overlayProjection = this.getProjection();
	var point = overlayProjection.fromLatLngToDivPixel(this._position);

	var container = this._marker;

	container.style.left = (point.x + (-container.offsetWidth/2)) + 'px';
	container.style.top  = (point.y + (-container.offsetHeight/2)) + 'px';
};

PhotoOverlay.prototype.zoom = function() {



	var marker = this._marker;
	//console.log("Zoomed");


	if(regzoomed.test(marker.className)){
		
		marker.className = "marker loaded";
		this._marker.getElementsByTagName("span")[0].className = "info";
		this._marker.getElementsByTagName("span")[0].title="Info";

	}else{
		
		//container.className = container.className.replace(new RegExp('(\\s|^)unzoomed(\\s|$)'),'zoomed');
		marker.className += " zoomed";

		if(!this._zoomed){
			this._zoomed = true;
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
					this.title="Hide info";
					this.className += " close";
					this.parentNode.parentNode.className += " detailed"; 
				}else{
					this.title="Info";
					this.className = "info";
					this.parentNode.parentNode.className = this.parentNode.parentNode.className.replace(regdetailed,'');
				}
			};

			this._marker.appendChild(overlay);
			overlay.appendChild(likes);
			overlay.appendChild(hr);
			overlay.appendChild(author);

			author.appendChild(user);

			overlay.appendChild(i);



		}


	}
};
