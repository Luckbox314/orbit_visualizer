var OrbitVisualizer = /** @class */ (function () {
    function OrbitVisualizer() {
        console.log("Initializing App");
        var canvas = document.getElementById('canvas');
        canvas.width = 500;
        canvas.height = 500;
        var ctx = canvas.getContext("2d");
        this.ctx = ctx;
        this.planet1 = {
            mass: 1,
            position: {
                x: 250,
                y: 250
            }
        };
        this.planet2 = {
            mass: 1,
            position: {
                x: 350,
                y: 250
            }
        };
        this.Simulation();
    }
    OrbitVisualizer.prototype.drawPlanet = function (planet) {
        this.ctx.beginPath();
        this.ctx.arc(planet.position.x, planet.position.y, planet.mass * 10, 0, 2 * Math.PI);
        this.ctx.stroke();
    };
    OrbitVisualizer.prototype.Simulation = function () {
        this.drawPlanet(this.planet1);
        this.drawPlanet(this.planet2);
    };
    return OrbitVisualizer;
}());
new OrbitVisualizer();
//# sourceMappingURL=index.js.map