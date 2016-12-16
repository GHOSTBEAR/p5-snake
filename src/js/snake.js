function Snake() {
	this.x = Math.floor(width / 2 / 20) * 20;
	this.y = Math.floor(height / 2 / 20) * 20;
	this.body = [];
	this.olds = [[], []];

	this.update = function (dir) {
		dir == 1 ? this.x -= sizes : dir == 2 && (this.y -= sizes);
		dir == 3 ? this.x += sizes : dir == 4 && (this.y += sizes);
	};

	this.show = function () {
		fill(0, 255, 0), stroke(50);
		rect(this.x, this.y, sizes, sizes);
		this.olds[0].unshift(this.x), this.olds[1].unshift(this.y);
		for (var i = 0; i < this.body.length; i++) {
			rect(this.olds[0][i + 1], this.olds[1][i + 1], sizes, sizes);
		}
	};

	this.check = function () {
		if (this.x < 0 || this.y < 0 || this.x >= width || this.y >= height)
			this.death("Out of bounds");
		for (var i = 0; i < this.body.length; i++) {
			if (this.olds[0][i + 1] === this.x && this.olds[1][i + 1] === this.y)
				this.death("Killed in action");
		}
	}

	this.death = function (reason) {
		alert(reason);
		noLoop();
		this.sumbitdata();
	}

	this.sumbitdata = function () {
		var data = {
			name: person,
			score: scr
		};
		highscores.push(data, this.finished);
		if (scr > localStorage.getItem("highscore"))
	 		(localStorage.setItem("highscore", scr), localStorage.setItem("name", person));
	}
	
	this.finished = function(error) {
		error ? console.log('ooops') : console.log('data saved!');
	}
}