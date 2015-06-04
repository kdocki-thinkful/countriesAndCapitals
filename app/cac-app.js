angular.module('cacApp', ['ngMessages', 'ngRoute', 'ngAnimate', 'cacAppViews'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/error', {
                template: '<p>Error Page Not Found</p>'
            });
    })
    .run(function ($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function () {
            $location.path("/error");
        });
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $rootScope.isLoading = false;
            }, 1000);
        });
    })
    .controller('MainCtrl', ['$rootScope', '$scope', '$location', function ($rootScope, $scope, $location) {
        $rootScope.changePage = function (path) {
            $location.path(path)
        };
    }]);