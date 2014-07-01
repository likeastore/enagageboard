function api(app) {
	require('./clicks')(app);
	require('./searches')(app);
}

module.exports = api;
