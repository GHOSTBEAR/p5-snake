window.addEventListener("keydown", function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	e.preventDefault();
  }
}, false);

var reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  snake = new Snake();
  food.move();
  score = 0;
  loop();
});

var changeName = document.getElementById("changeName");
changeName.addEventListener("click", function () {
  showUserInput();
});

function setupRemoteDatabase() {
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

  var ref = database.ref("highscores");
  ref.on("value", gotData, errData);
}

function setupLocalDatabase() {
  var localName = localStorage.getItem("name");
  var localHighScore = localStorage.getItem("highscore");
  var innerHighScore = document.getElementById("highscore");
  if (localHighScore !== null) {
	innerHighScore.innerHTML = "Local: " + localName + " " + localHighScore;
  }
}

function showUserInput() {
  document.getElementById("userInput").style.visibility = "visible"; // Shows html prompt
  noLoop(); // Pause game
}

function initializeUsername() {
  username = document.getElementById("username").value;
  if (username.length >= 3 && username.length <= 3) {
	document.getElementById("userInput").style.visibility = "hidden"; 	// Hides html prompt
	loop() // Start game
  } else {
	alert("Enter a three letter name");
  }
}

var enter = document.getElementById("enter");
enter.addEventListener("click", function () {
  initializeUsername();
});

// TODO Add so user can press enter