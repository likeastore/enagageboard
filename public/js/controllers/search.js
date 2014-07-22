'use strict';

angular.module('engageboard').controller('searchController', function ($q, $scope, $resource) {
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
				type: 'column',
				height: 340,
				width: 1160
			},

			exporting: {
				enabled: false
			},

			xAxis: {
				type: 'category'
			},

			yAxis: {
				min: 0,
				title: {
					text: 'Search clicks (by day)'
				}
			},

			legend: {
				enabled: false
			}
		},

		title: {
			text: ''
		},

		loading: true
	};

	var buildChart = function (from, to, queries) {
		var range = _.range(moment(to).diff(from, 'days') + 1);
		var dates = range.map(function (day) {
			return moment(from).add(day, 'days');
		});

		var chart = dates.map(function (date) {
			return [date.format('D MMM'), clicksByDate(date, queries)];
		});

		return chart;

		function clicksByDate(date, queries) {
			var clicks = _.filter(queries, function (click) {
				var timestampt = moment(click.timestampt);
				return date.isSame(timestampt, 'day');
			});

			return (clicks && clicks.length) || 0;
		}
	};

	var ready = function (results) {
		var clicks = results[0],
			hits = results[1],
			period = results[2],
			queries = results[3];

		search.clicks = clicks.total;
		search.hits = hits.total;
		search.ctr = (((search.clicks * 100) / search.hits).toFixed(3)) + '%';
		search.period = period.from + ' / ' + period.to;
		search.queries = queries;

		var data = buildChart(period.from, period.to, search.queries);
		chart.series = [{name: 'clicks', data: data, dataLabels: {enabled: false}}];

		chart.loading = false;
		$scope.ready = true;
	};

	var all = $q.all(promises);
	all.then(ready);

});
