var planet1_image = new Image();
planet1_image.src = "sprites/p1.svg";
var planet2_image = new Image();
planet2_image.src = "sprites/p2.svg";
var MASS_SIZE_RATIO = 50;
var OBJECTIVE_ORBITAL_PERIOD = 5;
var GRAVITATIONAL_CONSTANT = 1;
var OrbitVisualizer = /** @class */ (function () {
    function OrbitVisualizer() {
        console.log("Initializing App");
        var canvas = document.getElementById('canvas');
        canvas.width = 500;
        canvas.height = 500;
        var ctx = canvas.getContext("2d");
        this.ctx = ctx;
        // planets
        this.planet1 = {
            mass: 1,
            img: planet1_image
        };
        this.planet2 = {
            mass: 2,
            img: planet2_image
        };
        // initial conditions
        this.barycenter = { x: 250, y: 250 };
        this.timeSpeed = 1;
        this.excentricity = 0.5;
        this.semiMajorAxis = 100;
        // start animation
        this.time = Date.now();
        this.animationLoop();
    }
    OrbitVisualizer.prototype.drawPlanet = function (planet) {
        this.ctx.drawImage(planet.img, planet.position.x - planet.mass * MASS_SIZE_RATIO / 2, planet.position.y - planet.mass * MASS_SIZE_RATIO / 2, planet.mass * MASS_SIZE_RATIO, planet.mass * MASS_SIZE_RATIO);
    };
    OrbitVisualizer.prototype.simulation = function (dt) {
        // sets the position of the planets acording to the excentricity and semi major axis
    };
    OrbitVisualizer.prototype.draw = function () {
        this.ctx.clearRect(0, 0, 500, 500);
        this.drawPlanet(this.planet1);
        this.drawPlanet(this.planet2);
        // draw bari center
        this.ctx.beginPath();
        this.ctx.arc(this.barycenter.x, this.barycenter.y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();
    };
    OrbitVisualizer.prototype.animationLoop = function () {
        var _this = this;
        var now = Date.now();
        var dt = (now - this.time) / 1000;
        this.time = now;
        this.simulation(dt);
        // this.draw();
        window.requestAnimationFrame(function () { return _this.animationLoop(); });
    };
    return OrbitVisualizer;
}());
//wait for planets to load
planet1_image.onload = function () {
    return planet2_image.onload = function () {
        return new OrbitVisualizer();
    };
};
//# sourceMappingURL=index.js.map