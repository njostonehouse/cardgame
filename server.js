var express = require('express')
var httpModule = require('http')
var ioModule = require('socket.io')
var _ = require('underscore')

var app = express();

var http = httpModule.createServer(app)
var io = ioModule.listen(http, { log: false })

var cards = require('./cards')

var players = require('./players')

var onConnect = function(socket) {
	socket.emit( 'players', players.list )
	socket.emit( 'cards', cards )
	socket.emit( 'turn-pulse', turnState )
	socket.on( 'select-card', onSelectCard )
}

var sockets = require('./sockets')( io, onConnect )

var onSelectCard = function(data) {
	var player = players.findById( data.playerId )
	player.state.selectedCard = data.cardId
	sockets.broadcast( 'player-state', player )
}

var turnState = { remaining: 15 }

var endTurn = function() {
	turnState.remaining = 15
	players.unselectCards()
	sockets.broadcast( 'players', players.list )
}

var oneSecond = function() {
	turnState.remaining -= 1
	if ( turnState.remaining <= 0 ) {
		endTurn()
	}
	sockets.broadcast( 'turn-pulse', turnState )
}

setInterval( oneSecond, 1000 )

app.use( express.bodyParser() )
app.use( express.static('pages') )

var port = process.env.PORT || process.env.VCAP_APP_PORT || 8000

http.listen(port)

console.log('Server running on port ' + port)
