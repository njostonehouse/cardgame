var _ = require('underscore')

var noop = function( players, player ) {
}

var moveUp = function( players, player ) {
	if ( player.state.position < players.list.length - 1 ) {
		player.state.position += 1
		var newPosition = player.state.position
		
		var swapPlayer = _.find( players.list, function(player) {
			return player.state.position == newPosition
		})
		swapPlayer.state.position -= 1
	}
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
