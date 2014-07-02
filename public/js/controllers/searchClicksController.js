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

	var all = $q.all(promises);
	all.then(function (results) {
		search.clicks = results[0].total;
		search.hits = results[1].total;
		search.ctr = (((search.clicks * 100) / search.hits).toFixed(3)) + '%';
		search.period = results[2].from + ' / ' + requests[2].to;
		search.queries = results[3];

		var data = buildChart(results[2].from, requests[2].to, search.queries);
		chart.series = [{name: 'clicks', data: data, dataLabels: {enabled: false}}];

		chart.loading = false;
		$scope.ready = true;
	});

});
