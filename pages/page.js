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
	var cards = []

	socket.on('cards', function(data) {
		console.log( 'cards' )
		cards = data
	})

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

	$scope.select = function(player, cardId) {
		player.state.selectedCard = cardId
		var message = { playerId: player.id, cardId: cardId }
		socket.emit('select-card', message )
	}
	
	$scope.cardState = function(player, cardId) {
		return cardId == player.state.selectedCard ? 'selected' : 'selectable'
	}
	
	$scope.cardById = function(cardId) {
		return _.findWhere( cards, { id: cardId } )
	}
}
