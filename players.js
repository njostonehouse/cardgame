var _ = require('underscore')

var players = {
	list: [
		{ id: 0, name: "Carl", row: 0, cardIds: [ 0, 1 ], state: { selectedCard: null } },
		{ id: 1, name: "Noel", row: 1, cardIds: [ 1, 2 ], state: { selectedCard: null } },
		{ id: 2, name: "Sean", row: 0, cardIds: [ 2, 3 ], state: { selectedCard: null } },
		{ id: 3, name: "Mike", row: 0, cardIds: [ 3, 4 ], state: { selectedCard: null } },
	],
	findById: function( id ) {
		return _.find( players.list, function(player) { return player.id == id } )
	},
	unselectCards: function() {
		_.each( players.list, function(player) { player.state.selectedCard = null } )
	}
}

module.exports = players
