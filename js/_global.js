var global = global || {};
var dom = dom || {};


global.colors = {
	red :"#f74552",
	"dark-purple" : "#4f007d",
	purple: "#7329b0",
	blue: "#1a75cf",
	green: "#66d43d",
	yellow: "#fff5a1" ,
	black: "#24292e",
	grey: "#414b56",
	"light-grey" : "#8c8f91"
};


//global.iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );







global.loadingCount = 0;

global.increment =  function(){
	if(++global.loadingCount === 1){
		dom.ham.title="Loading ...";
		dom.ham.className = "loading";
	}
	//console.log(str + " + " + loadingCount);
};

global.decrement = function(){
	if(--global.loadingCount === 0){
		dom.ham.title="Info";
		dom.ham.className = "";
		//loadingCount = 0;
	}
	//console.log(str + " - " + loadingCount);
};


global.createCookie = function(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+value+expires+"; path=/";
};

global.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' '){ c = c.substring(1,c.length);}
        if (c.indexOf(nameEQ) === 0){ return c.substring(nameEQ.length,c.length);}
    }
    return null;
};

global.eraseCookie = function(name) {
    createCookie(name,"",-1);
};