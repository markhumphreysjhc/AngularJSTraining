describe('Test the Nougal controller', function() {
	beforeEach(module('mainApp'));

	beforeEach(inject(function($controller) {
		ctrl = $controller('EventCtrl');
	}));

	it('should have 3 persons available on load', function() {
    expect(ctrl.people.length).toBe(3);
  });
  
});