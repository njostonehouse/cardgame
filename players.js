var _ = require('underscore')

var players = {
	list: [
		{ id: 0, name: "Carl", cardIds: [ 0, 1 ], state: { selectedCard: null, position: 3 } },
		{ id: 1, name: "Noel", cardIds: [ 1, 2 ], state: { selectedCard: null, position: 2 } },
		{ id: 2, name: "Sean", cardIds: [ 2, 3 ], state: { selectedCard: null, position: 1 } },
		{ id: 3, name: "Mike", cardIds: [ 3, 4 ], state: { selectedCard: null, position: 0 } },
	],
	findById: function( id ) {
		return _.find( players.list, function(player) { return player.id == id } )
	},
	unselectCards: function() {
		_.each( players.list, function(player) { player.state.selectedCard = null } )
	}
}

module.exports = players
