viewsModule.config(function ($routeProvider) {
    $routeProvider.when('/countries/:country/capital', {
        templateUrl: 'capital/capital.html',
        controller: 'CapitalCtrl'
    });
});

viewsModule.controller('CapitalCtrl', ['$scope', '$routeParams', 'countryCache', 'geoRequest', function ($scope, $routeParams, countryCache, geoRequest) {

    var cache = countryCache.get('countries');

    function getAdditionalInfo() {

        geoRequest('searchJSON', {
            q: $scope.country.capital,
            type: 'JSON',
            country: $scope.country.countryCode,
            name_equals: $scope.country.capital,
            isNameRequired: true
        }).then(function (data) {
            $scope.country.capitalPopulation = Math.max.apply(Math, $.map(data.geonames, function (o) {
                return o.population;
            }))
        });

        geoRequest('neighboursJSON', {geonameId: $scope.country.geonameId}).then(function (data) {
            $scope.country.countryNeighbors = data.geonames.length === 0 ? [{countryName: "0 Results Returned"}] : data.geonames.length > 2 ? data.geonames.slice(0, 3) : data.geonames;
        });

    }

    if (cache) {
        $scope.country = _.find(cache, function (country) {
            return country.countryName == $routeParams.country;
        });

        getAdditionalInfo();

    } else {
        geoRequest('countryInfoJSON').then(function (data) {

            countryCache.put('countries', data.geonames);

            $scope.country = _.find(countryCache.get('countries'), function (country) {
                return country.countryName == $routeParams.country;
            });

            getAdditionalInfo();

        });
    }

}]);
