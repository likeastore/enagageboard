var config = require('../config');
var bcrypt = require('bcrypt-nodejs');

function auth(app) {
	app.route('/auth')
		.post(function (req, res) {
			var username = req.body.username;
			var password = req.body.password;

			if (!username || !password) {
				return res.redirect('/login');
			}

			var passwordHash = config.users[username];

			if (!passwordHash) {
				return res.redirect('/login');
			}

			bcrypt.compare(password, passwordHash, function (err, result) {
				if (err) {
					return res.send(500, err);
				}

				if (!result) {
					return res.redirect('/login');
				}

				req.session.authorized = true;

				res.redirect('/');
			});
		});
}

module.exports = auth;
