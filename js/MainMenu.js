Ball.MainMenu = function(game) {};
Ball.MainMenu.prototype = {
	create: function() {
		//Para cargar el fondo del menu
		this.add.sprite(0, 0, 'screen-mainmenu');
		//Para acomodar en la parte superior del menu el titulo de arriba y abajo
		this.gameTitle = this.add.sprite(Ball._WIDTH*1, 40, 'title');
		//Para que centrar de izquierda y derecha
		this.gameTitle.anchor.set(0.5,0);
		//Aplicamos para el boton de igual manera centramos de arriba y abajo
		this.startButton = this.add.button(Ball._WIDTH*0.5, 350, 'button-start', this.startGame, this, 2, 0, 1);
		//centrar izquierda y derecha
		this.startButton.anchor.set(0.5,0);
		this.startButton.input.useHandCursor = true;

		// button to "read the article"
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};
