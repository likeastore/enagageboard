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
			templateUrl: 'views/feed.html'
		})
		.state('main.queries', {
			url: 'queries',
			template: '<h1 class="row">Queries part will be soon</h1>'
		})
		.state('main.collections', {
			url: 'collections',
			template: '<h1 class="row">Collections part will be soon</h1>'
		});

	$locationProvider.html5Mode(true);
});

app.run();
