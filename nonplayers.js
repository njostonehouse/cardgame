var _ = require('underscore')

var nonplayers = {
	list: [
		{ id: 0, name: "Rocky", row: 0, cardIds: [ 5, 6, 7 ], state: { selectedCardId: null }, cardWeights: [.9, .1, 0] },
	],
	findById: function( nonplayerId ) {
		return _.findWhere( nonplayers.list, {id: nonplayerId } )
	},
	unselectCards: function() {
		_.each( nonplayers.list, function(nonplayer) { nonplayer.state.selectedCardId = null } )
	},
	play: function() {
		_.each( nonplayers.list, function(nonplayer) {
			var r = Math.random()
			var p = 0
			_.each(nonplayer.cardWeights, function(cardWeight, i) {
				if (p <= r) {
					nonplayer.state.selectedCardId = nonplayer.cardIds[i]
				}
				p = p + cardWeight
			})
			if(p != 1) {
				nonplayer.state.selectedCardId = null
			}
		})
	}
}

module.exports = nonplayers
