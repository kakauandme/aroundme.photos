// @codekit-prepend "_global.js"
// @codekit-prepend "_map.js"
// @codekit-prepend "_instagram.js"
// @codekit-prepend "_geocodingmarker.js"
// @codekit-prepend "_geolocationmarker.js"
// @codekit-prepend "_photooverlay.js"
// @codekit-prepend "_search.js"





global.init = function() {

	map.initialize();

	//CSS
	var stylesheet = document.createElement('link');
	stylesheet.href = '/css/footer.' + /*cacheBuster+ "." + */ 'css';
	stylesheet.rel = 'stylesheet';
	stylesheet.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(stylesheet);



	
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

if((typeof(Storage) === "undefined") || navigator.userAgent.indexOf("Opera") !== -1) {
    var str = '<p>Yоu аrе usіng аn <strong>оutdаtеd</strong> brоwsеr. <br>Рlеаsе <a href="http://www.google.com/chrome/browser/" target="_blank">uрgrаdе yоur brоwsеr</a> tо usе thіs wеbsіtе.</p>';
    document.getElementById("browserhappy").innerHTML = str;
    dom.body.className= "ie";
    clearInterval(global.timer);
	global.timer = 0;
	dom.timerHolder.textContent = "";

}else{
	google.maps.event.addDomListenerOnce(window, 'load', global.init);
}