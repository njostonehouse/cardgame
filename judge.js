var _ = require('underscore')

var cards = require('./cards')

var players = require('./players')

var judge = {
	playCard: function(cardId, playerId) {
		playedCard = cards.findById(cardId)
		playingPlayer = players.findById(playerId)
		if ( playingPlayer ) {
			playingPlayer.state.text = "\"I played " + (playedCard ? playedCard.name : "nothing") + "!\""
		}
	}
}

module.exports = judge