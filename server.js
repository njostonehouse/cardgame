var express = require('express')
var httpModule = require('http')
var ioModule = require('socket.io')
var _ = require('underscore')

var app = express();

var http = httpModule.createServer(app)
var io = ioModule.listen(http, { log: false })

var cards = require('./cards')

var players = {
	list: [
		{ id: 0, name: "Carl", row: 0, cardIds: [ 0, 1 ], state: { selectedCard: null } },
		{ id: 1, name: "Noel", row: 1, cardIds: [ 1, 2 ], state: { selectedCard: null } },
		{ id: 2, name: "Sean", row: 0, cardIds: [ 2, 3 ], state: { selectedCard: null } },
		{ id: 3, name: "Mike", row: 0, cardIds: [ 3, 4 ], state: { selectedCard: null } },
	],
	findById: function( id ) {
		return _.find( players.list, function(player) { return player.id == id } )
	}
}

var sockets = []

var emit = function( event, data ) {
	_.each(
		sockets,
		function(socket) {
			socket.emit( event, data )
		}
	)
}

var onSelectCard = function(data) {
	var player = players.findById( data.playerId )
	player.state.selectedCard = data.cardId
	emit( 'player-state', player )
}

var unselectCards = function(player) {
	player.state.selectedCard = null
	_.each(
		player.cards,
		function(card) {
			card.selected = false
		}
	)
}

var onDisconnect = function(socket) {
	sockets = _.without( sockets, socket )
}

var turnState = { remaining: 15 }

var onConnect = function(socket) {
	sockets.push( socket )
	socket.on( 'disconnect', _.bind( onDisconnect, socket ) )

	socket.emit( 'players', players.list )
	socket.emit( 'cards', cards )
	socket.emit( 'turn-pulse', turnState )
	socket.on( 'select-card', onSelectCard )
}

io.sockets.on( 'connection', onConnect );

app.use( express.bodyParser() )
app.use( express.static('pages') )

var port = process.env.PORT || process.env.VCAP_APP_PORT || 8000

http.listen(port)

var oneSecond = function() {
	turnState.remaining -= 1
	if ( turnState.remaining <= 0 ) {
		turnState.remaining = 15
		_.each( players.list, unselectCards )
		emit( 'players', players.list )
	}
	emit( 'turn-pulse', turnState )
}

setInterval( oneSecond, 1000 )

console.log('Server running on port ' + port)
