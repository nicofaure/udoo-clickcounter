
//var udoo = require('udoo');
var http = require('http');

var options = {
  host: 'localhost',
  path: '/',
  port: '3000'
};

callback = function(response) {
	var str = '';

	//another chunk of data has been recieved, so append it to `str`
	response.on('data', function (chunk) {
		str += chunk;
	});

	//the whole response has been recieved, so we just print it out here
	response.on('end', function () {
		var jsonObject = JSON.parse(str);
		for (var i=0; i < jsonObject.clicks.length; i++){
			console.log(jsonObject.clicks[i]);
		}
	});
}

function doApiCall(){
	http.request(options, callback).end();
}

(function loop() {
	doApiCall(doApiCall());
	setTimeout(loop, 100);
}());



/*
var led0 = udoo.outputPin(5);
var led1 = udoo.outputPin(6);
var led2 = udoo.outputPin(7);
var led3 = udoo.outputPin(8);
var led4 = udoo.outputPin(9);
var led5 = udoo.outputPin(10);
var led6 = udoo.outputPin(11);
var led7 = udoo.outputPin(12);
var led8 = udoo.outputPin(13);
var led9 = udoo.outputPin(14);
var led10 = udoo.outputPin(15);
 
(function loop() {
  led.set(on = !on, function () {
    setTimeout(loop, 1000);
  });
}());
*/