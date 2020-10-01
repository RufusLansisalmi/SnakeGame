var Menu = {
    preload : function (){
        game.load.image('meny', './assets/images/Game-menu.png');
       
        },
        create: function(){
            
            this.add.button(0,0, 'meny',this.startGame, this );
          


            

        },
        
        startGame :function () {
          
            this.state.start('Game');
        
        }
       
        
        
        
        };