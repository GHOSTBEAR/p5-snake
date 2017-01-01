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
  person = prompt("Enter a three letter name", "AAA");
  if (person !== null && person.length <= 3 && person.length !== "") {
	console.log("Changed Name");
  } else {
	person = "CPU";
  }
});