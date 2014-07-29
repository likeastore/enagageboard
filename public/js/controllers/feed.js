'use strict';

angular.module('engageboard').controller('feedController', function ($q, $scope, $resource, $activityIndicator) {
	var api = $resource('/api/:res/:sub/:tar');
	var feed = $scope.feed = {};

	var requests = [
		api.get({res: 'clicks', sub: 'feed', tar: 'report'}),
		api.get({res: 'period'}),
		api.query({res: 'clicks', sub: 'feed', tar: 'query'})
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
					text: 'Feed clicks (by day)'
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

	$activityIndicator.startAnimating();

	var ready = function (results) {
		var clicks = results[0],
			period = results[2],
			queries = results[2];

		feed.clicks = clicks.total;
		feed.period = period.from + ' / ' + period.to;
		feed.queries = queries;

		var data = buildChart(period.from, period.to, feed.queries);
		chart.series = [{name: 'clicks', data: data, dataLabels: {enabled: false}}];

		chart.loading = false;
		$activityIndicator.stopAnimating();
	};

	var all = $q.all(promises);
	all.then(ready);

});
