var snake;
var food;
var sizes;
var highscores;
var username;
var direction = 2;
var score = 1;
var paused = false;
var showingUser = false;

function setup() {
    // Sets up p5.js canvas and framerate
    "use strict";
    var canvas = createCanvas(501, 501);
    canvas.parent("game");
    frameRate(7);
    sizes = 20; // Size of snake

    setupRemoteDatabase();
    setupLocalDatabase();
    showUserInput();

    // Initialize
    snake = new Snake();
    food = new Food();
}

function draw() {
    "use strict";
    background(10);
    food.show();
    snake.update(direction);
    snake.show();
    snake.check();
    snake.foodInsideBoode(food);
    snake.onFood(food);
}

function keyPressed() {
    "use strict";
    if (keyCode === LEFT_ARROW) {
        direction = 1;
    }
    if (keyCode === RIGHT_ARROW) {
        direction = 3;
    }
    if (keyCode === UP_ARROW) {
        direction = 2;
    }
    if (keyCode === DOWN_ARROW) {
        direction = 4;
    }
    if (keyCode === 80) {
        if (paused) {
            loop();
            paused = false;
        } else {
            noLoop();
            paused = true;
        }
    }
    if (keyCode === 82) {
        resetGame();
    }
    if (keyCode === 13) {
        if (showingUser) {
            initializeUsername();
        }
    }
}