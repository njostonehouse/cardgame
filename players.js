var _ = require('underscore')

var players = {
	list: [
		{ id: 0, name: "Carl", row: 0, cardIds: [ 0, 1, 5, 6, 7 ], state: { selectedCardId: null } },
		{ id: 1, name: "Noel", row: 1, cardIds: [ 1, 2, 5, 6, 7 ], state: { selectedCardId: null } },
		{ id: 2, name: "Sean", row: 0, cardIds: [ 2, 3, 5, 6, 7 ], state: { selectedCardId: null } },
		{ id: 3, name: "Mike", row: 0, cardIds: [ 3, 4, 5, 6, 7 ], state: { selectedCardId: null } },
	],
	findById: function( playerId ) {
		return _.findWhere( players.list, {id: playerId } )
	},
	unselectCards: function() {
		_.each( players.list, function(player) { player.state.selectedCardId = null } )
	}
}

module.exports = players
