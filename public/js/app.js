'use strict';

var app = angular.module('engageboard', [
	'ngRoute',
	'ngResource',
	'ngSanitize',
	'highcharts-ng'
]);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', { templateUrl: 'views/dashboard.html'})
		.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode(true);
});

app.run();
