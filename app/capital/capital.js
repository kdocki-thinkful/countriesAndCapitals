viewsModule.config(function ($routeProvider) {
    $routeProvider.when('/countries/:country/capital', {
        templateUrl: 'capital/capital.html',
        controller: 'CapitalCtrl'
    });
});

viewsModule.controller('CapitalCtrl', ['$rootScope', '$scope', '$routeParams', '$q', 'countryCache', 'geoRequest', function ($rootScope, $scope, $routeParams, $q, countryCache, geoRequest) {

    $rootScope.isLoading = true;

    function findCountry () {
        return _.find(countryCache.get('countries'), function (country) {
            return country.countryName == $routeParams.country;
        });
    }
    function getAdditionalInfo() {

        var search = geoRequest('searchJSON', {
                q: $scope.country.capital,
                type: 'JSON',
                country: $scope.country.countryCode,
                name_equals: $scope.country.capital,
                isNameRequired: true
            }),
            neighbours = geoRequest('neighboursJSON', {geonameId: $scope.country.geonameId});

        search.then(function (data) {
            $scope.country.capitalPopulation = Math.max.apply(Math, _.map(data.geonames, function (o) {
                return o.population;
            }));
        });
        neighbours.then(function (data) {
            $scope.country.countryNeighbors = data.geonames.length === 0 ? [{countryName: "0 Results Returned"}] : data.geonames.length > 3 ? data.geonames.slice(0, 3) : data.geonames;
            $scope.country.countryNeighborsCount = data.geonames.length === 0 ? 0 : data.geonames.length > 3 ? 3 : data.geonames.length;
        });

        $q.all([search, neighbours]).then(function () {
            $rootScope.isLoading = false;
        });

    }

    if (countryCache.get('countries')) {
        $scope.country = findCountry();
        getAdditionalInfo();

    } else {
        var getCountries = geoRequest('countryInfoJSON');
        getCountries.then(function (data) {
            countryCache.put('countries', data.geonames);
            $scope.country = findCountry();
            getAdditionalInfo();

        });
    }

}]);
