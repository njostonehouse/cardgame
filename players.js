var _ = require('underscore')
var assert = require('assert')

var Players = function() {
	this.list = [
		{ id: 0, name: "Carl", cardIds: [ 0, 1 ], state: { selectedCard: null, position: 3 } },
		{ id: 1, name: "Noel", cardIds: [ 1, 2 ], state: { selectedCard: null, position: 2 } },
		{ id: 2, name: "Sean", cardIds: [ 2, 3 ], state: { selectedCard: null, position: 1 } },
		{ id: 3, name: "Mike", cardIds: [ 3, 4 ], state: { selectedCard: null, position: 0 } },
	]
	
	this.findById = function( id ) {
		return _.find( this.list, function(player) { return player.id == id } )
	}

	this.unselectCards = function() {
		_.each( this.list, function(player) { player.state.selectedCard = null } )
	}

	this.movePlayerUp = function(player) {
		if ( player.state.position < this.list.length - 1 ) {
			var oldPosition = player.state.position
			var newPosition = oldPosition + 1

			var swapPlayer = _.find( this.list, function(player) {
				return player.state.position == newPosition
			})
			
			player.state.position = newPosition
			swapPlayer.state.position = oldPosition
		}
	}
	
	this.movePlayerDown = function(player) {
		if ( player.state.position > 0 ) {
			var oldPosition = player.state.position
			var newPosition = oldPosition - 1

			var swapPlayer = _.find( this.list, function(player) {
				return player.state.position == newPosition
			})
			
			player.state.position = newPosition
			swapPlayer.state.position = oldPosition
		}
	}
	
	this.swapPlayersByPosition = function( position1, position2 ) {
		var player1 = _.find( this.list, function(player) {
			return player.state.position == position1
		})
		assert( player1 )
		var player2 = _.find( this.list, function(player) {
			return player.state.position == position2
		})
		assert( player2 )
		
		player1.state.position = position2
		player2.state.position = position1
	}
}

module.exports = new Players()