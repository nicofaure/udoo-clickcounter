
//var udoo = require('udoo');
var http = require('http');

var options = {
  host: 'localhost',
  path: '/',
  port: '3000'
};
var leds = [udoo.outputPin(5)
			,udoo.outputPin(6)
			,udoo.outputPin(7)
			,udoo.outputPin(8)
			,udoo.outputPin(9)
			,udoo.outputPin(10)
			,udoo.outputPin(11)
			,udoo.outputPin(12)
			,udoo.outputPin(13)
			,udoo.outputPin(14)
			,udoo.outputPin(15)]

callback = function(response) {
	var str = '';

	//another chunk of data has been recieved, so append it to `str`
	response.on('data', function (chunk) {
		str += chunk;
	});

	//the whole response has been recieved, so we just print it out here
	response.on('end', function () {
		var jsonObject = JSON.parse(str);
		for (var i=0; i <= 10; i++){
			if(jsonObject.clicks[i]){
				leds[0].set(jsonObject.clicks[i]);
				console.log(jsonObject.clicks[i]);
			}else{
				console.log(0);
				leds[0].set(0);
			}
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

