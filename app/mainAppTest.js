describe('Test the ToDo controller', function() {
	beforeEach(module('app'));

	beforeEach(inject(function($controller) {
		ctrl = $controller('EventCtrl');
	}));

	it('should have 3 persons available on load', function() {
    expect(ctrl.people.length).toBe(3);
  });
  
});