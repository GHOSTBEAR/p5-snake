function Food() {
    this.x = 20 * Math.floor(20 * Math.floor(25 * Math.random()) / 20);
    this.y = 20 * Math.floor(20 * Math.floor(25 * Math.random()) / 20);

    this.show = function () {
        fill(255, 0, 0), stroke(50);
        rect(this.x, this.y, sizes, sizes);
    };

    this.move = function () {
        this.x = 20 * Math.floor(20 * Math.floor(25 * Math.random()) / 20);
        this.y = 20 * Math.floor(20 * Math.floor(25 * Math.random()) / 20);
    }
}