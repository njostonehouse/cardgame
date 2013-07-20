var _ = require('underscore')
var assert = require('assert')

var Players = function() {
	this.list = [
		{ id: 0, name: "Carl", cardIds: [ 0, 1 ], selectedCard: null, position: 3 },
		{ id: 1, name: "Noel", cardIds: [ 1, 2 ], selectedCard: null, position: 2 },
		{ id: 2, name: "Sean", cardIds: [ 2, 3 ], selectedCard: null, position: 1 },
		{ id: 3, name: "Mike", cardIds: [ 3, 4 ], selectedCard: null, position: 0 },
	]
	
	this.findById = function( id ) {
		return _.find( this.list, function(player) { return player.id == id } )
	}

	this.unselectCards = function() {
		_.each( this.list, function(player) { player.selectedCard = null } )
	}

	this.movePlayerUp = function(player) {
		if ( this.canMoveUp(player) ) {
			this.swapPlayersByPosition( player.position, player.position + 1 )
		}
	}
	
	this.movePlayerDown = function(player) {
		if ( this.canMoveDown(player) ) {
			this.swapPlayersByPosition( player.position, player.position - 1 )
		}
	}
	
	this.swapPlayersByPosition = function( position1, position2 ) {
		var player1 = this.findPlayerByPosition( position1 )
		var player2 = this.findPlayerByPosition( position2 )
		
		player1.position = position2
		player2.position = position1
	}
	
	this.findPlayerByPosition = function( position ) {
		var player = _.find( this.list, function(player) {
			return player.position == position
		})
		assert( player )
		return player
	}
	
	this.canMoveUp = function( player ) {
		return player.position < this.list.length - 1
	}
	
	this.canMoveDown = function( player ) {
		return player.position > 0
	}
}

module.exports = new Players()