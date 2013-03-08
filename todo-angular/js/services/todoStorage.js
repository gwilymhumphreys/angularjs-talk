/*global todomvc*/
'use strict';

angular.module('todo.Services', [])

/**
 * Services that persists and retrieves TODOs from localStorage.
 */
    .provider()


    .service('asd', function() {
        var Thing = function();
        return Thing;
    })

.factory('todoStorage', function () {
	var STORAGE_ID = 'todos-angularjs';

	return {
		get: function () {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function (todos) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
});
