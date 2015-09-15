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