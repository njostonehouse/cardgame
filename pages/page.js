function TodoCtrl($scope) {
	$scope.todos = [
		{text:'learn angular', done:true},
		{text:'build an angular app', done:false}
	];
	 
	$scope.addTodo = function() {
		$scope.todos.push({text:$scope.todoText, done:false});
		$scope.todoText = '';
	};
	 
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};
	 
	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo) {
			if (!todo.done) $scope.todos.push(todo);
		});
	};
}

var socket = io.connect('')

function playersController($scope) {
	socket.on('players', function(data) {
		$scope.players = data
		$scope.$apply()
	});

	$scope.players = []
	
	$scope.addPlayer = function() {
		socket.emit('add-player', $scope.newPlayerName)
	}
	
	$scope.select = function(player, card) {
		var message = { player: player, card: card }
		console.log( message )
		socket.emit('select-card', message )
	}
}
