var moment = require('moment');

module.exports = {
	get: function () {
		var to = moment();
		var from = moment(to).subtract(5, 'days');

		return {to: to.format('YYYY-MM-DD'), from: from.format('YYYY-MM-DD')};
	}
};
