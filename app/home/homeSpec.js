describe("Home", function() {

    // Load App
    beforeEach(module("cacApp"));

    // Home Test
    describe("/ route", function() {
        it('should load the template and controller',
            inject(function($location, $rootScope, $httpBackend, $route) {
                $httpBackend.expect('GET', 'home/home.html').respond('200');

                $rootScope.$apply(function() {
                    $location.path('/');
                });

                $rootScope.$digest();
                $httpBackend.flush();

                expect($route.current.controller).toBe("HomeCtrl");
                expect($route.current.loadedTemplateUrl).toBe("home/home.html");

                $httpBackend.verifyNoOutstandingRequest();
                $httpBackend.verifyNoOutstandingExpectation();
            }));
    });
});