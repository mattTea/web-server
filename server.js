// a server that prints 'hello express' to anyone that visits that page

var express = require('express');
var app = express();					// create an app
var PORT = 3000;						// capitalised var means that this variable shouldn't be changed


// app.get('/', function (req, res) {		// '/' specifies the route (/ = root url), req = request - holds all the information sent from the user, res = response - what you want to send back to the user
// 	res.send('Hello Express!');
// });

// **commented out the above as index.html should always be the default file if none is specified on a website


var middleware = {
	requireAuthentication: function (req, res, next) {	// requires user to be logged in, and will be route level middleware. next tells the middleware to move on
		console.log('private route hit!');
		next();
	},
	logger: function (req, res, next) {					// logger to inspect individual requests made to the server
		console.log('Request: ' + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
		next();
	}
};

app.use(middleware.logger);

// app.use(middleware.requiredAuthentication); // needs to be positioned here in the code, as it needs to run before the /about route, so that the next calls move onto that

// **commented out above so we can add it just to the about route

// when you call app.use you're adding application level middleware - called for every page requested and every route hit


// when you want add route level middleware, all you have to do is reference the function as the second argument (as below), and then as the 3rd argument have the route's callback function
app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('About Us!');
});

app.use(express.static(__dirname + '/public'));		// expose folder in web server

app.listen(PORT, function () {						// port you want to listen on second argument in app.listen (which is a function) is called once server starts (not mandatory) - gives feedback in terminal so we know everything went as expected
	console.log('Express server started on port ' + PORT + '!');
});
