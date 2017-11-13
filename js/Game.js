var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
		game.load.image('fondo', 'img/sky.png');
    game.load.image('plataforma', 'img/platform.png');
		game.load.image('diamante', 'img/diamond.png');
    game.load.image('bullet', 'img/ball.png');
    game.load.spritesheet('personaje', 'img/dude.png', 32, 48);
		//cargar la imagen del disparo
		game.load.image('laser', 'img/ball.png');
}

var suelo;
var personaje;
var pisoEnemigo;
var puntaje;
var txtPuntaje;
var vidas;
var txtVidas;
var nivel;
var txtNivel;

var sprintes;
var tweens;

var balas;
var fireRate = 100;
var nextFire = 0;
//OPCION 1
var tiempoBala = 0;
var botonDisparo;


function create(){
	//Agregamos la imagen de fondo
	game.add.sprite(0, 0, 'fondo');

		//PISO PRINCIPAL
	suelo = game.add.sprite(0, 550, 'plataforma');
	suelo.width = 800;

	//PISO DEL ENEMIGO
	pisoEnemigo = game.add.sprite(230, 400, 'plataforma');
	pisoEnemigo.width = 350;

	//Agregamos el personaje
	personaje = game.add.sprite(300, 0, 'personaje');

	//Agregamos la Fisica
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.physics.arcade.enable(suelo);
	game.physics.arcade.enable(pisoEnemigo);
	game.physics.arcade.enable(personaje);

	//Para que el personaje no se caiga
	personaje.body.gravity.y = 300;
	personaje.body.velocity.x = 50;
	pisoEnemigo.body.immovable = true;
	//personaje.anchor.setTo(0.5);

	//cordena en x aparicion
	//personaje.x = 300;
	//no hace nada
	//personaje.game.add.tween(personaje).to({x:300},2000, Phaser.Easing.Bounce.Out, true);
	//para mover con el mouse
	//personaje.events.onInputDown.add(mover, this);
	//var animacion = game.add.tween(personaje).to({x: })
	//var animacion = game.add.tween(personaje).to({x:500}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

	//Empieza a correr
 	//personaje.body.velocity.x = 250;
	//MOVIMIENTO IZQUIERDA Y DERECHA
	personaje.animations.add('left', [0, 1, 2, 3], 10, true);
 	personaje.animations.add('right', [5, 6, 7, 8], 10, true);
 	personaje.animations.play('right');

	//Variables del juego
	game.giro = 250;

	//LOS DISPAROS OPCION 1
	/*botonDisparo = game.input.keyboard.addKey(Phaser.keyboard.SPACERBAR);
	balas = game.add.group();
	balas.enableBody = true;
	balas.physicsBodyType = Phaser.Physics.ARCADE;
	balas.createMultiple(20, 'laser');
	balas.setAll('anchor.x', 0.5);
	balas.setAll('anchor.y', 1);
	balas.setAll('outOfBoundsKill', true);
	balas.setAll('checkWorldBounds', true);*/

	//LOS DISPAROS
	balas = game.add.group();
	balas.enableBody = true;
	balas.physicsBodyType = Phaser.Physics.ARCADE;

	balas.createMultiple(50, 'bullet', 0, false);
	balas.setAll('anchor.x', 0.5);
	balas.setAll('anchor.y', 0.5);
	balas.setAll('checkWorldBounds', true);
	balas.setAll('outOfBoundsKill', true);

	if (game.input.activePointer.isDown)
	{
			//Boom!
			fire();
	}

}
function update(){
	//Evitar que el personaje se caiga
	game.physics.arcade.collide(personaje, pisoEnemigo);

	if(personaje.body.velocity.x > 0 && personaje.x > game.giro){
    personaje.body.velocity.x *= -1;
    game.giro = game.rnd.integerInRange(300, personaje.x-1);
    personaje.animations.play('left');
	}

	if(personaje.body.velocity.x < 0 && personaje.x < game.giro){
	    personaje.body.velocity.x *= -1;
	    game.giro = game.rnd.integerInRange(personaje.x+1, 550);
	    personaje.animations.play('right');

	}
	//BALAS
	/*OPCION 1
	var bala;
	if(botonDisparo.isDown)
	{
		if (game.time.now > tiempoBala) {
			bala = balas.getFirstExists(false);
		}
		if (bala) {
			bala.reset(personaje.x, personaje.y);
			bala.body.velocity.y = -300;
			tiempoBala = game.time.now + 100;
		}
	}*/

	if (game.input.activePointer.isDown) {
		fire();
	}
}

	function fire(){
		if (game.time.now > nextFire && balas.countDead() > 0) {
			nextFire = game.time.now + fireRate;
			var bala = balas.getFirstExists(false);
			bala.reset (personaje.x, personaje.y);
			bala.rotation = game.physics.arcade.moveToPointer(bala, 1000, game.input.activePointer, 500);
		}
	}

function mover(){
		if (personaje.x == 100) {
			game.add.tween(personaje).to({x: '+300'}, 2000, Phaser.Easing.Linear.None, true);
		}else if (personaje.x === 400) {
			game.add.tween(personaje).to({x: '-300'}, 2000, Phaser.Easing.Linear.None, true);
		}
}
