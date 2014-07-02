'use strict';

angular.module('engageboard').controller('searchClicksController', function ($q, $scope, $resource) {
	var api = $resource('/api/:res/:sub');
	var search = $scope.search = {};

	var requests = [
		api.get({res: 'clicks'}),
		api.get({res: 'searches'}),
		api.get({res: 'period'}),
		api.query({res: 'clicks', sub: 'queries'})
	];

	var promises = requests.map(function (resource) {
		return resource.$promise;
	});

	var chart = $scope.chartConfig = {
		options: {
			chart: {
				type: 'column'
			}
		},
		title: {
			text: 'search clicks by date'
		},

		loading: true
	};


	var all = $q.all(promises);
	all.then(function (results) {
		search.clicks = results[0].total;
		search.hits = results[1].total;
		search.ctr = (((search.clicks * 100) / search.hits).toFixed(3)) + '%';
		search.period = results[2].from + ' / ' + requests[2].to;
		search.queries = results[3];

		chart.series = [{ data: [ ['6 Jun 2014', 1], ['7 Jun 2014', 2], ['8 Jun 2014', 3], ['9 Jun 2014', 4] ]}];
		chart.loading = false;

		$scope.ready = true;
	});

});
