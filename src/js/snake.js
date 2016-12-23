function Snake() {
    this.x = Math.floor(width / 2 / 20) * 20;
    this.y = Math.floor(height / 2 / 20) * 20;
    this.body = [];
    this.olds = [
        [],
        []
    ];

    this.update = function(dir) {
        if (dir == 1)
            this.x -= sizes;
        if (dir == 2)
            this.y -= sizes;
        if (dir == 3)
            this.x += sizes;
        if (dir == 4)
            this.y += sizes;
        this.olds[0].unshift(this.x), this.olds[1].unshift(this.y);
    };

    this.show = function() {
        // Head
        fill(0, 200, 0), stroke(50);
        rect(this.x, this.y, sizes, sizes);
        // Body
        for (var i = 0; i < this.body.length; i++) {
            fill(0, 255, 0), stroke(50);
            rect(this.olds[0][i + 1], this.olds[1][i + 1], sizes, sizes);
        }
    };

    this.check = function() {
        if (this.x < 0 || this.y < 0 || this.x >= width - 5 || this.y >= height - 5)
            this.death("Out of bounds");
        for (var i = 0; i < this.body.length; i++) {
            if (this.olds[0][i + 1] === this.x && this.olds[1][i + 1] === this.y)
                this.death("Killed in action");
        }
    }

    this.scoreinbody = function(score) {
        for (var i = 0; i < this.body.length; i++) {
            if (this.olds[0][i + 1] === score.x && this.olds[1][i + 1] === score.y)
                score.move();
        }
    }

    this.death = function(reason) {
        alert(reason);
        noLoop();
        this.sumbitdata();
    }

    this.sumbitdata = function() {
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
