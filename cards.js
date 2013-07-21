var _ = require('underscore')

var cards = {
	list: [
		{ id: 0, name: "Attack" },
		{ id: 1, name: "Move up" },
		{ id: 2, name: "Move back" },
		{ id: 3, name: "Heal" },
		{ id: 4, name: "Defend" },
		{ id: 5, name: "Rock" },
		{ id: 6, name: "Paper" },
		{ id: 7, name: "Scissors" }
	],
	findById: function( cardId ) {
		return _.findWhere( cards.list, { id: cardId } )
	}
}
module.exports = cards