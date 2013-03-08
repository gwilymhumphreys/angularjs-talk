/*global todomvc*/
'use strict';

angular.module('todo.Controllers', ['todo.Services'])

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
.controller('TodoCtrl', ['$scope', 'todoStorage', function TodoCtrl($scope, todoStorage) {
	
    $scope.todos = todoStorage.get();

	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.addTodo = function() {
		if (!$scope.newTodo.length) {
			return;
		}

        $scope.todos.push({
			title: $scope.newTodo,
			completed: false
		});

		$scope.newTodo = '';
	};

	$scope.editTodo = function(todo) {
		$scope.editedTodo = todo;
	};

	$scope.doneEditing = function(todo) {
		$scope.editedTodo = null;
		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	$scope.removeTodo = function(todo) {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
	};

	$scope.clearDoneTodos = function() {
		$scope.todos = $scope.todos.filter(function(val) {
			return !val.completed;
		});
	};

	$scope.markAll = function(done) {
        $scope.todos.forEach(function(todo) {
			todo.completed = done;
		});
	};

    $scope.$watch('todos', function () {
        $scope.remainingCount = $scope.todos.filter(function(val) {
            return !val.completed;
        }).length;
        $scope.doneCount = $scope.todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
        todoStorage.put($scope.todos);
    }, true);

}]);
