var nextId = 0
var getNextId = function() {
	return nextId++
}

var Player = function( name, position ) {
	this.id = getNextId()
	this.name = name
	this.cardIds = [0, 1, 2, 3, 4 ]
	this.position = position
}

module.exports = Player
