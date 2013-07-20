var players = require( '../players' )
var should = require('should')

var BOTTOM_PLAYER_POSITION = 0
var MIDDLE_PLAYER_POSITION = 1
var TOP_PLAYER_POSITION = 2

var TOP_PLAYER, MIDDLE_PLAYER, BOTTOM_PLAYER

var resetPlayers = function() {
	TOP_PLAYER = { id: 0, name: "TOP", cardIds: [ 0, 1 ], state: { selectedCard: null, position: TOP_PLAYER_POSITION } }
	MIDDLE_PLAYER = { id: 0, name: "MIDDLE", cardIds: [ 0, 1 ], state: { selectedCard: null, position: MIDDLE_PLAYER_POSITION } }
	BOTTOM_PLAYER = { id: 0, name: "BOTTOM", cardIds: [ 0, 1 ], state: { selectedCard: null, position: BOTTOM_PLAYER_POSITION } }
	players.list = [ TOP_PLAYER, MIDDLE_PLAYER, BOTTOM_PLAYER ]
}
	
describe( 'players', function() {
	describe( 'movePlayerDown', function() {
		it( 'should do nothing to the player at the bottom', function() {
			resetPlayers()
			players.movePlayerDown( BOTTOM_PLAYER )
			BOTTOM_PLAYER.state.position.should.equal( BOTTOM_PLAYER_POSITION )
		})
		
		it( "should change top player's position when moving top player", function() {
			resetPlayers()
			players.movePlayerDown( TOP_PLAYER )
			TOP_PLAYER.state.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( "should change middle player's position when moving top player", function() {
			resetPlayers()
			players.movePlayerDown( TOP_PLAYER )
			MIDDLE_PLAYER.state.position.should.equal( TOP_PLAYER_POSITION )
		})
	})
	
	describe( 'movePlayerUp', function() {
		it( 'should do nothing to the player at the top', function() {
			resetPlayers()
			players.movePlayerUp( TOP_PLAYER )
			TOP_PLAYER.state.position.should.equal( TOP_PLAYER_POSITION )
		})
		
		it( "should change bottom player's position when moving bottom player", function() {
			resetPlayers()
			players.movePlayerUp( BOTTOM_PLAYER )
			BOTTOM_PLAYER.state.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( "should change middle player's position when moving bottom player", function() {
			resetPlayers()
			players.movePlayerUp( BOTTOM_PLAYER )
			MIDDLE_PLAYER.state.position.should.equal( BOTTOM_PLAYER_POSITION )
		})
	})
	
	describe( 'swapPlayersByPosition', function() {
		it( 'should do nothing to a player not swapped', function() {
			resetPlayers()
			players.swapPlayersByPosition( TOP_PLAYER_POSITION, BOTTOM_PLAYER_POSITION )
			MIDDLE_PLAYER.state.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( 'should swap player positions', function() {
			resetPlayers()
			players.swapPlayersByPosition( TOP_PLAYER_POSITION, BOTTOM_PLAYER_POSITION )
			TOP_PLAYER.state.position.should.equal( BOTTOM_PLAYER_POSITION )
			BOTTOM_PLAYER.state.position.should.equal( TOP_PLAYER_POSITION )
		})
		
		it( 'should throw when given a non-existant position', function() {
			resetPlayers()
			should.throws( function() {
				players.swapPlayersByPosition( TOP_PLAYER_POSITION + 100, BOTTOM_PLAYER_POSITION )
			})
		})
		
		it( 'should not modify player at first position when given non-existant second position', function() {
			resetPlayers()
			should.throws( function() {
				players.swapPlayersByPosition( TOP_PLAYER_POSITION, TOP_PLAYER_POSITION + 100 )
			})
			TOP_PLAYER.state.position.should.equal( TOP_PLAYER_POSITION )
		})
	})
	
	describe( 'findPlayerByPosition', function() {
		before( resetPlayers )
	
		it( 'should throw for non-existant position', function() {
			should.throws( function() {
				players.findPlayerByPosition( TOP_PLAYER_POSITION + 1 )
			})
		})
		
		it( "should find top player when given top player's position", function() {
			players.findPlayerByPosition( TOP_PLAYER_POSITION ).should.equal( TOP_PLAYER )
		})
	})
})
