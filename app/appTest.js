describe('Test the todo controller', function() {
  beforeEach(module('todoApp'));

  var ctrl;
  
  beforeEach(inject(function($controller) {
    ctrl = $controller('TodoListController');
  }));

  it('should have todos available on load', function() {
    expect(ctrl.todos.length).toBe(3);
  });
  
  it('should calculate the correct number of uncompleted items', function() {
    expect(ctrl.uncompleted()).toBe(2);
  });
  
  it('should add to the list of todos', function() {
    var text = 'Hello';
    
    ctrl.todoText = text;
    ctrl.addTodo();
    
    expect(ctrl.todos.length).toBe(4);
    expect(ctrl.todos[ctrl.todos.length - 1]).toEqual(
      {text:text, done:false}
    );
    expect(ctrl.uncompleted()).toBe(3);
    expect(ctrl.todoText).toBe('');
  });
});