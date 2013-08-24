var cards = require( './cards' )
var _ = require('underscore')

var PLAYER_ID_BOT = null

var Character = function( name, cardWeights ) {
	this.name = name
	this.cardIds = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	this.cardWeights = cardWeights
	this.playerId = PLAYER_ID_BOT
	this.statistics = {health:100}

	this.selectCard = function( cardId ) {
		this.selectedCardId = cardId
	}

	this.autoSelectCard = function() {
		var randomNumber = Math.random()
		var totalProbability = 0

		if (this.playerId != PLAYER_ID_BOT) {
			this.selectedCardId = 8 // Pass
		} else {
			var option = _.find(cardWeights, function(option) {
				totalProbability += option.weight
				return totalProbability >= randomNumber
			})

			this.selectedCardId = option ? option.cardId : null
		}
	}	
	
	this.getSelectedCard = function() {
		if(!this.selectedCardId) {
			this.autoSelectCard()
		}
		return this.selectedCardId
	}

	this.resetCardSelection = function() {
		this.selectedCardId = null
	}
		
	this.takeBotControl = function(playerId) {
		this.resetCardSelection()
		if(this.playerId == PLAYER_ID_BOT) {
			this.playerId = playerId
		}
	}

	this.releaseBotControl = function(playerId) {
		this.resetCardSelection()
		if(this.playerId == playerId) {
			this.playerId = PLAYER_ID_BOT
		}
	}
	
	this.botEnabled = function() {
		return this.playerId == PLAYER_ID_BOT
	}
}

module.exports.Character = Character