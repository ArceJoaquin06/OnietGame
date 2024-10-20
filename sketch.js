// Variables
let player;
let vidaS, vidaN = 4; // sprite y número
let bricks;
let fire;
let meteors;
let fondo, menu;
let isJumping = false;
let coinImg;
let gameStarted = false; // Variable para controlar si el juego ha empezado

function preload() {
    fondo = loadImage('/img/juego.png');
    menu = loadImage('/img/menu_fondo.png');
    // coinImg = loadImage('/img/moneda.png');
}

function setup() {
    new Canvas(1500, 800);

    // Gravedad
    world.gravity.y = 12;

    // Player
    player = new Sprite(200, 350, 28, 50);
    player.friction = 0;
    player.rotationLock = true;
    player.tile = 't';
	player.visible = false;

    // Estructura
    // Lógica de los ladrillos
    bricks = new Group();
    bricks.w = 30;
    bricks.h = 30;
    bricks.visible = false;
    bricks.collider = 'static';
    bricks.tile = '=';
    bricks.color = 'white';

    fire = new Group();
    fire.w = 5;
    fire.h = 2;
    fire.visible = false;
    fire.tile = 'f';

    meteors = new Group();
    meteors.r = 10;
    meteors.visible = false;
    meteors.tile = 'm';

    coins = new Group();
    coins.d = 10;
    coins.tile = 'c';
	coins.visible = false;

    // Creación de los tiles
    tilesGroup = new Tiles(
        [
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=.............',
            '=..................................======..........................................................................................................................................................................',
            '=..............................................==.................m...............................................................................................................................................................................',
            '=.............................................==...............................................................................................................................................====..........................',
            '=............................................==...............c............................................................c..................................................................=====....c.........c............',
            '=...........................................==.....................................................................m.....=====...............................................................============.....========......................c..........................................................................................................',
            '=..........................................==.........................................m.................................=======...................................................m.........=====.............========.................========...========....====.....................====.............====.......................................',
            '=.........................................==..................m........................................................=========....................m................m.....................====...............========....========.....========...========....====.....c...........====.........................====.......',
            '=.......................................==...................................c....................c...................===========.........................................................====................========....========.....========...========....====....====....========..........====...........====...................',
            '==.....................................=.................................===========......===============............=============.........................m...........m.................====.................========....========.....========...========....====....====...====......................====....................',
            '===........c...............t..........=..fffffffffffffffff...............===========ffffff===============...........===============............................................m........===fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff........................',
            '================================================================================================================================================================================================================================================================================================================================'
        ],
        1,
        1,
        bricks.w + 1,
        bricks.h + 1
    );

    player.overlaps(coins, collect);
    player.overlaps(meteors, damage);
}

function damage(player, meteor) {
    meteor.remove();
}

function collect(player, coin) {
    coin.remove();
}

function draw() {
    if (!gameStarted) {
        // Mostrar pantalla de inicio
        background(200);
        image(menu, 0, 0, width, height);
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text("Presiona 'J' para empezar", width / 2, height / 2);
        startGame();
    } else {
        // Pantalla del juego
        background(200);
        image(fondo, 0, 0, (height * fondo.width) / fondo.height, height);
        movePlayers();
        camera.x = player.x;
    }
}

function startGame() {
    if (kb.presses('j')) {
        gameStarted = true; // Cambiar el estado del juego para empezar
		player.visible = true;
		bricks.visible = true;
		fire.visible = true;
		meteors.visible = true;
		coins.visible = true;
    }
}

function movePlayers() {
    // Controlar al jugador
    if (kb.pressing('a')) {
        player.vel.x = -4;  // Mover a la izquierda
    } else if (kb.pressing('d')) {
        player.vel.x = 4;  // Mover a la derecha
    } else {
        player.vel.x = 0;  // Detener movimiento en X
    }

    // Verificar si el jugador toca los ladrillos
    if (player.colliding(bricks)) {
        isJumping = false; // Permitir el salto nuevamente cuando toque el ladrillo
    } else {
        isJumping = true; // Establecer que el jugador está en el aire
    }

    // Lógica de salto
    if (kb.presses('w') && !isJumping) {
        player.vel.y = -7.5;  // Saltar
        isJumping = true; // Establecer que el jugador ha saltado
    }
}
