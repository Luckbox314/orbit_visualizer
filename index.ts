interface Planet {
    mass: number;
    position: {x: number, y: number};
}


class OrbitVisualizer {
    private ctx: CanvasRenderingContext2D;
    private planet1: Planet;
    private planet2: Planet;

    constructor() {
        console.log("Initializing App");
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.width = 500;
        canvas.height = 500;
        let ctx = canvas.getContext("2d");
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

    private drawPlanet(planet: Planet) {
        this.ctx.beginPath();
        this.ctx.arc(planet.position.x, planet.position.y, planet.mass * 10, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    private Simulation() {
        this.drawPlanet(this.planet1);
        this.drawPlanet(this.planet2);
    }

}


new OrbitVisualizer();