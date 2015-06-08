angular.module('cacApp', ['ngMessages', 'ngRoute', 'ngAnimate', 'cacAppViews'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }]);