'use strict';

angular.module('engageboard').directive('report', function ($q, reports, $activityIndicator) {
	var dates = {
		today: moment(),
		yesterday: moment().subtract('days', 1),
		lastWeek: moment().startOf('week').subtract('weeks', 1),
		lastMonth: moment().startOf('month').subtract('month', 1)
	};

	return {
		restrict: 'E',
		templateUrl: 'views/widgets/report.html',
		scope: true,
		link: function ($scope, elem, attrs) {
			$activityIndicator.startAnimating();

			$scope.heading = attrs.periodHeading;
			$scope.datePeriod = dates[attrs.date].format('DD/MM/YYYY');

			var requests = [
				reports(attrs.report, dates[attrs.date], 'user-registered'),
				reports(attrs.report, dates[attrs.date], 'user-verified'),
				reports(attrs.report, dates[attrs.date], 'network-created'),
				reports(attrs.report, dates[attrs.date], 'search'),
				reports(attrs.report, dates[attrs.date], 'share-like'),
				reports(attrs.report, dates[attrs.date], 'share-with-friend'),
				reports(attrs.report, dates[attrs.date], 'account-deactivated'),
				reports(attrs.report, dates[attrs.date], 'collection-created'),
				reports(attrs.report, dates[attrs.date], 'collection-shared'),
				reports(attrs.report, dates[attrs.date], 'collection-followed'),
				reports(attrs.report, dates[attrs.date], 'collection-unfollowed'),
				reports(attrs.report, dates[attrs.date], 'collection-item-added')
			];

			function ready(results) {
				$scope.registered = results[0].data;
				$scope.verified = results[1].data;
				$scope.networksCreated = results[2].data;
				$scope.searches = results[3].data;
				$scope.shares = results[4].data;
				$scope.sends = results[5].data;
				$scope.deactivated = results[6].data;
				$scope.collectionsCreated = results[7].data;
				$scope.collectionsShared = results[8].data;
				$scope.collectionsFollowed = results[9].data;
				$scope.collectionsUnfollowed = results[10].data;
				$scope.collectionsItemsAdded = results[11].data;

				$activityIndicator.stopAnimating();
			}

			var all = $q.all(requests);
			all.then(ready);
		}
	};
});
