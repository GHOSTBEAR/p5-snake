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

function initializeUsername() {
  // TODO Change prompt to html
  username = prompt("Enter a three letter name", "AAA");
  // TODO Make logic better
  if (username !== null && username.length <= 3 && username.length !== "") {
	console.log("Changed Name");
  } else {
	username = "CPU";
  }
}