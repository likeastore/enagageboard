function api(app) {
	require('./clicks')(app);
	require('./searches')(app);
	require('./period')(app);
}

module.exports = api;
