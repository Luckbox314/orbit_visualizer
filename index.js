var planet1_image = new Image();
planet1_image.src = "sprites/p1.svg";
var planet2_image = new Image();
planet2_image.src = "sprites/p2.svg";
var MASS_SIZE_RATIO = 50;
var OBJECTIVE_ORBITAL_PERIOD = 5;
var GRAVITATIONAL_CONSTANT = 1;
var AREA_STEPS = 360;
var OrbitVisualizer = /** @class */ (function () {
    function OrbitVisualizer() {
        var _this = this;
        console.log("Initializing App");
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 1000;
        this.canvas.height = 1000;
        var ctx = canvas.getContext("2d");
        this.ctx = ctx;
        // planets
        this.planet1 = {
            mass: 0.5,
            img: planet1_image,
            position: { x: 0, y: 0 }
        };
        this.planet2 = {
            mass: 0.5,
            img: planet2_image
        };
        // initial conditions
        this.barycenter = { x: 500, y: 500 };
        this.timeSpeed = 60;
        this.excentricity = 0.75;
        this.semiMajorAxis = 200;
        this.areas = Array();
        this.angles_sample = Array();
        for (var i = 0; i < 360; i++) {
            this.angles_sample.push(degrees_to_radians(i));
        }
        this.angles_sample.forEach(function (angle) {
            _this.areas.push(_this.A(angle));
        });
        console.log(this.angles_sample);
        console.log(this.areas);
        this.area = Math.pow(this.semiMajorAxis, 2) * Math.sqrt(1 - Math.pow(this.excentricity, 2)) * Math.PI;
        console.log(this.area);
        this.area_progress = 0;
        // start animation
        this.time = Date.now();
        this.frame = 0;
        console.log("initializing animation Loop");
        this.animationLoop();
    }
    OrbitVisualizer.prototype.drawPlanet = function (planet) {
        this.ctx.drawImage(planet.img, planet.position.x - planet.mass * MASS_SIZE_RATIO / 2, planet.position.y - planet.mass * MASS_SIZE_RATIO / 2, planet.mass * MASS_SIZE_RATIO, planet.mass * MASS_SIZE_RATIO);
    };
    OrbitVisualizer.prototype.simulation = function (dt) {
        // console.log("simulation")
        // sets the position of the planets acording to the excentricity and semi major axis
        this.frame += dt;
        if (this.frame >= 1 / this.timeSpeed) {
            this.frame = 0;
            var angle = this.angle(this.area_progress);
            this.area_progress += this.area / AREA_STEPS;
            if (this.area_progress > this.area)
                this.area_progress = 0;
            var new_pos1 = { x: 0, y: 0 };
            new_pos1.x = this.barycenter.x + this.r((angle)) * Math.cos((angle));
            new_pos1.y = this.barycenter.y + this.r((angle)) * Math.sin((angle));
            // console.log(angle);
            this.planet1.position = new_pos1;
        }
    };
    OrbitVisualizer.prototype.A = function (angle) {
        var a = this.semiMajorAxis;
        var b = this.excentricity;
        var x = angle;
        // integration of the polar equation of the ellipse (To calculate the area of the ellipse given an angle)
        var value = (Math.pow(a, 2) * (Math.pow(b, 3) - b) * Math.sin(x)) / (2 * b * Math.cos(x) + 2) + Math.pow(a, 2) * Math.sqrt(1 - b) * Math.sqrt(b + 1) * Math.atan((Math.sqrt(1 - b) * Math.tan(x / 2)) / Math.sqrt(b + 1));
        if (x > Math.PI) {
            value += 2 * this.A(Math.PI);
        }
        return value;
    };
    OrbitVisualizer.prototype.angle = function (A) {
        for (var i = 0; i < this.areas.length - 1; i++) {
            if (A >= this.areas[i]) {
                return degrees_to_radians((A - this.areas[i]) / (this.areas[i + 1] - this.areas[i]) + i);
            }
        }
    };
    OrbitVisualizer.prototype.r = function (angle) {
        var a = this.semiMajorAxis;
        var b = this.excentricity;
        var x = angle;
        return a * (1 - Math.pow(b, 2)) / (1 + b * Math.cos(x));
    };
    OrbitVisualizer.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawPlanet(this.planet1);
        // this.drawPlanet(this.planet2);
        // draw bari center
        this.ctx.beginPath();
        this.ctx.arc(this.barycenter.x, this.barycenter.y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();
        var foci1 = { x: this.barycenter.x, y: this.barycenter.y };
        var foci2 = { x: this.barycenter.x - 2 * this.semiMajorAxis * this.excentricity, y: this.barycenter.y };
        var center1 = { x: this.barycenter.x - this.semiMajorAxis * this.excentricity, y: this.barycenter.y };
        var a = this.semiMajorAxis;
        var b = this.semiMajorAxis * Math.sqrt(1 - this.excentricity * this.excentricity);
        this.ctx.beginPath();
        this.ctx.arc(foci1.x, foci1.y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(foci2.x, foci2.y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.ellipse(center1.x, center1.y, a, b, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    };
    OrbitVisualizer.prototype.animationLoop = function () {
        var _this = this;
        var now = Date.now();
        var dt = (now - this.time) / 1000;
        this.time = now;
        this.simulation(dt);
        this.draw();
        window.requestAnimationFrame(function () { return _this.animationLoop(); });
    };
    OrbitVisualizer.prototype.update = function () {
    };
    return OrbitVisualizer;
}());
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
function radians_to_degrees(radians) {
    return radians * 180 / Math.PI;
}
//wait for planets to load
planet1_image.onload = function () {
    return planet2_image.onload = function () {
        return new OrbitVisualizer();
    };
};
//# sourceMappingURL=index.js.map