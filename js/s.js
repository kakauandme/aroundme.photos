// @codekit-prepend "_global.js"
// @codekit-prepend "_map.js"
// @codekit-prepend "_instagram.js"
// @codekit-prepend "_geocodingmarker.js"
// @codekit-prepend "_geolocationmarker.js"
// @codekit-prepend "_photooverlay.js"
// @codekit-prepend "_search.js"

global.init = function() {

	map.initialize();
	
	dom.ham = document.getElementById("hamburger");
	
	dom.ham.addEventListener("click", function(){

		if(dom.ham.className.length !== 0){
			return;
		}
		if(dom.body.classList.contains("nav")){
			dom.body.classList.remove("nav");
			dom.ham.title="Info";

		} else{
			dom.body.classList.add("nav");
			dom.ham.title="Close";
			setTimeout(function(){ search.resetInput();}, 600);
			
			ga('send', 'event', 'Interface', 'Hamburger');

		}
	});
};