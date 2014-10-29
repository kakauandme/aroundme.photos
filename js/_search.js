var search = document.getElementById("search");
var form = document.getElementById("search_form");
var s_submit = document.getElementById("s_submit");
var s_input = document.getElementById("s_input");
var s_suggestions = document.getElementById("search_suggestions");
var input_timer = 0;
var selected_segesstion = -1;

// var s_reset = document.getElementById("s_reset");
// s_reset.addEventListener("click", function(event){
// 	search.className="";
// 	var self = this;
// 	setTimeout(function(){
// 		self.parentNode.reset();
// 	}, 400);
	
// });


//autocomplete = new google.maps.places.Autocomplete(s_input, {types: ['(cities)']});
//autocomplete.setTypes(['geocode']);

function preg_quote( str ) {
        return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}

function highlight( data, search ) {
        return data.replace( new RegExp( "(" + preg_quote( search ) + ")" , 'gi' ), "<strong>$1</strong>" );
}



function processSugesstions(predictions, status) {
	s_suggestions.innerHTML = "";
	if (status != google.maps.places.PlacesServiceStatus.OK) {
		console.log(status);
		return;
	}

 // var results = document.getElementById('results');
 	
	for (var i = 0, prediction; prediction = predictions[i]; i++) {
		console.log(prediction);
		var d = document.createElement('p');
		d.innerHTML = highlight(prediction.description,s_input.value);
		d.setAttribute("data-id", prediction.place_id);
		d.setAttribute("data-description", prediction.description);
		
		d.addEventListener("click", function(curI){
			return function(){
				selected_segesstion = curI;
				selectSugestion();
				s_input.focus();
			}
		}(i));

		s_suggestions.appendChild(d);
	}
}

function getSuggestions(){

	
	clearTimeout(input_timer); // Clear the timer so we don't end up with dupes.
	input_timer = setTimeout(function() { // assign timer a new timeout
		//console.log(s_input.value.length);
		if(s_input.value.length === 0){
			s_suggestions.innerHTML = "";
			selected_segesstion = -1;
			search.className = "open empty";
			s_submit.title = "Close";
		}else{
			search.className = "open";
			s_submit.title = "Search";
	   		autocomplete.getPlacePredictions({ input: s_input.value , types: ['(cities)'] }, processSugesstions)
	   	}
	}, 300); // 200ms delay, tweak for faster/slower
}

function selectSugestion(){
	for (var i = s_suggestions.childNodes.length - 1; i >= 0; i--) {
		if(i !== selected_segesstion)
			s_suggestions.childNodes[i].className="";
		else
			s_suggestions.childNodes[selected_segesstion].className="selected";

	}
	s_input.value = s_suggestions.childNodes[selected_segesstion].getAttribute("data-description");
}

form.addEventListener("submit", function(e){	

	e.preventDefault();
	if(search.className.length === 0){//open
		search.className = "open empty";
		selected_segesstion = -1;
		s_submit.title = "Close";
		s_input.focus();


	}else if(s_input.value.length === 0){//close
		search.className="";
		s_submit.title = "Search";
		s_suggestions.innerHTML = "";


	}else if(s_suggestions.childNodes.length !== 0){//results

		if(selected_segesstion < 0){// sugestion not selected
			selected_segesstion = 0;
		}
		selectSugestion();
		console.log(s_input.value);// SEARCH!

		var service = new google.maps.places.PlacesService(map);
		service.getDetails({
			placeId: s_suggestions.childNodes[selected_segesstion].getAttribute("data-id")
		}, 	function(place, status) {
			    if (status == google.maps.places.PlacesServiceStatus.OK) {
			    	map.setCenter(place.geometry.location);
			      	var marker = new google.maps.Marker({
				        map: map,
				        position: place.geometry.location,
				        title: place.name
			      	});
			      	s_input.value = "";
			      	search.className = "";
			      	selected_segesstion=-1;
			      	search_suggestions.innerHTML="";
			      
			    }else{
			    	search.className = "open noresults";
					setTimeout(function(){
						search.className = "open";
					}, 600);
			    }
	});
		

		
	}else{// no results
		search.className = "open noresults";
		setTimeout(function(){
			search.className = "open";
		}, 600);
	}


});



s_input.addEventListener("keypress", function (e) {
	//console.log("keypress" + e.keyCode);
	if(e.keyCode != 13)
		getSuggestions();
});

s_input.onkeydown = function (e) {
	//console.log("keydown");
	if(e.keyCode==8) // backspace
    	getSuggestions();
    else if(s_suggestions.childNodes.length !== 0){

    	if(e.keyCode==38 || e.keyCode==40 || e.keyCode == 9){

	    	if(e.keyCode==38){//up
	    		if(--selected_segesstion < 0){
	    			selected_segesstion = s_suggestions.childNodes.length-1;
	    		}

	    	}else{//down
	    		if(++selected_segesstion >= s_suggestions.childNodes.length){
	    			selected_segesstion = 0;
	    		}
	  			  			
	    	}
	    	selectSugestion();
	    	e.preventDefault();
	    	

    	}
    }
};