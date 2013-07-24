var cards = require( './cards' )
var _ = require('underscore')

var nextId = 0
var getNextId = function() {
	return nextId++
}

var Player = function( name, position ) {
	this.id = getNextId()
	this.name = name
	this.cardIds = [0, 1, 2, 3, 4, 5, 6, 7]
	this.position = position
	this.entityType = 'player'

	this.selectCard = function( cardId ) {
		this.selectedCard = cardId
	}

	this.getSelectedCard = function() {
		return this.selectedCard
	}

	this.resetCardSelection = function() {
		this.selectedCard = null
	}
}

var rockyWeights = [
	{ cardId: 5, weight: 1 }
]

var NonPlayer = function( name, position ) {
	this.id = getNextId()
	this.name = name
	this.cardIds = [0, 1, 2, 3, 4, 5, 6, 7]
	this.position = position
	this.entityType = 'nonplayer'

	this.selectCard = function( cardId ) {
		throw 'NonPlayer.selectCard not implemented'
	}

	this.getSelectedCard = function() {
		var randomNumber = Math.random()
		var totalProbability = 0

		var option = _.find(rockyWeights, function(option) {
			totalProbability += option.weight
			return totalProbability >= randomNumber
		})

		return option ? option.cardId : null
	}

	this.resetCardSelection = function() {
		throw 'NonPlayer.resetCardSelection not implemented'
	}
}

module.exports.Player = Player
module.exports.NonPlayer = NonPlayer
