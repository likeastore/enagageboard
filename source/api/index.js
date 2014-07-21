function api(app) {
	require('./clicks')(app);
	require('./searches')(app);
	require('./period')(app);
	require('./reports')(app);
}

module.exports = api;
