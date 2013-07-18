var express = require('express')
var httpModule = require('http')
var ioModule = require('socket.io')
var _ = require('underscore')

var app = express();

var http = httpModule.createServer(app)
var io = ioModule.listen(http, { log: false })

var cards = require('./cards')

var players = require('./players')

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

var endTurn = function() {
	turnState.remaining = 15
	players.unselectCards()
	emit( 'players', players.list )
}

var oneSecond = function() {
	turnState.remaining -= 1
	if ( turnState.remaining <= 0 ) {
		endTurn()
	}
	emit( 'turn-pulse', turnState )
}

setInterval( oneSecond, 1000 )

console.log('Server running on port ' + port)
