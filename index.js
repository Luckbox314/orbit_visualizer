var planet1_image = new Image();
planet1_image.src = "sprites/p1.svg";
var planet2_image = new Image();
planet2_image.src = "sprites/p2.svg";
var MASS_SIZE_RATIO = 400;
var OBJECTIVE_ORBITAL_PERIOD = 5;
var GRAVITATIONAL_CONSTANT = 1;
var AREA_STEPS = 200;
var SPEED = 60;
var OrbitVisualizer = /** @class */ (function () {
    // private debugCanvas: HTMLCanvasElement;
    // private debugCtx: CanvasRenderingContext2D;
    // private iteration: number;
    function OrbitVisualizer() {
        this.cachePos = { x: 0, y: 0 };
        this.cachePos2 = { x: 0, y: 0 };
        console.log("Initializing App");
        this.canvas = document.getElementById('canvas');
        this.setSize(1500);
        var ctx = this.canvas.getContext("2d");
        this.ctx = ctx;
        this.ctx.lineWidth = 6;
        this.orbitColor = "#625d80";
        this.baricenterColor = "#9acea4";
        // this.debugCanvas = document.getElementById('debug-canvas') as HTMLCanvasElement;
        // this.debugCtx = this.debugCanvas.getContext("2d");
        // planets
        this.planet1 = {
            mass: 50,
            img: planet1_image,
            position: { x: 0, y: 0 }
        };
        this.planet2 = {
            mass: 50,
            img: planet2_image,
            position: { x: 0, y: 0 }
        };
        // initial conditions
        this.angles_sample = Array();
        for (var i = 0; i <= AREA_STEPS; i++) {
            this.angles_sample.push(degrees_to_radians(i * 360 / AREA_STEPS));
        }
        this.setParameters(0.5, 230);
        // console.log(this.area);
        this.progress = 0;
        // start animation
        this.time = Date.now();
        this.frame = 0;
        // console.log("initializing animation Loop");
        this.lastArea = 0;
        this.animationLoop();
    }
    OrbitVisualizer.prototype.setParameters = function (excentricity, semiMajorAxis) {
        var _this = this;
        this.excentricity = excentricity;
        this.semiMajorAxis = semiMajorAxis;
        this.area = Math.round(Math.pow(this.semiMajorAxis, 2) * Math.sqrt(1 - Math.pow(this.excentricity, 2)) * Math.PI);
        this.areas = Array();
        this.angles_sample.forEach(function (angle) {
            _this.areas.push(_this.A(angle));
        });
        var semiMajorAxisGeneral = this.semiMajorAxis + this.semiMajorAxis * this.planet1.mass / this.planet2.mass;
        this.timeSpeed = SPEED / (Math.pow((semiMajorAxisGeneral / 460), 1.5));
        // console.log(this.timeSpeed);
        // console.log(this.areas);
    };
    OrbitVisualizer.prototype.drawPlanet = function (planet) {
        var radious = 1 + Math.pow(planet.mass * MASS_SIZE_RATIO, 1 / 3);
        this.ctx.drawImage(planet.img, planet.position.x - radious, planet.position.y - radious, 2 * radious, 2 * radious);
    };
    OrbitVisualizer.prototype.simulation = function (dt) {
        // console.log("simulation")
        // sets the position of the planets acording to the excentricity and semi major axis
        // console.log(`step: ${ (1/this.timeSpeed) / (this.semiMajorAxis / 460)** 1.5 }`)
        this.frame += dt;
        var semiMajorAxisGeneral = this.semiMajorAxis + this.semiMajorAxis * this.planet1.mass / this.planet2.mass;
        if (this.cachePos.x == 0 && this.cachePos.y == 0) {
            // Calculating next frame;
            var angle = this.angle(this.progress / 100 * this.area);
            this.progress += 100 / AREA_STEPS / Math.pow((semiMajorAxisGeneral / 460), 1.5);
            if (this.progress >= 100)
                this.progress = 0;
            this.cachePos.x = this.barycenter.x + this.r((angle)) * Math.cos((angle));
            this.cachePos.y = this.barycenter.y + this.r((angle)) * Math.sin((angle));
            this.cachePos2.x = this.barycenter.x - this.r((angle)) * this.planet1.mass / this.planet2.mass * Math.cos((angle));
            this.cachePos2.y = this.barycenter.y - this.r((angle)) * this.planet1.mass / this.planet2.mass * Math.sin((angle));
        }
        if (this.frame >= (1 / this.timeSpeed) / Math.pow((semiMajorAxisGeneral / 460), 1.5)) {
            // console.log(`Iteration: ${this.iteration++} Area: ${this.area_progress}`)
            this.frame = 0;
            if (this.cachePos.x == 0 && this.cachePos.y == 0) {
                // Calculating next frame;
                var angle = this.angle(this.progress / 100 * this.area);
                this.progress += 100 / AREA_STEPS / Math.pow((semiMajorAxisGeneral / 460), 1.5);
                if (this.progress >= 100)
                    this.progress = 0;
                this.cachePos.x = this.barycenter.x + this.r((angle)) * Math.cos((angle));
                this.cachePos.y = this.barycenter.y + this.r((angle)) * Math.sin((angle));
                this.cachePos2.x = this.barycenter.x - this.r((angle)) * this.planet1.mass / this.planet2.mass * Math.cos((angle));
                this.cachePos2.y = this.barycenter.y - this.r((angle)) * this.planet1.mass / this.planet2.mass * Math.sin((angle));
            }
            // console.log(`Angle: ${angle}`);
            this.planet1.position.x = this.cachePos.x;
            this.planet1.position.y = this.cachePos.y;
            this.planet2.position.x = this.cachePos2.x;
            this.planet2.position.y = this.cachePos2.y;
            this.cachePos.x = 0;
            this.cachePos.y = 0;
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
        // aproximation of the value
        return Math.round(value);
    };
    OrbitVisualizer.prototype.angle = function (A) {
        var i = this.lastArea;
        if (A > this.area) {
            A = A % this.area;
        }
        if (i >= AREA_STEPS - 1)
            i = 0;
        if (i > 0 || A < this.area[i - 1])
            i = 0;
        while (A >= this.areas[i]) {
            i++;
        }
        this.lastArea = i;
        var angle = ((A - this.areas[i - 1]) / (this.areas[i] - this.areas[i - 1]) + i - 1) / (AREA_STEPS) * 360;
        // console.log(`A: ${A} i: ${i} area[i]: ${this.areas[i]} area[i-1]: ${this.areas[i-1]} angle: ${angle}`);
        return degrees_to_radians(angle);
    };
    OrbitVisualizer.prototype.r = function (angle) {
        var a = this.semiMajorAxis;
        var b = this.excentricity;
        var x = angle;
        return a * (1 - Math.pow(b, 2)) / (1 + b * Math.cos(x));
    };
    OrbitVisualizer.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw bari center
        this.ctx.strokeStyle = this.baricenterColor;
        this.ctx.fillStyle = this.baricenterColor;
        this.ctx.beginPath();
        this.ctx.arc(this.barycenter.x, this.barycenter.y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.strokeStyle = this.orbitColor;
        this.ctx.fillStyle = this.orbitColor;
        var center1 = { x: this.barycenter.x - this.semiMajorAxis * this.excentricity, y: this.barycenter.y };
        var semiMajorAxis2 = this.semiMajorAxis * this.planet1.mass / this.planet2.mass;
        var center2 = { x: this.barycenter.x + semiMajorAxis2 * this.excentricity, y: this.barycenter.y };
        var a = this.semiMajorAxis;
        var b = this.semiMajorAxis * Math.sqrt(1 - this.excentricity * this.excentricity);
        var a2 = semiMajorAxis2;
        var b2 = semiMajorAxis2 * Math.sqrt(1 - this.excentricity * this.excentricity);
        this.ctx.beginPath();
        this.ctx.ellipse(center1.x, center1.y, a, b, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse(center2.x, center2.y, a2, b2, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.drawPlanet(this.planet1);
        this.drawPlanet(this.planet2);
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
    // private graph(data: Array<number>) {
    //     console.log("graphing");
    //     let max = Math.max(...data);
    //     for (let i = 0; i < data.length; i++) {
    //         let x = i * this.debugCanvas.width / data.length;
    //         let y = this.debugCanvas.height - data[i] / max * this.debugCanvas.height;
    //         let w = this.debugCanvas.width / data.length;
    //         let h = data[i] / max * this.debugCanvas.height;
    //         this.debugCtx.beginPath();
    //         this.debugCtx.rect(x, y, w, h);
    //         this.debugCtx.fill();
    //         this.debugCtx.stroke();
    //     }
    // }
    OrbitVisualizer.prototype.setMassRatio = function (massRatio) {
        this.planet1.mass = 50 + massRatio;
        this.planet2.mass = 50 - massRatio;
        var semiMajorAxisGeneral = this.semiMajorAxis + this.semiMajorAxis * this.planet1.mass / this.planet2.mass;
        this.timeSpeed = SPEED / (Math.pow((semiMajorAxisGeneral / 460), 1.5));
    };
    OrbitVisualizer.prototype.setExcentricity = function (excentricity) {
        this.setParameters(excentricity, this.semiMajorAxis);
    };
    OrbitVisualizer.prototype.setSemiMajorAxis = function (semiMajorAxis) {
        this.setParameters(this.excentricity, semiMajorAxis);
    };
    OrbitVisualizer.prototype.setSize = function (size) {
        this.canvas.width = size;
        this.canvas.height = size * 3 / 4;
        this.barycenter = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
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
function distance(a, b) {
    return Math.sqrt(Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2));
}
function main() {
    var orbitVisualizer = new OrbitVisualizer();
    var massSlider = document.getElementById("mass-slider");
    var massDisplay = document.getElementById("mass-display");
    massSlider.oninput = function () {
        var mass = parseFloat(massSlider.value);
        orbitVisualizer.setMassRatio(mass);
        var ration1 = 1;
        var ration2 = (50 - mass) / (50 + mass);
        massDisplay.innerText = ration1 + " : " + ration2.toFixed(2);
    };
    var excentricitySlider = document.getElementById("excentricity-slider");
    var excentricityDisplay = document.getElementById("excentricity-display");
    excentricitySlider.oninput = function () {
        var excentricity = parseFloat(excentricitySlider.value);
        orbitVisualizer.setExcentricity(excentricity);
        excentricityDisplay.innerText = excentricity.toFixed(2);
    };
    var semiMajorAxisSlider = document.getElementById("semimajor-slider");
    var semiMayorAxisDisplay = document.getElementById("semimajor-display");
    semiMajorAxisSlider.oninput = function () {
        var semiMajorAxis = parseFloat(semiMajorAxisSlider.value);
        orbitVisualizer.setSemiMajorAxis(semiMajorAxis);
        semiMayorAxisDisplay.innerText = semiMajorAxis.toFixed();
    };
}
window.addEventListener("load", function () { console.log("loaded"); main(); });
//# sourceMappingURL=index.js.map