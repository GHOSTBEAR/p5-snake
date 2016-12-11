var body = [], olds = [[], []];

function Snake() {
	this.x = Math.floor(width / 2 / 20) * 20;
	this.y = Math.floor(height / 2 / 20) * 20;

	this.update = function (dir) {
		dir == 1 ? this.x -= sizes : dir == 2 && (this.y -= sizes);
		dir == 3 ? this.x += sizes : dir == 4 && (this.y += sizes);
	};

	this.show = function () {
		fill(0, 255, 0), stroke(50);
		rect(this.x, this.y, sizes, sizes);
		olds[0].unshift(this.x), olds[1].unshift(this.y);
		for (var i = 0; i < body.length; i++) {
			rect(olds[0][i + 1], olds[1][i + 1], sizes, sizes);
		}
	};

	this.check = function () {
		(this.x < 0 || this.y < 0 || this.x >= width || this.y >= height) && death("Out of bounds");
		for (var i = 0; i < body.length; i++) {
			(olds[0][i + 1] === this.x && olds[1][i + 1] === this.y) && death("Killed in action")
		}
	}
}

function death(reason) {
	document.getElementById("death").innerHTML = reason;
	noLoop();
	sumbitdata();
}

function sumbitdata() {
	var data = {
		name: person,
		score: scr
	};
	highscores.push(data, finished);
	scr > localStorage.getItem("highscore") && (localStorage.setItem("highscore", scr), localStorage.setItem("name", person));
}

function finished(error) {
	error ? console.log('ooops') : console.log('data saved!');
}