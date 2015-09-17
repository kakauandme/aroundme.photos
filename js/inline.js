if (window.location.hash == '#_=_'){window.close();}//facebook popup
var global = global || {};
var dom = dom || {};
dom.body = document.getElementById("body"); dom.body.className = ""; //remove no-js	

//Timer
global.mSeconds = 0;

dom.timerHolder = document.getElementById("timer").firstChild;

global.timer = setInterval(function(){
		global.mSeconds+=100;
		var s = global.mSeconds/1000;
		dom.timerHolder.textContent = s.toFixed(1) +" sec";

},100);

function domReady(){
	if((typeof(Storage) === "undefined") || navigator.userAgent.indexOf("Opera") !== -1) {
	    var str = '<p>Yоu аrе usіng аn <strong>оutdаtеd</strong> brоwsеr. <br>Рlеаsе <a href="http://www.google.com/chrome/browser/" target="_blank">uрgrаdе yоur brоwsеr</a> tо usе thіs wеbsіtе.</p>';
	    document.getElementById("browserhappy").innerHTML = str;
	    dom.body.className= "ie";
	    clearInterval(global.timer);
		global.timer = 0;
		dom.timerHolder.textContent = "";
	}else{

	

		var t = document.getElementsByTagName('script')[0];
		var r = false;
		var s = document.createElement('script');
		s.type = 'text/javascript';  
		s.async = "async";
		s.onload = s.onreadystatechange = function() {
			//console.log( this.readyState ); //uncomment this line to see which ready states are called.
			if ( !r && (!this.readyState || this.readyState == 'complete') )
			{
				r = true;
				google.maps.event.addDomListenerOnce(window, 'load', global.init);			
			}
		};	
		t.parentNode.insertBefore(s, t);
		s.src = "/js/s.min.js"; 

		
		//CSS
		var stylesheet = document.createElement('link');
		stylesheet.href = '/css/footer.css';
		stylesheet.rel = 'stylesheet';
		stylesheet.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(stylesheet);

	}
}



// GA
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-40067737-9', 'aroundme.photos');
	ga('require', 'displayfeatures');
	ga('send', 'pageview');