'use strict';

angular.module('engageboard').directive('report', function (reports) {
	var dates = {
		today: moment(),
		yesterday: moment().subtract('days', 1),
		lastWeek: moment().startOf('week').subtract('weeks', 1),
		lastMonth: moment().startOf('month').subtract('month', 1)
	};

	return {
		restrict: 'E',
		templateUrl: 'views/report.html',
		scope: true,
		link: function ($scope, elem, attrs) {
			$scope.heading = attrs.periodHeading;
			$scope.datePeriod = dates[attrs.date].format('DD/MM/YYYY');

			reports(attrs.report, dates[attrs.date], 'user-registered', function (data) {
				$scope.registered = data;
			});

			reports(attrs.report, dates[attrs.date], 'user-verified', function (data) {
				$scope.verified = data;
			});

			reports(attrs.report, dates[attrs.date], 'user-logged-on', function (data) {
				$scope.loggedOn = data;
			});

			reports(attrs.report, dates[attrs.date], 'network-created', function (data) {
				$scope.networksCreated = data;
			});

			reports(attrs.report, dates[attrs.date], 'search', function (data) {
				$scope.searches = data;
			});

			reports(attrs.report, dates[attrs.date], 'share-like', function (data) {
				$scope.shares = data;
			});

			reports(attrs.report, dates[attrs.date], 'share-with-friend', function (data) {
				$scope.sends = data;
			});

			reports(attrs.report, dates[attrs.date], 'account-deactivated', function (data) {
				$scope.deactivated = data;
			});

			reports(attrs.report, dates[attrs.date], 'collection-created', function (data) {
				$scope.collectionsCreated = data;
			});

			reports(attrs.report, dates[attrs.date], 'collection-shared', function (data) {
				$scope.collectionsShared = data;
			});

			reports(attrs.report, dates[attrs.date], 'collection-followed', function (data) {
				$scope.collectionsFollowed = data;
			});

			reports(attrs.report, dates[attrs.date], 'collection-unfollowed', function (data) {
				$scope.collectionsUnfollowed = data;
			});

			reports(attrs.report, dates[attrs.date], 'collection-item-added', function (data) {
				$scope.collectionsItemsAdded = data;
			});
		}
	};
});
