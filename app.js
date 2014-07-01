var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');

var config = require('./config');
var logger = require('./source/utils/logger');

var app = express();
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3007;

if (env === 'development' || env === 'production') {
	app.use(morgan());
}

app.use(bodyParser.json());
app.use(methodOverride());

require('./source/health')(app);

app.listen(port, function () {
	logger.info('Engageboard listening on port ' + port + ' ' + env + ' mongo: ' + config.connection);
});
