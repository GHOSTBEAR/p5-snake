window.addEventListener("keydown", function (e) {
    "use strict";
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function resetGame() {
    "use strict";
    var dialog = document.getElementById("gameOverDialog");
    dialog.style.visibility = "hidden";
    snake = new Snake();
    food.move();
    score = 0;
    loop();
}

var reset = document.getElementById("reset");
reset.addEventListener("click", function () {
    "use strict";
    resetGame();
});

var changeName = document.getElementById("changeName");
changeName.addEventListener("click", function () {
    "use strict";
    showUserInput();
});

function gotData(data) {
    "use strict";
    var i,
        highscores = data.val(),
        keys = Object.keys(highscores),
        high = 0,
        name = "ABC";

    // Grab the keys to iterate over the object
    for (i = 0; i < keys.length; i++) {
        var k = keys[i];
        // Checks which of the highscores is the highest highscore
        if (highscores[k].score > high) {
            high = highscores[k].score;
            name = highscores[k].name;
        }
    }
    var globalhighscore = document.getElementById("globalhighscore");
    globalhighscore.innerHTML = "Global: " + name + " " + high;
}

function errData(err) {
    console.log("Error");
    console.log(err);
}

function setupRemoteDatabase() {
    "use strict";
    var config = {
        apiKey: "AIzaSyDLQWDljQw2ZBk4aTwb0kDoqCU7ut5PCU8",
        authDomain: "snake-game-highscore.firebaseapp.com",
        databaseURL: "https://snake-game-highscore.firebaseio.com",
        storageBucket: "snake-game-highscore.appspot.com",
        messagingSenderId: "697454527983"
    };

    firebase.initializeApp(config);

    var database = firebase.database(),
        ref = database.ref("highscores");
    highscores = database.ref('highscores');
    ref.on("value", gotData, errData);
}

function setupLocalDatabase() {
    "use strict";
    var localName = localStorage.getItem("name"),
        localHighScore = localStorage.getItem("highscore"),
        innerHighScore = document.getElementById("highscore");
    if (localHighScore !== null) {
        innerHighScore.innerHTML = "Local: " + localName + " " + localHighScore;
    }
}

function showUserInput() {
    "use strict";
    showingUser = true;
    document.getElementById("userInput").style.visibility = "visible"; // Shows html prompt
    noLoop(); // Pause game
}

function initializeUsername() {
    "use strict";
    username = document.getElementById("username").value;
    if (username.length >= 3 && username.length <= 3) {
        var userinput = document.getElementById("userInput");
        userinput.style.visibility = "hidden"; // Hides html prompt
        loop(); // Start game
    } else {
        alert("Enter a three letter name");
    }
}

var enter = document.getElementById("enter");
enter.addEventListener("click", function () {
    "use strict";
    initializeUsername();
});

function showDeadDialog(reasonText) {
    "use strict";
    var reason = document.getElementById("reason"),
        dialog = document.getElementById("gameOverDialog");
    reason.textContent = "Reason: " + reasonText;
    dialog.style.visibility = "visible";
}