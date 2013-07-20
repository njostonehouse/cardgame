var _ = require('underscore')

var noop = function( players, player ) {
}

var moveUp = function( players, player ) {
	players.movePlayerUp( player )
}

var list = exports.list = [
	{ id: 0, name: "Attack", apply: noop },
	{ id: 1, name: "Move up", apply: moveUp },
	{ id: 2, name: "Move back", apply: noop },
	{ id: 3, name: "Heal", apply: noop },
	{ id: 4, name: "Defend", apply: noop }
]

exports.findById = function(id) {
	return _.findWhere( list, { id: id } )
}
