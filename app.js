var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var cookieSession = require('cookie-session');
var errorHandler = require('errorhandler');

var config = require('./config');
var logger = require('./source/utils/logger');

var app = express();
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3007;

// configuration
app.use(morgan({ format: 'dev', immediate: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
	name: 'engageboard:sess',
	keys: [config.session.key]
}));

// routing
require('./source/health')(app);
require('./source/auth')(app);
require('./source/api')(app);
require('./source/router')(app);

if (env === 'development' || env === 'test') {
	app.use(errorHandler());
}

// server
app.listen(port, function () {
	logger.info('Engageboard listening on port ' + port + ' ' + env);
});
