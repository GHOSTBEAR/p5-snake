var snake, score, sizes, highscores, person = "NUL", dir = 2, scr = 1, paused = false;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function setup() {
    var config = {
        apiKey: "AIzaSyDLQWDljQw2ZBk4aTwb0kDoqCU7ut5PCU8",
        authDomain: "snake-game-highscore.firebaseapp.com",
        databaseURL: "https://snake-game-highscore.firebaseio.com",
        storageBucket: "snake-game-highscore.appspot.com",
        messagingSenderId: "697454527983"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    highscores = database.ref('highscores');

    // Prompt user to enter name
    person = prompt("Enter a three letter name", "AAA");
    if (person != null && person.length <= 3 && person.length != "") {
        console.log("Good to go");
    } else {
        console.log("-_-");
        person = "CPU";
    }

    // Sets up p5.js canvas and framerate
    var canvas = createCanvas(501, 501);
    canvas.parent("game");
    frameRate(7);
    sizes = 20; // Size of snake

    // Initialize
    snake = new Snake();
    score = new Score();

    // Gets database from Firebase
    var ref = database.ref("highscores");
    ref.on("value", gotData, errData);

    // Puts local high score into html file
    var localName = localStorage.getItem("name");
    var localHighScore = localStorage.getItem("highscore");
    if (localStorage.getItem("highscore") != null) {
        document.getElementById("highscore").innerHTML = "Local: " + localName + " " + localHighScore;
    }
}

function draw() {
    background(10);
    score.show();
    snake.update(dir);
    snake.show();
    snake.check();
    snake.scoreinbody(score);

    // Checks if snake is on score
    var playerScore = document.getElementById("score");
    if (snake.x === score.x && snake.y === score.y)
        snake.body.push(""), score.move(), scr++, playerScore.innerHTML = "Score: " + scr;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW)
        dir = 1;
    if (keyCode === RIGHT_ARROW)
        dir = 3;
    if (keyCode === UP_ARROW)
        dir = 2;
    if (keyCode === DOWN_ARROW)
        dir = 4;
    if (keyCode === 80) {
      if (paused) {
        loop();
        paused = false;
      } else {
        noLoop();
        paused = true;
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

    document.getElementById("globalhighscore").innerHTML = "Global: " + name + " " + high;
}

function errData(err) {
    console.log("Error");
    console.log(err);
}

var reset = document.getElementById("reset");
reset.addEventListener("click", function() {
    snake = new Snake();
    score.move();
    scr = 0;
    loop();
});

var changeName = document.getElementById("changeName");
changeName.addEventListener("click", function() {
    person = prompt("Enter a three letter name", "AAA");
    if (person != null && person.length <= 3 && person.length != "") {
        console.log("Changed Name");
    } else {
        person = "CPU";
    }
});
