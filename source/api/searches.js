var request = require('request');
var config = require('../config');

function searches(app) {
	var ensureToken = function (req, callback) {
		if (req.session.analyticsToken) {
			return process.nextTick(function () {
				callback(null, req.session.analyticsToken);
			});
		}

		var credentials = config.analytics.credentials;
		var auth = config.analytics.url + '/auth';

		request.post({url: auth, body: credentials, json: true}, function (err, response) {
			if (err) {
				return callback(err);
			}

			callback(null, response.body.token);
		});
	};

	app.route('/api/searches').get(function (req, res, next) {
		ensureToken(req, function (err, token) {
			if (err) {
				return next(err);
			}

			var url = config.analytics.url + '/api/reports/day/' + config.analytics.app + '?id=search&date=today';
			var headers = {'X-Access-Token': token};

			request({url: url, headers: headers, json: true}, function (err, results) {
				if (err) {
					return next(err);
				}

				res.json(results);
			});
		});
	});
}

module.exports = searches;
