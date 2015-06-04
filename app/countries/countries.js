viewsModule.config(function($routeProvider) {
    $routeProvider.when('/countries', {
        templateUrl: 'countries/countries.html',
        controller: 'CountriesCtrl'
    });
});

viewsModule.controller('CountriesCtrl', ['$scope', 'geoRequest', 'countryCache', function ($scope, geoRequest, countryCache) {

    var cache = countryCache.get('countries');

    if (cache) {
        $scope.countries = cache;
    } else {
        geoRequest('countryInfoJSON').then(function (data) {
            countryCache.put('countries', data.geonames);
            $scope.countries = countryCache.get('countries');
        });
    }

}]);
