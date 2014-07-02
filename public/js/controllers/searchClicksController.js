'use strict';

angular.module('engageboard').controller('searchClicksController', function ($q, $scope, $resource) {
	var api = $resource('/api/:res');
	var search = $scope.search = {};

	var promises = [api.get({res: 'clicks'}), api.get({res: 'searches'})].map(function (resource) {
		return resource.$promise;
	});

	var all = $q.all(promises);
	all.then(function (results) {
		search.clicks = results[0].total;
		search.hits = results[1].total;
		search.ctr = (((search.clicks * 100) / search.hits).toFixed(3)) + '%';
	});
});
