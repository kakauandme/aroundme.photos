var search = search || {};

dom.search = document.getElementById("search");
dom.form = document.getElementById("search_form");
dom.s_submit = document.getElementById("s_submit");
dom.s_input = document.getElementById("s_input");
dom.s_suggestions = document.getElementById("search_suggestions");
search.input_timer = 0;
search.selected_segesstion = -1;

dom.title = document.getElementById("title");
dom.subtitle = document.getElementById("subtitle");

// var s_reset = document.getElementById("s_reset");
// s_reset.addEventListener("click", function(event){
// 	search.className="";
// 	var self = this;
// 	setTimeout(function(){
// 		self.parentNode.reset();
// 	}, 400);
	
// });

search.service = null;
//autocomplete = new google.maps.places.Autocomplete(s_input, {types: ['(cities)']});
//autocomplete.setTypes(['geocode']);

search.preg_quote = function( str ) {
    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
};

search.highlight =  function ( data, keyword ) {
    return data.replace( new RegExp( "(" + search.preg_quote( keyword ) + ")" , 'gi' ), "<strong>$1</strong>" );
};


search.resetInput = function(setFocusTo){

	dom.search.className = "";
	var setFocusTo = setFocusTo || dom.s_submit;
  	search.selected_segesstion=-1;
  	dom.s_suggestions.innerHTML="";
  	dom.s_submit.title = "Search"; 	
  	
  	setTimeout(function(){
		dom.s_input.value = "";
	}, 600);
	
	setFocusTo.focus();
}




search.processSugesstions =  function(predictions, status) {
	dom.s_suggestions.innerHTML = "";
	if (status !== google.maps.places.PlacesServiceStatus.OK) {
		//console.log(status);
		return;
	}

 // var results = document.getElementById('results');
 	
	for (var i = 0, prediction; prediction = predictions[i], ( i<3 && i < predictions.length); i++) {
		//console.log(prediction);
		var d = document.createElement('p');
		d.innerHTML = search.highlight(prediction.description,dom.s_input.value);
		d.setAttribute("data-id", prediction.place_id);
		d.setAttribute("data-description", prediction.description);
		
		d.addEventListener("click", function(curI){
			return function(){
				search.selected_segesstion = curI;
				//selectSugestion();
				//dom.s_input.focus();
				search.displaySuggestion();
			};
		}(i));

		dom.s_suggestions.appendChild(d);

	}
}

search.getSuggestions =  function(){

	
	clearTimeout(search.input_timer); // Clear the timer so we don't end up with dupes.
	search.input_timer = setTimeout(function() { // assign timer a new timeout
		//console.log(dom.s_input.value);
		if(dom.s_input.value.length === 0){
			dom.s_suggestions.innerHTML = "";
			search.selected_segesstion = -1;
			dom.search.className = "open empty";
			dom.s_submit.title = "Close";
		}else{
			dom.search.className = "open";
			dom.s_submit.title = "Search";
	   		map.autocomplete.getPlacePredictions({ input: dom.s_input.value , types: ['(cities)'] }, search.processSugesstions);
	   	}
	}, 300); // 200ms delay, tweak for faster/slower
}

search.selectSugestion = function(){
	for (var i = dom.s_suggestions.childNodes.length - 1; i >= 0; i--) {
		if(i !== search.selected_segesstion){
			dom.s_suggestions.childNodes[i].className="";
		}
		else{
			dom.s_suggestions.childNodes[search.selected_segesstion].className="selected";
		}

	}
	dom.s_input.value = dom.s_suggestions.childNodes[search.selected_segesstion].getAttribute("data-description");
}


search.displaySuggestion = function(){
	if(dom.search.className.length === 0){//open
		ga('send', 'event', 'Interface', 'Search');
		//setTimeout(function(){ // doesn't work in iOS
			dom.s_input.focus();
		//},500);		
		search.selected_segesstion = -1;
		dom.s_submit.title = "Close";
		dom.search.className = "open empty";		


	}else if(dom.s_input.value.length === 0){//close

		search.resetInput();

	}else if(dom.s_suggestions.childNodes.length !== 0){//results

		if(search.selected_segesstion < 0){// sugestion not selected
			search.selected_segesstion = 0;
		}
		search.selectSugestion();
		//console.log(dom.s_input.value);// SEARCH!

		if(!search.service){

			search.service = new google.maps.places.PlacesService(map.map);
		}
		search.service.getDetails({
			placeId: dom.s_suggestions.childNodes[search.selected_segesstion].getAttribute("data-id")
		}, 	function(place, status) {
			    if (status === google.maps.places.PlacesServiceStatus.OK) {
			    	//console.log(place);

			    	map.cityMarker.updatePosition_(place);
			      	document.title  = place.name + " | Around me photos";

			      	dom.title.textContent = "Photos of "  + place.name;
			      	dom.subtitle.textContent =  'Explore social activity in ' + place.name +  " area";

			      	var _url = "";
			      	for (var i = place.address_components.length - 1; i >= 0; i--) {
			      		if(place.address_components[i].types[0] === "country"){
			      			_url = "/" + place.address_components[i].long_name.toLowerCase().replace(/ /g, "-");
			      			break;
			      		}
			      	}
			      	_url += "/" + place.name.toLowerCase().replace(/ /g, "-");

			      	history.replaceState({}, document.title, _url);
			      	ga('send', 'pageview', {
					  'page': _url,
					  'title': document.title
					});
			      	search.resetInput();
			      
			    }else{
			    	dom.search.className = "open noresults";
					setTimeout(function(){
						dom.search.className = "open";
					}, 600);
			    }
	});
		

		
	}else{// no results
		dom.search.className = "open noresults";
		setTimeout(function(){
			dom.search.className = "open";
		}, 600);
	}
}

dom.form.addEventListener("submit", function(e){	

	e.preventDefault();
	
	search.displaySuggestion();

});

dom.s_submit.addEventListener("click", function(){	

	
	search.displaySuggestion();

});



dom.s_input.addEventListener("keyup", function (e) {
	//console.log("keydone" + e.keyCode);
	if(e.keyCode === 8 || (e.keyCode <= 90 && e.keyCode >= 48)){ // backspace || letters and numbers
    	search.getSuggestions();
    	//console.log(e.keyCode);
    }else if(e.keyCode === 27){//esc
    	e.preventDefault();
    	search.resetInput();

    }else if(dom.s_suggestions.childNodes.length !== 0){
 //    		console.log("dom.s_suggestions");

     	if(e.keyCode===38 || e.keyCode===40 || e.keyCode === 9){

	    	if(e.keyCode===38){//up
	    		if(--search.selected_segesstion < 0){
	    			search.selected_segesstion = dom.s_suggestions.childNodes.length-1;
	    		}

	    	}else{//down
	    		if(++search.selected_segesstion >= dom.s_suggestions.childNodes.length){
	    			search.selected_segesstion = 0;
	    		}
	  			  			
	    	}
	     	search.selectSugestion();
	     	e.preventDefault();  	

     	}
    }
});