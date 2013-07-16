var express = require('express')
var httpModule = require('http')
var ioModule = require('socket.io')

var app = express();

var http = httpModule.createServer(app)
var io = ioModule.listen(http, { log: false })

var players = [
				{ name: "Carl", row: 0, cards: [0, 1] },
				{ name: "Noel", row: 1, cards: [1, 2] },
				{ name: "Sean", row: 0, cards: [2, 3] },
				{ name: "Mike", row: 0, cards: [3, 4] },
			]

io.sockets.on(
	'connection',
	function(socket) {
		socket.emit( 'players', players )
		socket.on(
			'select-card',
			function(data) {
				console.log( data )
			}
		)
	}
)

app.use( express.bodyParser() )
app.use( express.static('pages') )

var port = process.env.PORT || process.env.VCAP_APP_PORT || 8000

http.listen(port)

console.log('Server running on port ' + port)
