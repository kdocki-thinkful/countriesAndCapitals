describe("Countries View", function () {

    var $scope, $httpBackend, $controller, countryCache;

    beforeEach(module("cacApp"));

    beforeEach(inject(function (_$rootScope_, _$controller_, _countryCache_, _$httpBackend_) {
        countryCache = _countryCache_;
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
    }));

    // Countries Test
    describe("/countries route", function () {

        it('should load the template and controller', function (){

            var cache = countryCache.get('countries');
            var countriesCtrl = $controller('CountriesCtrl', { $scope: $scope });

            expect($scope.isLoading).toBe(true);

            // move to different test (force cache to be false using jasmine.spy or a mock)
            if (cache) {
                expect($scope.countries).toBe(false);
                expect($scope.isLoading).toBe(false);
            }
        });

    });
});