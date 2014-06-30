PhotoOverlay.prototype = new google.maps.OverlayView();


function PhotoOverlay(map, position, image) {
	//this.map_      = map;
	this._position = position;
	this._div      = null;
	this._img    = image;

	this.setMap(map);
}

PhotoOverlay.prototype.onAdd = function() {


	var container = document.createElement('div');	
	

	container.className = "pin-container";

	
	container.appendChild(this._img);

	this._div = container;


	var panes = this.getPanes();
  	panes.overlayMouseTarget.appendChild(container);
 // 	panes.overlayLayer.appendChild(container);


	google.maps.event.addDomListener(container, 'click', function(e) {
		return function(){
			e.zoom();
	    }		
	}(this));

	
}

PhotoOverlay.prototype.onRemove = function() {
  this._div.parentNode.removeChild(this._div);
  this._div = null;
};


PhotoOverlay.prototype.draw = function() {
	var overlayProjection = this.getProjection();

	var point = overlayProjection.fromLatLngToDivPixel(this._position);

	var container = this._div;

	container.style.left = (point.x + (-container.offsetWidth/2)) + 'px';
	container.style.top  = (point.y + (-container.offsetHeight/2)) + 'px';
}

PhotoOverlay.prototype.zoom = function() {


	//console.log("zoom");

	var overlayProjection = this.getProjection();

	var point = overlayProjection.fromLatLngToDivPixel(this._position);

	var container = this._div;

	var img = this._img;

	var reg = new RegExp('(\\s|^)zoomed(\\s|$)');
	if(reg.test(container.className)){
		
		container.className = container.className.replace(reg,'');
		//container.className += " unzoomed";

	}else{
		
		//container.className = container.className.replace(new RegExp('(\\s|^)unzoomed(\\s|$)'),'zoomed');
		container.className += " zoomed";

		var nUrl = img.getAttribute('data-url');
		if(img.src != nUrl)
			img.src = nUrl;

	}
};
