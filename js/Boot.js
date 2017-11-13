var Ball = {
	_WIDTH: 1170,
	_HEIGHT: 900,
};
Ball.Boot = function(game) {};
Ball.Boot.prototype = {
	preload: function() {
	},
	create: function() {
		//Phaser creara el CANVAS deacuerdo al dispositvo de nacegacion
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//Para centrar el CANVAS
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//LUEGO cargamos el Preloader el que carga los graficos
		this.game.state.start('Preloader');

	}
};
