Ball.Howto = function(game) {
};
Ball.Howto.prototype = {
	create: function() {
		//Mostrar las instrucciones del juego. dando un clcik
		this.buttonContinue = this.add.button(0, 0, 'screen-howtoplay', this.startGame, this);
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};
