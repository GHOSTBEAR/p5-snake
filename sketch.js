var snake;
var score;
var sizes;
var dir = 2;
var scr = 1;
var person;

var config = {
    apiKey: "AIzaSyDLQWDljQw2ZBk4aTwb0kDoqCU7ut5PCU8",
    authDomain: "snake-game-highscore.firebaseapp.com",
    databaseURL: "https://snake-game-highscore.firebaseio.com",
    storageBucket: "snake-game-highscore.appspot.com",
    messagingSenderId: "697454527983"
};
firebase.initializeApp(config);

var database = firebase.database();
var highscores = database.ref('highscores');

function setup() {
    // Prompt user to enter name
    person = prompt("Enter a three letter name", "AAA");
    if (person != null && person.length <= 3) {
        console.log("nine");
    }

    // Sets up p5.js canvas and framerate
    var canvas = createCanvas(500, 500);
    canvas.parent("game");
    frameRate(7);
    sizes = 20; // Size of snake

    // Initialize
    snake = new Snake();
    score = new Score();

    // Gets database from Firebase
    var ref = database.ref("highscores");
    ref.on("value", gotData, errData);

    if (localStorage.getItem("highscore") != null) {
        console.log(localStorage.getItem("highscore"));
        document.getElementById("highscore").innerHTML = "Local: " + localStorage.getItem("name") + " " + localStorage.getItem("highscore");
    }
}

function draw() {
    // General
    background(10);

    // Score
    score.show();

    // Snake
    snake.update(dir);
    snake.show();
    snake.check();

    // Checks if snake is on score
    if (snake.x === score.x && snake.y === score.y) {
        body.push("");
        score.move();
        scr++;
        document.getElementById("score").innerHTML = "Score: " + scr;
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        dir = 1;
    } else if (keyCode === RIGHT_ARROW) {
        dir = 3;
    } else if (keyCode === UP_ARROW) {
        dir = 2;
    } else if (keyCode === DOWN_ARROW) {
        dir = 4;
    }

    // Cheats
    if (keyCode === 65) {
        body.push("");
    } else if (keyCode === 66) {
        scr++;
    }
}

function gotData(data) {
    var highscores = data.val();
    // Grab the keys to iterate over the object
    var keys = Object.keys(highscores);

    var high = 0;
    var name = "ABC";

    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        // Checks which of the highscores is the highest highscore
        if (highscores[k].score > high) {
            high = highscores[k].score;
            name = highscores[k].name;
        }
    }

    document.getElementById("globalhighscore").innerHTML = "Global: " + name + " " + high;
}

function errData(err) {
    console.log("Error");
    console.log(err);
}