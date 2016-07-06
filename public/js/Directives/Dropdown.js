'use strict';

(function(angular) {

    angular.module('dropdown', []).directive('dropdowncomponent', function() {

        function link(scope, element, attrs) {
            function init() {
                $(element).find('.dropdown').dropdown('setting', {
                    onChange: function(value, text, $choice) {
                        console.log(value);
                        scope.selected = value;
                        scope.$apply();
                    },
                    onNoResults: function(search) {
                        scope.selected = search;
                        scope.$apply();
                    },
                    allowAdditions: true
                });
            }

            scope.$watch('values', function(newValue, oldValue) {
                init();
            });

        }

        return {
            link: link,
            restrict: 'E',
            scope: {values: '=', selected: '='},
            template: '' +
            '<div class="ui fluid search selection dropdown">' +
                '<input type="hidden" name="dropdown">' +
                '<i class="dropdown icon"></i>' +
                '<div class="default text">Select</div>' +
                '<div class="menu">' +
                '<div class="item" data-value="{{value.id}}" ng-repeat="value in values">' +
                    '<img ng-src="{{value.favicon_url}}"> {{value.source}}</div>' +
                '</div>' +
            '</div>'
        };
    });

})(angular);
