// new gamea.js
// Sätter in globala variabler som vi behöver i spelet
var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

var Game = {
	
	preload : function() {
		game.load.image('snake', './assets/images/snake.png');
		game.load.image('apple', './assets/images/apple.png');
		
	},
	
	create : function() {
		// Initilaze
		snake = [];						// this will work as a stack
		apple = {};                     // An object for the apple;
		squareSize = 15;                // The length of a side of the squares. Our image is 15x15 pixels.
		speed = 0;
		direction = 'right';			// The directin of our snake
		new_direction = null;			// A Buffer to store the new direction into
		updateDelay = 0;
		addNew = false;
		
		// Set up a Phaser controller for keyboard input.
        cursors = game.input.keyboard.createCursorKeys();
		
		// ändra färgen kolla att den funkar
	game.stage.backgroundColor = '#061fff';	
	console.log("FOO");
	
	// hÄR kommer ormen 
	// Generate the initial snake stack. Our snake will be 10 elements long.
        for(var i = 0; i < 10; i++){
            snake[i] = game.add.sprite(150+i*squareSize, 150, 'snake');  // Parameters are (X coordinate, Y coordinate, image)
        }
		// test om snaken syns
		//game.add.sprite(100, 400, 'snake');
		
	
	// här sätter vi äpplet in och kollar att den kommer random på skärmen.
	
        this.generateApple();
		
	},
	
	update : function() {
		
		if(cursors.right.isDown && direction!='left'){
			new_direction = 'right';
			
		}
		else if(cursors.left.isDown && direction!='right'){
			new_direction = 'left';
			
		}
		else if(cursors.up.isDown && direction!='down'){
			new_direction = 'up';
			
		}
		else if(cursors.down.isDown && direction!='up'){
			new_direction = 'down';
			
		}
		
		// increase counter on every update cell call
		updateDelay++;
		
		if(updateDelay % (10-speed) == 0) {
		// snake att röra på sig
			var firstCell = snake[snake.length -1],
				lastCell = snake.shift(),
				oldLastCellx = lastCell.x,
				oldLastCelly = lastCell.y;
				
				if(new_direction) {
					direction = new_direction;
					new_direction = null;
					
				}
				
				if(direction == 'right' ) {
					lastCell.x = firstCell.x +15;
					lastCell.y = firstCell.y;
					
				}
				else if(direction == 'left' ) {
					lastCell.x = firstCell.x -15;
					lastCell.y = firstCell.y;
				}else if(direction == 'up' ) {
					lastCell.x = firstCell.x ;
					lastCell.y = firstCell.y -15;
				}		
				else if(direction == 'down' ) {
					lastCell.x = firstCell.x ;
					lastCell.y = firstCell.y +15;
				}
				
				// Place the last cell in the front of the stack
				// Mark it as the first cell
				snake.push(lastCell);
				firstCell = lastCell;
				// Create a block in the back of the snake with the old position
				if(addNew) {
					snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
					addNew = false;
				}
				// Check apple collision
				this.appleCollision();
		}
		
	},
	// Här kommer funktioner som vi kallar på från create / update
	appleCollision: function () {
		
		
		//console.log("check apple collision");
		for(var i = 0; i < snake.length; i++) {
			if(snake[i].x == apple.x && snake[i].y == apple.y) {
				
				addNew = true;
				// destroy the old apple
				apple.destroy();
				// make a new apple
				this.generateApple();
				
				// increase score
				
			}
			
		}
		
	},
	
	
	generateApple: function(){

        // Chose a random place on the grid.
        // X is between 0 and 585 (39*15)
        // Y is between 0 and 435 (29*15)

        var randomX = Math.floor(Math.random() * 40 ) * squareSize,
            randomY = Math.floor(Math.random() * 30 ) * squareSize;

        // Add a new apple.
        apple = game.add.sprite(randomX, randomY, 'apple');
    }
	
	
	
	
	
	
	
	
	
	
};