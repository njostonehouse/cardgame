var players = require( '../players' )
var should = require('should')

var BOTTOM_PLAYER_POSITION = 0
var MIDDLE_PLAYER_POSITION = 1
var TOP_PLAYER_POSITION = 2

var TOP_PLAYER = { id: 0, name: "TOP", cardIds: [ 0, 1 ], state: { selectedCard: null, position: TOP_PLAYER_POSITION } }
var MIDDLE_PLAYER = { id: 0, name: "MIDDLE", cardIds: [ 0, 1 ], state: { selectedCard: null, position: MIDDLE_PLAYER_POSITION } }
var BOTTOM_PLAYER = { id: 0, name: "BOTTOM", cardIds: [ 0, 1 ], state: { selectedCard: null, position: BOTTOM_PLAYER_POSITION } }

describe( 'players', function() {
	before( function() {
		players.list = [ TOP_PLAYER, MIDDLE_PLAYER, BOTTOM_PLAYER ]
	})

	describe( 'movePlayerDown', function() {
		it( 'should do nothing to the player at the bottom', function() {
			players.movePlayerDown( BOTTOM_PLAYER )
			BOTTOM_PLAYER.state.position.should.equal( BOTTOM_PLAYER_POSITION )
		})
		
		it( "should change top player's position when moving top player", function() {
			players.movePlayerDown( TOP_PLAYER )
			TOP_PLAYER.state.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( "should change middle player's position when moving top player", function() {
			players.movePlayerDown( TOP_PLAYER )
			MIDDLE_PLAYER.state.position.should.equal( TOP_PLAYER_POSITION )
		})
	})
})
