angular.module('todoApp', [])
  .controller('TodoListController', function($filter) {
    this.newItem = {text:'', done:false}
    
    this.todos = [
      {text:'buy food', done:true},
      {text:'learn angularJS', done:false},
      {text:'learn typescript', done:false}];
 
    this.addTodo = function() {
      this.todos.push(angular.copy(this.newItem));
      this.newItem = '';
    };

    this.reset = function() {
      angular.forEach(this.todos, function(todo) {
        todo.done = false;   
      }
    )};

    this.clear = function() {
      this.todos = $filter('filter')(this.todos, {done:false});
    };

    this.uncompleted = function() {
      var count = 0;
      
      angular.forEach(this.todos, function(todo) {
        if (!todo.done) {
          count = count + 1;
        }
      });
      
      return count;
    };
  });