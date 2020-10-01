var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {
	
	preload : function() {
        game.load.image('snake', './assets/images/Snake.png');
        game.load.image('apple', './assets/images/Apple.png');
		game.load.image('upButton', './assets/images/uparrow.png?' + Date.now());
		game.load.image('rightButton', './assets/images/rightarrow.png?' + Date.now());
		game.load.image('downButton', './assets/images/downarrow.png?' + Date.now());
		game.load.image('leftButton', './assets/images/leftarrow.png?' + Date.now());
		game.load.audio('eat', './assets/sound/chomp.mp3?', './assets/sound/chomp.ogg?' + Date.now());
		// hit = gameOver
		game.load.audio('hit', './assets/sound/gameOver.mp3?', './assets/sound/gameOver.ogg?' + Date.now());
	},
	
	create : function() {
		snake = [];				
		apple = {};            
		squareSize = 15;   
		score = 0;            
		speed = 0;
		direction = 'right';			
		new_direction = null;			
		updateDelay = 0;
		addNew = false;
		cursors = game.input.keyboard.createCursorKeys();
		game.stage.backgroundColor = '#fffff';	
        for(var i = 0; i < 1; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  
        }
		this.generateApple();

		 music = this.sound.add('theme');
		 eatingAudio = this.add.audio('eat');
		 gameoverAudio = this.add.audio('hit');
		 
       
		textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
		
		//game.add.text(90, 20, score, textStyle_Value);
		game.add.text(30, 20, "SCORE", textStyle_Key);
        this.scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);
        // Speed.
        game.add.text(500, 20, "SPEED", textStyle_Key);
        this.speedTextValue = game.add.text(558, 18, speed.toString(), textStyle_Value);
		if (!game.device.desktop) {
			// Display the mobile inputs
			this.addMobileInputs();
		}
		
	},
	
	update : function() {
		
		if(cursors.right.isDown && direction!='left' || this.moveRight && direction!='left'){
			new_direction = 'right';
			
		}
		else if(cursors.left.isDown && direction!='right' || this.moveLeft && direction!='right'){
			new_direction = 'left';
			
		}
		else if(cursors.up.isDown && direction!='down' || this.moveUp && direction!='down'){
			new_direction = 'up';
			
		}
		else if(cursors.down.isDown && direction!='up' || this.moveDown && direction!='up'){
			new_direction = 'down';
			
		}
		speed = Math.min(10, Math.floor(score/5));
        // Update speed value on game screen.
        this.speedTextValue.text = '' + speed;
		

		updateDelay++;
		
		if(updateDelay % (5-speed) == 0) {

			var firstCell = snake[snake.length -1],
				lastCell = snake.shift(),
				oldLastCellx = lastCell.x,
				oldLastCelly = lastCell.y;
				
				if(new_direction) {
					direction = new_direction;
					new_direction = null;
	
				}
				
				if(direction == 'right' ){
					lastCell.x = firstCell.x + 15;
					lastCell.y = firstCell.y;
					
				}
				else if(direction == 'left'){
					lastCell.x = firstCell.x - 15;
					lastCell.y = firstCell.y;
				}
				else if(direction == 'up'){
					lastCell.x = firstCell.x;
					lastCell.y = firstCell.y - 15;
				}		
				else if(direction == 'down'){
					lastCell.x = firstCell.x;
					lastCell.y = firstCell.y + 15;
				}
				
				snake.push(lastCell);
				firstCell = lastCell;
				
				if(addNew){
					snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
					addNew = false;
				}
		
				this.appleCollision();
				this.selfCollision(firstCell);
				this.wallCollision(firstCell);
		}
		
	},
	addMobileInputs: function() {
		
		// Movement variables
		this.moveUp = false;
		this.moveRight = false;
		this.moveDown = false;
		this.moveLeft = false;


		// Add the up button
		this.upButton = game.add.sprite(65, 250, 'upButton');
		this.upButton.inputEnabled = true;
		this.upButton.events.onInputOver.add(function(){this.moveUp = true; this.upButton.alpha = 1;}, this);
		this.upButton.events.onInputOut.add(function(){this.moveUp = false; this.upButton.alpha = 0.5;}, this);
		this.upButton.events.onInputDown.add(function(){this.moveUp = true; this.upButton.alpha = 1;}, this);
		this.upButton.events.onInputUp.add(function(){this.moveUp = false; this.upButton.alpha = 0.5;}, this);
		this.upButton.alpha = 0.5;
		
		// Add the right button
		this.rightButton = game.add.sprite(125, 310, 'rightButton');
		this.rightButton.inputEnabled = true;
		this.rightButton.events.onInputOver.add(function(){this.moveRight = true; this.rightButton.alpha = 1;}, this);
		this.rightButton.events.onInputOut.add(function(){this.moveRight = false; this.rightButton.alpha = 0.5;}, this);
		this.rightButton.events.onInputDown.add(function(){this.moveRight = true; this.rightButton.alpha = 1;}, this);
		this.rightButton.events.onInputUp.add(function(){this.moveRight = false; this.rightButton.alpha = 0.5;}, this);
		this.rightButton.alpha = 0.5;
		
		// Add the down button
		this.downButton = game.add.sprite(65, 370, 'downButton');
		this.downButton.inputEnabled = true;
		this.downButton.events.onInputOver.add(function(){this.moveDown = true; this.downButton.alpha = 1;}, this);
		this.downButton.events.onInputOut.add(function(){this.moveDown = false; this.downButton.alpha = 0.5;}, this);
		this.downButton.events.onInputDown.add(function(){this.moveDown = true; this.downButton.alpha = 1;}, this);
		this.downButton.events.onInputUp.add(function(){this.moveDown = false; this.downButton.alpha = 0.5;}, this);
		this.downButton.alpha = 0.5;
		
		// Add the left button
		this.leftButton = game.add.sprite(5, 310, 'leftButton');
		this.leftButton.inputEnabled = true;
		this.leftButton.events.onInputOver.add(function(){this.moveLeft = true; this.leftButton.alpha = 1;}, this);
		this.leftButton.events.onInputOut.add(function(){this.moveLeft = false; this.leftButton.alpha = 0.5;}, this);
		this.leftButton.events.onInputDown.add(function(){this.moveLeft = true; this.leftButton.alpha = 1;}, this);
		this.leftButton.events.onInputUp.add(function(){this.moveLeft = false; this.leftButton.alpha = 0.5;}, this);
		this.leftButton.alpha = 0.5;
	
	},


	appleCollision: function () {
		
		
	
		for(var i = 0; i < snake.length; i++){
			if(snake[i].x == apple.x && snake[i].y == apple.y){
				
				addNew = true;
		
                apple.destroy();
                
				eatingAudio.play();
		
				this.generateApple();
			 // Increase score.  Men då börjar masken fara fortare ++ = + =1
			 score += 1;

			 // Refresh scoreboard.
			this.scoreTextValue.text = score.toString();
			}
			
		}

			
	},
	 

	
	generateApple: function(){

       

        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

		apple = game.add.sprite(randomX, randomY, 'apple');
		
    },
	
	selfCollision: function(head) {
		
        for(var i = 0; i < snake.length-1; i++) {
			if(head.x == snake[i].x && head.y == snake[i].y) {
				gameoverAudio.loop = false;
				gameoverAudio.play();
				game.state.start('Game_Over');
			}

			
	} 
},

wallCollision: function(head) {
	if(head.x>=600 || head.x <0 || head.y >=600 || head.y <0) {
		gameoverAudio.loop = false;
		gameoverAudio.play();
		game.state.start('Game_Over');
	}
}
	
};