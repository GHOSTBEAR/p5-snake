var body = [];
var oldx = [];
var oldy = [];

function Snake() {
    this.x = Math.floor(width / 2 / 20) * 20;
    this.y = Math.floor(height / 2 / 20) * 20;

    this.update = function (direction) {
        if (direction == 1) {
            this.x -= sizes;
        } else if (direction == 2) {
            this.y -= sizes;
        } else if (direction == 3) {
            this.x += sizes;
        } else if (direction == 4) {
            this.y += sizes;
        }
    }
    this.show = function () {
        fill(0, 255, 0);
        stroke(50);
        rect(this.x, this.y, sizes, sizes);
        oldx.unshift(this.x);
        oldy.unshift(this.y);

        for (var i = 0; i < body.length; i++) {
            rect(oldx[i + 1], oldy[i + 1], sizes, sizes);
        }
    }
    this.check = function () {
        if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
            document.getElementById("death").innerHTML = "Out of bounds!";
            noLoop();
            sumbitdata();
        }

        for (var i = 0; i < body.length; i++) {
            if (oldx[i + 1] === this.x && oldy[i + 1] === this.y) {
                document.getElementById("death").innerHTML = "Killed in Action!";
                noLoop();
                sumbitdata();
            }
        }
    }
}

function sumbitdata() {
    var data = {
        name: person,
        score: scr
    }
    highscores.push(data, finished);
    if (scr > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", scr);
        localStorage.setItem("name", person);
    }
}

function finished(error) {
    if (error) {
        console.log('ooops');
    } else {
        console.log('data saved!');
    }
}