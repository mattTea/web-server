var request = require('request');

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

module.exports = middleware;