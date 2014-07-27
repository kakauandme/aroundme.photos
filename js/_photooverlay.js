PhotoOverlay.prototype = new google.maps.OverlayView();


function PhotoOverlay(photo) {
	//this.map_      = map;
	this._position = new google.maps.LatLng(photo.location.latitude, photo.location.longitude);
	this._photo = photo;
	this._div  = null;
	this._cover  = null;
	this._hires = false;
}
/*

 <div id="marker" class="marker" style="background-image: url(img/1.jpg);">
    <div class="wrap">                        
        <div class="cover" style="background-image: url(img/1.jpg);">                            
         </div>
         <div class="info">
            <span>
                <span class="likes">
                     <h3>10000&#128155;</h3>
                </span>
               
             </span>
             <span>
                <span class="line">
                    <hr />
                </span>
             </span>
            <span>
                <span class="author">
                    <p>by <a href="http://drbl.in/eNTe">kakauandme</a></p>
                </span>
            </span>
  
        </div>
    </div>
    <a href="#" class="close" title="close">x</a>                    
</div>
*/
PhotoOverlay.prototype.onAdd = function() {
	

	var photo = this._photo;

	

	var marker = document.createElement('div');	
	

	marker.id = "marker-" + photo.id;
	marker.setAttribute('data-id', photo.id);


	marker.className = "marker";


	var wrap = document.createElement('div');	
	wrap.className = "wrap";


	var x = document.createElement('a');
	x.href = '#';
	x.title = "Close";
	x.className = "close";
	x.textContent = 'x';




	var cover = document.createElement('div');	
	cover.className = "cover";
	cover.id = "cover-" + photo.id;

	var info = document.createElement('div');	
	info.className = "info";

	var row1 = document.createElement('span');
	var row2 = document.createElement('span');
	var row3 = document.createElement('span');

	var likes = document.createElement('span');
	likes.className = "likes";
	var line = document.createElement('span');
	line.className = "line";
	var author = document.createElement('span');
	author.className = "author";
	var close = document.createElement('span');
	close.className = "close";

	var h3 = document.createElement('p');
	h3.textContent = photo.likes.count; 
	h3.className = "h1";

	var hr = document.createElement('hr');

	//<p>by <a href="http://drbl.in/eNTe">kakauandme</a></p>

	var p = document.createElement('p');
	p.textContent = "by ";

	var link = document.createElement('a');
	link.href = photo.link;
	link.title = photo.user.username;
	link.target = "_blank";
	link.textContent = (photo.user.full_name.length === 0)?photo.user.username:photo.user.full_name;

	

	marker.appendChild(wrap);
	marker.appendChild(x);
	wrap.appendChild(cover);
	wrap.appendChild(info);
	info.appendChild(row1);
	info.appendChild(row2);
	info.appendChild(row3);
	row1.appendChild(likes);
	likes.appendChild(h3);
	row2.appendChild(line);
	line.appendChild(hr);
	row3.appendChild(author);
	author.appendChild(p);
	p.appendChild(link);




	var img = new Image();

    img.onload = function(){    
    	marker.style.backgroundImage="url('"+this.src+"')";
    	cover.style.backgroundImage="url('"+this.src+"')";
    	
    };
    img.onerror = function(){ 
    	localStorage.removeItem(photo.id);
    };

    img.src = photo.images.thumbnail.url;

	this._div = marker;
	this._cover = cover;


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



	var marker = this._div;
	console.log("Zoomed");


	var reg = new RegExp('(\\s|^)zoomed(\\s|$)');
	if(reg.test(marker.className)){
		
		marker.className = marker.className.replace(reg,'');
		//container.className += " unzoomed";

	}else{
		
		//container.className = container.className.replace(new RegExp('(\\s|^)unzoomed(\\s|$)'),'zoomed');
		marker.className += " zoomed";

		if(!this._hires){
			this._hires = true;
			console.log("Updated to hi-res");

			var cover = this._cover;

			var photo = this._photo;

			var img = new Image();

		    img.onload = function(){    
		    	marker.style.backgroundImage="url('"+this.src+"')";
		    	cover.style.backgroundImage="url('"+this.src+"')";
		    	
		    };
		    img.onerror = function(){ 
		    	localStorage.removeItem(photo.id);
		    };

		    img.src = photo.images.standard_resolution.url;
		}


	}
};
