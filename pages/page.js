var socket = io.connect('')

function turnTimerController($scope) {
	socket.on( 'turn-pulse', function(data) {
		$scope.turnTimeRemaining = data.remaining
		$scope.$apply()
	})

	$scope.backgroundClass = function() {
		return $scope.turnTimeRemaining <= 5 ? 'near' : 'far'
	}
	
}

function playersController($scope) {
	socket.on('players', function(data) {
		console.log( 'players' )
		$scope.players = data
		$scope.$apply()
	});

	socket.on( 'player-state', function(data) {
		console.log( 'player-state' )
		var player = _.find( $scope.players, function(player) { return player.id == data.id } )
		player.state = data.state
	})
	
	$scope.players = []

	$scope.select = function(player, card) {
		player.state.selectedCard = card.id
		var message = { playerId: player.id, cardId: card.id }
		socket.emit('select-card', message )
	}
	
	$scope.cardState = function(player, card) {
		return card.id == player.state.selectedCard ? 'selected' : 'selectable'
	}
}
