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


// GA
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	ga('create', 'UA-40067737-9', 'aroundme.photos');
	ga('require', 'displayfeatures');
	ga('send', 'pageview');