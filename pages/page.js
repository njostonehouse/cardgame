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
	})
	
	socket.on('nonplayers', function(data) {
		console.log( 'nonplayers' )
		$scope.nonplayers = data
		$scope.$apply()
	})	

	socket.on( 'player-state', function(data) {
		console.log( 'player-state' )
		var player = _.find( $scope.players, function(player) { return player.id == data.id } )
		player.state = data.state
		$scope.$apply()
	})

	socket.on( 'nonplayer-state', function(data) {
		console.log( 'nonplayer-state' )
		var nonplayer = _.find( $scope.nonplayers, function(nonplayer) { return nonplayer.id == data.id } )
		nonplayer.state = data.state
		console.log( nonplayer.state.selectedCardId )
		$scope.$apply()
	})
	
	$scope.players = []
	$scope.nonplayers = []

	$scope.select = function(player, cardId) {
		var message = { playerId: player.id, cardId: cardId }
		socket.emit('select-card', message )
	}
	
	$scope.cardState = function(player, cardId) {
		return cardId == player.state.selectedCardId ? 'selected' : 'selectable'
	}
	
	$scope.cardById = function(cardId) {
		return _.findWhere( cards, { id: cardId } )
	}
}
