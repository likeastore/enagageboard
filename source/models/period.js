var moment = require('moment');

module.exports = {
	get: function () {
		var to = moment();
		var from = moment(to).subtract(2, 'weeks');

		return {to: to.format('YYYY-MM-DD'), from: from.format('YYYY-MM-DD')};
	}
};
