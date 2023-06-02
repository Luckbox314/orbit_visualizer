var STAR_DENCIETY = 2000; // 1 star per 1000 square pixels
var StarDrawer = /** @class */ (function () {
    function StarDrawer() {
        this.stars = [];
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.canvas.style.position = "absolute";
        this.canvas.style.zIndex = "-1";
        this.drawStars();
    }
    StarDrawer.prototype.drawStars = function () {
        var _this = this;
        this.generateStars();
        this.stars.forEach(function (star) {
            star.draw(_this.ctx);
        });
    };
    StarDrawer.prototype.resize = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars = [];
        this.drawStars();
    };
    StarDrawer.prototype.generateStars = function () {
        for (var i = 0; i < this.canvas.height * this.canvas.width / STAR_DENCIETY; i++) {
            this.stars.push(new Star());
        }
    };
    return StarDrawer;
}());
var Star = /** @class */ (function () {
    function Star() {
        // generate star
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1;
        this.color = "#ffffff";
    }
    Star.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
    return Star;
}());
var starDrawer = new StarDrawer();
var width = window.innerWidth;
window.onload = function () {
    starDrawer.resize();
};
window.onresize = function () {
    if (width == window.innerWidth)
        return;
    width = window.innerWidth;
    starDrawer.resize();
};
//# sourceMappingURL=stars.js.map