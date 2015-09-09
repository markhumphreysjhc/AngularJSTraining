// spec.js
describe('Protractor Demo App', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8081/index.html');

    expect(browser.getTitle()).toEqual('Todo List');
  });
});