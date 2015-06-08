describe("Countries View", function () {

    var scope;
    // Load App
    beforeEach(module("cacApp"));

    // Mock Services
    module(function ($provide) {
        $provide.value('geoRequest', function (value) {
            return {
                areaInSqKm: "468.0",
                capital: "Andorra la Vella",
                continent: "EU",
                continentName: "Europe",
                countryCode: "AD",
                countryName: "Andorra",
                currencyCode: "EUR",
                east: 1.7865427778319827,
                fipsCode: "AN",
                geonameId: 3041565,
                isoAlpha3: "AND",
                isoNumeric: "020",
                languages: "ca",
                north: 42.65604389629997,
                population: "84000",
                south: 42.42849259876837,
                west: 1.4071867141112762
            };
        });
    });

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    // Countries Test
    describe("/countries route", function () {

        it('should load the template and controller', inject(function ($location, $rootScope, $httpBackend, $controller, $route, geoRequest, countryCache) {
                var scope = $rootScope.$new(),
                    cache = countryCache.get('countries'),
                    ctrl = $controller('CountriesCtrl', {
                        $scope: scope

                    });

                expect(scope.isLoading).toBe(true);

                if (cache) {
                    expect(scope.countries).toBe(false);
                    expect(scope.isLoading).toBe(false);
                }

            }));

        it('Should call the countries service', inject(function ($location, $rootScope, $httpBackend, $controller, $route, geoRequest, countryCache) {

            var mockCountry = {
                    areaInSqKm: "468.0",
                    capital: "Andorra la Vella",
                    continent: "EU",
                    continentName: "Europe",
                    countryCode: "AD",
                    countryName: "Andorra",
                    currencyCode: "EUR",
                    east: 1.7865427778319827,
                    fipsCode: "AN",
                    geonameId: 3041565,
                    isoAlpha3: "AND",
                    isoNumeric: "020",
                    languages: "ca",
                    north: 42.65604389629997,
                    population: "84000",
                    south: 42.42849259876837,
                    west: 1.4071867141112762
                },
                request = geoRequest('countryInfoJSON'),
                checkData = function (data) {
                    expect(data).toEqual({
                        areaInSqKm: "468.0",
                        capital: "Andorra la Vella",
                        continent: "EU",
                        continentName: "Europe",
                        countryCode: "AD",
                        countryName: "Andorra",
                        currencyCode: "EUR",
                        east: 1.7865427778319827,
                        fipsCode: "AN",
                        geonameId: 3041565,
                        isoAlpha3: "AND",
                        isoNumeric: "020",
                        languages: "ca",
                        north: 42.65604389629997,
                        population: "84000",
                        south: 42.42849259876837,
                        west: 1.4071867141112762
                    });

                };


            $httpBackend.expectGET('http://api.geonames.org/countryInfoJSON?username=red2678&').respond(200, mockCountry);
            $httpBackend.expectGET('home/home.html').respond(200);

            request.then(checkData);

            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();

        }));

    });
});