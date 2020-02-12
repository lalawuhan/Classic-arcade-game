// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
};

// Variables to use in the score message
let score = 0;
let scoreMessage = document.querySelector("h4");

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //505 is size of canvas height
    if (this.x > 505) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 322);
    }
    //---Checking for collision--- If the player collides with the enemy, the player will be returned to his original position

    if (
        player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y
    ) {
        player.x = 200;
        player.y = 402;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/char-boy.png";
};
Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//each keypress is for various arrow keys to move player sprite forward or back
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == "left" && this.x > 0) {
        this.x -= 40;
    }
    if (keyPress == "right" && this.x < 400) {
        this.x += 40;
    }
    if (keyPress == "up" && this.y > 0) {
        this.y -= 55;
    }
    if (keyPress == "down" && this.y < 402) {
        this.y += 67;
    }

    // Once the user reaches the top of the page; the water, the user is
    // Instantly reset to the starting position
    if (this.y <= 0) {
        setTimeout(() => {
            this.x = 200;
            this.y = 402;
            score = score + 1;
            scoreMessage.innerText =
                "Amount of times you made it to the water: " + score;
        }, 100);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Place the player object in a variable called player
var enemyPosition = [60, 140, 220];
var player = new Player(200, 402, 50);
var enemy;
enemyPosition.forEach(function(positionY) {
    enemy = new Enemy(0, positionY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
