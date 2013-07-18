module.exports = function( oneSecondCallback, oneTurnCallback ) {
	var turnState = { remaining: 15 }

	var endTurn = function() {
		turnState.remaining = 15
		oneTurnCallback()
	}

	var oneSecond = function() {
		turnState.remaining -= 1
		if ( turnState.remaining <= 0 ) {
			endTurn()
		}
		oneSecondCallback(turnState)
	}

	setInterval( oneSecond, 1000 )
	
	return turnState
}