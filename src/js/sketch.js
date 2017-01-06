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
    background(10);
    food.show();
    snake.update(direction);
    snake.show();
    snake.check();
    snake.foodInsideBoode(food);
    snake.onFood(food);
}

function keyPressed() {
    if (keyCode === LEFT_ARROW)
        direction = 1;
    if (keyCode === RIGHT_ARROW)
        direction = 3;
    if (keyCode === UP_ARROW)
        direction = 2;
    if (keyCode === DOWN_ARROW)
        direction = 4;
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

function gotData(data) {
    var highscores = data.val();
    // Grab the keys to iterate over the object
    var keys = Object.keys(highscores);

    var high = 0,
        name = "ABC";

    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        // Checks which of the highscores is the highest highscore
        if (highscores[k].score > high) {
            high = highscores[k].score, name = highscores[k].name;
        }
    }
    var globalhighscore = document.getElementById("globalhighscore");
    globalhighscore.innerHTML = "Global: " + name + " " + high;
}

function errData(err) {
    console.log("Error");
    console.log(err);
}