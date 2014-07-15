'use strict';

var app = angular.module('engageboard', [
	'ui.router',
	'ngRoute',
	'ngResource',
	'ngSanitize',
	'highcharts-ng'
]);

app.config(function ($stateProvider, $routeProvider, $locationProvider) {
	$routeProvider
		.when('/', { templateUrl: 'views/main.html'})
		.otherwise({ redirectTo: '/' });

	$stateProvider
		.state('analytics', {
			url: '/analytics',
			template: '<h1>Analytics part</h1>'
		})
		.state('search', {
			url: '/search',
			templateUrl: 'views/dashboard.html'
		})
		.state('feed', {
			url: '/feed',
			template: '<h1>Feed part</h1>'
		})
		.state('queries', {
			url: '/queries',
			template: '<h1>Queries part</h1>'
		})
		.state('collections', {
			url: '/collections',
			template: '<h1>Collections part</h1>'
		});

	$locationProvider.html5Mode(true);
});

app.run();
