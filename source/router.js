function router(app) {

	var checkAuth = function (req, res, next) {
		if (!req.session.authorized) {
			return res.redirect('/login');
		}

		next();
	};

	app.route('/')
		.get(checkAuth, function (req, res) {
			res.render('master', {title: 'Likeastore | Engageboard', mainCss: '/style.css'});
		});

	app.route('/login')
		.get(function (req, res) {
			res.render('login', {title: 'Login', mainCss: '/style.css'});
		});

}

module.exports = router;
