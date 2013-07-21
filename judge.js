var _ = require('underscore')

var judge = {
	playCard: function(card, player) {
		player.state.text = "\"I played " + (card ? card.name : "nothing") + "!\""
	}
}

module.exports = judge