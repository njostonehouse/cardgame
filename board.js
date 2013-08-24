var _ = require('underscore')
var assert = require('assert')
var character = require('./character')

var nextId = 0
var getNextId = function() {
	return nextId++
}

var nextPositions = {}
var getNextPosition = function(teamName) {
	if(!nextPositions[teamName]) {
		nextPositions[teamName] = 0
	}
	return nextPositions[teamName]++
}

var Board = function() {
	this.characters = []

	this.teams = []
	
	this.addNewCharacter = function(name, team, cardWeights) {
		this.characters.push(new character.Character(name, cardWeights))
		if(!_.contains(this.teams, team)) {
			this.teams.push(team)
		}
		this.characters[_.size(this.characters)-1].id = getNextId()
		this.characters[_.size(this.characters)-1].team = team
		this.characters[_.size(this.characters)-1].position = getNextPosition(team)
	}
	
	this.findCharacterById = function( id ) {
		return _.find( this.characters, function(character) { return character.id == id } )
	}

	this.unselectCards = function() {
		_.each( this.characters, function(character) { character.selectedCard = null } )
	}

	this.moveCharacter = function(character, distance) {
		if ( this.canMove(character, distance) ) {
			this.swapCharactersByPosition( character.team, character.position, character.position + distance )
		}
	}
	
	this.swapCharactersByPosition = function( team, position1, position2 ) {
		var evictedCharacter = this.findCharacterByPosition( team, position2 )
		this.findCharacterByPosition( team, position1 ).position = position2
		evictedCharacter.position = position1
	}
	
	this.findCharacterByPosition = function( team, position ) {
		var character = _.find( _.filter(this.characters, function(ch) { return ch.team == team }), function(character) {
			return character.position == position
		})
		assert( character )
		return character
	}
	
	this.canMove = function( character, distance ) {
		return character.position + distance < _.filter(this.characters, function(ch) { return ch.team == character.team}).length && character.position + distance >= 0
	}

	this.applyEffect = function( effect, team, position ) {
		_.each(_.filter(this.characters, function(ch) { return ch.team == team }), function(character) {
			if(character.position == position) {
				effect(character)
			}
		})
	}
}

module.exports = new Board()
