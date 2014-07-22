'use strict';

var app = angular.module('engageboard', [
	'ngActivityIndicator',
	'ui.router',
	'ngResource',
	'ngSanitize',
	'highcharts-ng'
]);

app.config(function ($stateProvider, $locationProvider) {
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'views/main.html'
		})
		.state('main.analytics', {
			url: 'analytics',
			templateUrl: 'views/analytics.html'
		})
		.state('main.search', {
			url: 'search',
			templateUrl: 'views/search.html'
		})
		.state('main.feed', {
			url: 'feed',
			template: '<h1>Feed part</h1>'
		})
		.state('main.queries', {
			url: 'queries',
			template: '<h1>Queries part</h1>'
		})
		.state('main.collections', {
			url: 'collections',
			template: '<h1>Collections part</h1>'
		});

	$locationProvider.html5Mode(true);
});

app.run();
