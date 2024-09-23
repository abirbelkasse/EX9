var main = {
	preload: function() {

		game.load.image('paddle', 'assets/paddle.png');
		game.load.image('ball', 'assets/ball.png');
		game.load.image('brik', 'assets/brick.png');
	},

	create: function() { 
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.cursor = game.input.keyboard.createCursorKeys()


		this.paddle = game.add.sprite(200, 400, 'paddle');
		game.physics.arcade.enable(this.paddle);
		this.paddle.body.collideWorldBounds = true;
		this.paddle.body.immovable = true;



		this.ball = game.add.sprite(200, 300, 'ball');
		game.physics.arcade.enable(this.ball);
		game.physics.arcade.checkCollision.down = false;
		this.ball.body.collideWorldBounds = true;
		this.ball.body.velocity.x = 200; this.ball.body.velocity.y = 200;
		this.ball.body.bounce.x = 1; this.ball.body.bounce.y = 1;
		



		this.bricks = game.add.group();
		this.bricks.enableBody = true;
		for (var i = 0; i < 5; i++) 
			for (var j = 0; j < 5; j++) 
				game.add.sprite(55+i*60, 55+j*35, 'brik', 0, this.bricks);
		this.bricks.setAll('body.immovable', true);
		
		
	},

	update: function() {

		game.physics.arcade.collide(this.paddle, this.ball);
		game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
		

		if (this.cursor.right.isDown) 
			this.paddle.body.velocity.x = 350;
		else if (this.cursor.left.isDown) 
			this.paddle.body.velocity.x = -350;
		else 
			this.paddle.body.velocity.x = 0;

		if (this.ball.y>450)
			{introText = game.add.text(100, 2, 'Game Over!', { font: "40px Arial", fill: "#ffffff"});};	
		
	},

	hit: function(ball, brik) {
		brik.kill();
	}
};

var game = new Phaser.Game(400, 450, Phaser.AUTO, 'gameDiv');
game.state.add('main', main);
game.state.start('main');
