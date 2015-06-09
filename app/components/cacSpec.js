describe("CAC Module", function() {

    // Load App
    beforeEach(module("cacLibrary"));

    afterEach(inject(function($httpBackend)
    {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    }));

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


    describe("geoRequest service", function () {
        it('is able to call API endpoint', inject(function ($httpBackend, geoRequest) {

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

            request.then(checkData);

            $httpBackend.flush();
        }));
    });
});