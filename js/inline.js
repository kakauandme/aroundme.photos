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