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
		$scope.players = _.sortBy( data, function(player) {
			return player.position
		})
		$scope.$apply()
	})

	socket.on( 'player-state', function(data) {
		console.log( 'player-state' )
		var player = _.find( $scope.players, function(player) { return player.id == data.id } )
		for( var item in data ) {
			player[item] = data[item]
		}
		$scope.$apply()
	})
	
	$scope.players = []

	$scope.select = function(player, cardId) {
		if (!player.botEnabled) {
			var message = { playerId: player.id, cardId: cardId }
			socket.emit('select-card', message )
		}
	}
	
	$scope.control = function(player) {
		if(player.botEnabled) {
			var message = { playerId: player.id }
			socket.emit('control-player', message)
		}
	}
	
	$scope.cardState = function(player, cardId) {
		return player.botEnabled ? 'unselectable' : cardId == player.selectedCard ? 'selected' : 'selectable'
	}
	
	$scope.controllerState = function(player) {
		return player.botEnabled ? 'selectable' : 'unselectable'
	}
	
	$scope.cardById = function(cardId) {
		return _.findWhere( cards, { id: cardId } )
	}
	
	$scope.urlFor = function(player) {
		return player.team + ".html"
	}
}
