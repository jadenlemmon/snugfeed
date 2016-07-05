'use strict';

(function(angular) {
    angular.module('managefeedscomponent', ['snugfeed.service.feeds']).directive('managefeedscomponent', function(snugfeedFeedsService) {

        function link(scope, element, attrs) {

            function init() {
                snugfeedFeedsService.getFeeds().then(function(data) {
                    scope.feeds = data.data;
                });
            }
            init();

            scope.activateFeed = function(feed) {
                feed.active = feed.active ? false : true;
                scope.data = scope.feeds;

                scope.data = _.filter(scope.data, function(feed) {
                    return feed.active == true;
                });
            };

            scope.$on('reload feeds', function() {
                init();
            });

        }
        return {
            link: link,
            restrict: 'E',
            scope: {data: '='},
            template: '' +
            '<div class="ui segment" id="manage-feeds-component">' +
            '<div class="ui eight column grid">' +
            '<div class="column" ng-repeat="feed in feeds" ng-click="activateFeed(feed)" ng-class="{\'active\': feed.active}">' +
            '<div class="overlay" ng-show="feed.active">' +
            '<i class="checkmark icon"></i>' +
            '</div>' +
            '<img ng-src="{{feed.favicon_url}}">' +
            '</div>' +
            '</div>' +
            '</div>'
        };
    });
})(angular);
