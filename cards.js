var _ = require('underscore')

var noop = function( board, character ) {
	return false
}

var moveUp = function( board, character ) {
	board.moveCharacterUp( character )
	character.text = "I Played " + this.name + "!"
}

var moveDown = function( board, character ) {
	board.moveCharacterDown( character )
	character.text = "I Played " + this.name + "!"
}

var blockableAttack = function(blockCardId) {
	return function(board, character) {
		var selfCardId = this.id
		var rpsEffect = function(targetPlayer) {
			if(targetPlayer.selectedCard != selfCardId && targetPlayer.selectedCard != blockCardId) {
				targetPlayer.statistics.health = targetPlayer.statistics.health - 10
			}
		}
		board.applyEffectByPosition(rpsEffect, character.position + 1)
		board.applyEffectByPosition(rpsEffect, character.position - 1)
		character.text = "I Played " + this.name + "!"
	}
}

var list = exports.list = [
	{ id: 0, name: "Attack", priority: 0, apply: noop, canApply: noop },
	{ id: 1, name: "Move up", priority: 1, apply: moveUp, canApply: noop },
	{ id: 2, name: "Move back", priority: 1, apply: moveDown, canApply: noop },
	{ id: 3, name: "Heal", priority: 0, apply: noop, canApply: noop },
	{ id: 4, name: "Defend", priority: 0, apply: noop, canApply: noop },
	{ id: 5, name: "Rock", priority: 2, apply: blockableAttack(6) },
	{ id: 6, name: "Paper", priority: 2, apply: blockableAttack(7) },
	{ id: 7, name: "Scissors", priority: 2, apply: blockableAttack(5) },
	{ id: 8, name: "Pass", priority: 0, apply: noop }
]

exports.findById = function(id) {
	return _.findWhere( list, { id: id } )
}
