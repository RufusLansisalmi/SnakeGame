var snake, apple, squareSize, speed, updateDelay, direction, new_direction, addNew, cursors,scoreTextValue,  speedTextValue, textStyle_Key, textStyle_Value,score,speed,toString,text;

var Game = {

    preload: function () {
        
        game.load.audio('eat');
    },

    create: function () {
        snake = [];
        squareSize = 15;
        apple = {};
        this.score= 0;
        game.state.backgroundColor = '#061f27';
        console.log("game.js create function");

       
        direction = 'right';
        new_direction = null;
        updateDelay = 0;
        speed = 0;
       
        addNew = false;
        game.add.text(235)
        
        cursors = game.input.keyboard.createCursorKeys();

        for (var i = 0; i < 3; i++) {
            snake[i] = game.add.sprite(150 + i * squareSize, 150, 'snake');
        }
       
        this.generateApple();

       textStyle_Key = {font: "bold 14px sans-sherif", fill: "#46c0f9", align: "center"};
       textStyle_Value = {font: "bold 18px sans-sherif", fill: "#fff", align: "center"};
       game.add.text(30,20, "SCORE", textStyle_Key);
       this.scoreTextValue = game.add.text(90, 18, 'score', textStyle_Value);
       

       game.add.text(500,20, "SPEED", textStyle_Key);
       this.speedTextValue = speed.add.text(558, 18, 'speed', textStyle_Value);


       

      
       //scoreText = game.add.text(10, 10, scoreString + score.toString(), { font: '12px Arial', fill: '#fff' });
       


    },





    update : function () {

        if (cursors.right.isDown && direction != 'left') {
            new_direction = 'right';
        } else if (cursors.left.isDown && direction != 'right') {
            new_direction = 'left';
        } else if (cursors.up.isDown && direction != 'down') {
            new_direction = 'up';
        } else if (cursors.down.isDown && direction != 'up') {
            new_direction = 'down';
        }
        
       


        updateDelay++;
        if (updateDelay % (5 - speed) == 0) {
            var firstCell = snake[snake.length -1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;
            if (new_direction) {
                direction = new_direction;
                new_direction = null;
            }
            if (direction == 'right') {
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            } else if (direction == 'left') {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            } else if (direction == 'up') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            } else if (direction == 'down') {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

            
            snake.push(lastCell);
            firstCell = lastCell;
            if (addNew) {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }
          this.appleCollision();
          this.selfCollision(firstCell);
          this.wallCollision(firstCell);



        }
    },

    selfCollision: function(head) {
       
for(var i = 0; i < snake.length-1; i++) {
    if(head.x == snake[i].x && head.y == snake[i].y){
        game.state.start('Game_Over');

    }
}
    },
    wallCollision: function(head){
        if(head.x>=600 || head.x <0 || head.y >=600 || head.y <0){
            game.state.start('Game_Over');
        }
    },
    
  

    appleCollision: function () {
         // console.log('check apple collision');
        
        for(var i = 0; i < snake.length; i++) {
            if(snake[i].x == apple.x && snake[i].y == apple.y){
                addNew = true;

               apple.destroy();

                this.generateApple();
  
               //score++;
                //this.scoreText.text = score;
               this.score+=1;
               this.scorelabel.text = 'Score' + this.score;
 
            }   
        }
      },
  
      generateApple: function () {
        var randomX = Math.floor(Math.random() * 40) * squareSize,
            randomY = Math.floor(Math.random() * 30) * squareSize;

        apple = game.add.sprite(randomX, randomY, 'Apple');
        
        
    },

    




    
   


};