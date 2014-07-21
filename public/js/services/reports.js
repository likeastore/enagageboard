'use strict';

angular.module('engageboard').factory('reports', function ($http) {
	return function (report, date, id, callback) {
		var query = '/api/reports/' + report + '?id=' + id + '&date=' + date.format('YYYY-MM-DD');
		return $http({method: 'GET', url: query}).success(callback);
	};
});
