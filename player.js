var cards = require( './cards' )
var _ = require('underscore')

var nextId = 0
var getNextId = function() {
	return nextId++
}

var Player = function( name, position, team, cardWeights ) {
	this.id = getNextId()
	this.name = name
	this.cardIds = [0, 1, 2, 3, 4, 5, 6, 7, 8]
	this.position = position
	this.team = team
	this.cardWeights = cardWeights
	this.controller = 'bot'

	this.selectCard = function( cardId ) {
		this.selectedCard = cardId
	}

	this.autoSelectCard = function() {
		var randomNumber = Math.random()
		var totalProbability = 0

		var option = _.find(cardWeights, function(option) {
			totalProbability += option.weight
			return totalProbability >= randomNumber
		})

		this.selectedCard = option ? option.cardId : null
	}	
	
	this.getSelectedCard = function() {
		if(!this.selectedCard) {
			if(this.controller == "bot") {
				this.autoSelectCard()
			} else {
				this.selectedCard = 8
			}
		}
		return this.selectedCard
	}

	this.resetCardSelection = function() {
		this.selectedCard = null
	}
}

module.exports.Player = Player