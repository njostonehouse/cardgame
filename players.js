var _ = require('underscore')

var list = exports.list = [
		{ id: 0, name: "Carl", cardIds: [ 0, 1 ], state: { selectedCard: null, position: 3 } },
		{ id: 1, name: "Noel", cardIds: [ 1, 2 ], state: { selectedCard: null, position: 2 } },
		{ id: 2, name: "Sean", cardIds: [ 2, 3 ], state: { selectedCard: null, position: 1 } },
		{ id: 3, name: "Mike", cardIds: [ 3, 4 ], state: { selectedCard: null, position: 0 } },
	]
	
var findById = exports.findById = function( id ) {
		return _.find( list, function(player) { return player.id == id } )
	}

var unselectCards = exports.unselectCards = function() {
	_.each( list, function(player) { player.state.selectedCard = null } )
}
