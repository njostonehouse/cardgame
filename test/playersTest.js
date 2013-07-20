var players = require('../players')
var Player = require('../player')
var should = require('should')

var BOTTOM_PLAYER_POSITION = 0
var MIDDLE_PLAYER_POSITION = 1
var TOP_PLAYER_POSITION = 2

var TOP_PLAYER, MIDDLE_PLAYER, BOTTOM_PLAYER

var resetPlayers = function() {
	TOP_PLAYER = new Player( 'TOP', TOP_PLAYER_POSITION )
	MIDDLE_PLAYER = new Player( 'MIDDLE', MIDDLE_PLAYER_POSITION )
	BOTTOM_PLAYER = new Player( 'BOTTOM', BOTTOM_PLAYER_POSITION )
	players.list = [ TOP_PLAYER, MIDDLE_PLAYER, BOTTOM_PLAYER ]
}
	
describe( 'players', function() {
	describe( 'movePlayerDown', function() {
		it( 'should do nothing to the player at the bottom', function() {
			resetPlayers()
			players.movePlayerDown( BOTTOM_PLAYER )
			BOTTOM_PLAYER.position.should.equal( BOTTOM_PLAYER_POSITION )
		})
		
		it( "should change top player's position when moving top player", function() {
			resetPlayers()
			players.movePlayerDown( TOP_PLAYER )
			TOP_PLAYER.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( "should change middle player's position when moving top player", function() {
			resetPlayers()
			players.movePlayerDown( TOP_PLAYER )
			MIDDLE_PLAYER.position.should.equal( TOP_PLAYER_POSITION )
		})
	})
	
	describe( 'movePlayerUp', function() {
		it( 'should do nothing to the player at the top', function() {
			resetPlayers()
			players.movePlayerUp( TOP_PLAYER )
			TOP_PLAYER.position.should.equal( TOP_PLAYER_POSITION )
		})
		
		it( "should change bottom player's position when moving bottom player", function() {
			resetPlayers()
			players.movePlayerUp( BOTTOM_PLAYER )
			BOTTOM_PLAYER.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( "should change middle player's position when moving bottom player", function() {
			resetPlayers()
			players.movePlayerUp( BOTTOM_PLAYER )
			MIDDLE_PLAYER.position.should.equal( BOTTOM_PLAYER_POSITION )
		})
	})
	
	describe( 'swapPlayersByPosition', function() {
		it( 'should do nothing to a player not swapped', function() {
			resetPlayers()
			players.swapPlayersByPosition( TOP_PLAYER_POSITION, BOTTOM_PLAYER_POSITION )
			MIDDLE_PLAYER.position.should.equal( MIDDLE_PLAYER_POSITION )
		})
		
		it( 'should swap player positions', function() {
			resetPlayers()
			players.swapPlayersByPosition( TOP_PLAYER_POSITION, BOTTOM_PLAYER_POSITION )
			TOP_PLAYER.position.should.equal( BOTTOM_PLAYER_POSITION )
			BOTTOM_PLAYER.position.should.equal( TOP_PLAYER_POSITION )
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
			TOP_PLAYER.position.should.equal( TOP_PLAYER_POSITION )
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
	
	describe( 'canMoveUp', function() {
		before( resetPlayers )
		
		it( 'should return false for top player', function() {
			players.canMoveUp(TOP_PLAYER).should.not.be.ok
		})
		
		it( 'should return true for middle player', function() {
			players.canMoveUp(MIDDLE_PLAYER).should.be.ok
		})
	})
	
	describe( 'canMoveDown', function() {
		before( resetPlayers )
		
		it( 'should return false for bottom player', function() {
			players.canMoveDown(BOTTOM_PLAYER).should.not.be.ok
		})
		
		it( 'should return true for middle player', function() {
			players.canMoveDown(MIDDLE_PLAYER).should.be.ok
		})
	})
})
