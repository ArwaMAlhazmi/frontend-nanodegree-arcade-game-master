// Enemies our player must avoid
var Enemy = function(corX, corY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = corX;
    this.y = corY;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //As long as the enemy within the board, move it
    if(this.x < 505){
        this.x += this.speed * dt;
    }
    //Repostion the enemy to the begging line
    else{
        this.x = -150;
    }
};

// Draw the enemy on the screen, required method for game
// This class requires an update(), render() and
// a handleInput() method.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
class Player{
    constructor(){
        this.x = 200;
        this.y = 400;
        this.sprite = 'images/char-boy.png';
    }
    //Handling collisions and winning
    update(dt){
        //Handling collisions
        for(let enemy of allEnemies) {
            if (this.y >= enemy.y - 40 && this.y <= enemy.y + 40 && this.x >= enemy.x - 40 && this.x <= enemy.x + 40){
                this.reset();
            }
        }
        //handle winning
        if(this.y === -15){
            alert("you won! you escaped the enemy");
            this.reset();
        }

    }

    //Draw the player on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Move the player according to the keyboard input
    handleInput(input){
        if (input === 'left' && this.x > 0) {
            this.x -= 101;
        }
        else if (input === 'right' && this.x < 400){
            this.x += 101;
        }
        else if (input === 'up' && this.y > 0){
            this.y -= 83;
        }
        else if (input === 'down' && this.y < 400){
            this.y += 83;
        }
    }
    //Restarting the game
    reset(){
        this.x = 200;
        this.y = 400;
    }

}

// Now instantiate your objects.
const enemy1 = new Enemy(-200,55, 500);
const enemy2 = new Enemy(-100,138,300);
const enemy3 = new Enemy(-150,221,350);
const enemy4 = new Enemy(-100,221, 200);
const allEnemies = [enemy1, enemy2, enemy3, enemy4];
const player = new Player();

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
