viewsModule.config(function ($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: 'countries/countries.html',
        controller: 'CountriesCtrl'
    });
});

viewsModule.controller('CountriesCtrl', ['$rootScope', '$scope', '$location', 'geoRequest', 'countryCache', function ($rootScope, $scope, $location, geoRequest, countryCache) {

    $rootScope.isLoading = true;

    var cache = countryCache.get('countries');

    if (cache) {
        $scope.countries = cache;
        $rootScope.isLoading = false;

    } else {
        geoRequest('countryInfoJSON').then(function (data) {
            countryCache.put('countries', data.geonames);
            $scope.countries = countryCache.get('countries');
            $rootScope.isLoading = false;
        });
    }

    $scope.rowClick = function(countryRow) {
        $location.path('/countries/' + countryRow.countryName + '/capital');
    }

}]);
