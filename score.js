function Score() {
    this.x = Math.floor((20 * Math.floor(Math.random() * 25)) / 20) * 20;
    this.y = Math.floor((20 * Math.floor(Math.random() * 25)) / 20) * 20;

    this.show = function () {
        fill(255, 0, 0);
        stroke(50);
        rect(this.x, this.y, sizes, sizes);
    }

    this.move = function () {
        this.x = Math.floor((20 * Math.floor(Math.random() * 25)) / 20) * 20;
        this.y = Math.floor((20 * Math.floor(Math.random() * 25)) / 20) * 20;
    }
}
