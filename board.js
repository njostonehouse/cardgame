var _ = require('underscore')
var assert = require('assert')
var character = require('./character')

var Board = function() {
	this.teams = []

	this.findCharacterById = function( id ) {
		return _.find( character.list, function(c) { return c.id == id })
	}

	this.unselectAllCards = function() {
		_.each( this.teams, function(team) { 
			_.each(team.members, function(character) {
				character.selectedCard = null 
			})
		})
	}

	this.moveCharacter = function(character, distance) {
		var currTeam = _.find(this.teams, function(team) { return team.name == character.team })
		var currPos = this.getCharacterPosition(character)
		if ( this.isValidPosition(currTeam, currPos + distance) ) {
			this.swapPositions( currTeam, currPos, currPos + distance )
		}
	}
	
	this.swapPositions = function( team, position1, position2 ) {
		var evictedCharacter = team.members[position2]
		team.members[position2] = team.members[position1]
		team.members[position1] = evictedCharacter
	}

	this.isValidPosition = function( team, position ) {
		return position < _.size(team.members) && position >= 0
	}

	this.getCharacterPosition = function(character) {
		var charPos = -1
		_.find(_.find(this.teams, function(team) { return team.name == character.team }).members, function(member) {
			charPos++
			return member.id == character.id
		})
		return charPos
	}
	
	this.applyEffectByOpposingTeamPosition = function( effect, thisTeam, position ) {
		var self = this
		_.each(this.teams, function(team) {
			if(self.isValidPosition(team, position) && team.name != thisTeam.name) {
				effect(team.members[position])
			}
		})
	}
	
	this.addCharacter = function(character) {
		team = _.find(this.teams, function(team) { return team.name == character.team })
		if(!team) {
			team = this.teams[this.teams.push({name:character.team,members:[]})-1]
		}
		team.members.push(character)
	}

	this.addCharacters = function(characters) {
		var self = this
		_.each(characters, function(character) {
			self.addCharacter(character)
		})
	}
}

module.exports = new Board()
