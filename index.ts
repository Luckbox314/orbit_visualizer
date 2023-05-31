const planet1_image = new Image();
planet1_image.src = "sprites/p1.svg";
const planet2_image = new Image();
planet2_image.src = "sprites/p2.svg";

const MASS_SIZE_RATIO = 50;
const OBJECTIVE_ORBITAL_PERIOD = 5;
const GRAVITATIONAL_CONSTANT = 1;


interface Planet {
    mass: number;
    position?: {x: number, y: number};
    img : HTMLImageElement;
}


class OrbitVisualizer {
    private ctx: CanvasRenderingContext2D;
    private planet1: Planet;
    private planet2: Planet;
    private timeSpeed: number;
    private excentricity: number;
    private semiMajorAxis: number;
    private time: number;
    private barycenter: {x: number, y: number};

    constructor() {
        console.log("Initializing App");

        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        canvas.width = 500;
        canvas.height = 500;
        let ctx = canvas.getContext("2d");
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
        this.barycenter = {x: 250, y: 250};
        this.timeSpeed = 1;
        this.excentricity = 0.5;
        this.semiMajorAxis = 100;

        // start animation
        this.time = Date.now();
        this.animationLoop();
    }

    private drawPlanet(planet: Planet) {
        this.ctx.drawImage(
            planet.img,
            planet.position.x - planet.mass * MASS_SIZE_RATIO / 2,
            planet.position.y - planet.mass * MASS_SIZE_RATIO / 2,
            planet.mass * MASS_SIZE_RATIO,
            planet.mass * MASS_SIZE_RATIO
        );
    }

    private simulation(dt: number) {
        // sets the position of the planets acording to the excentricity and semi major axis
        
    }

    private draw() {
        this.ctx.clearRect(0, 0, 500, 500);
        this.drawPlanet(this.planet1);
        this.drawPlanet(this.planet2);
        // draw bari center
        this.ctx.beginPath();
        this.ctx.arc(this.barycenter.x, this.barycenter.y, 5, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    private animationLoop() {
        let now = Date.now();
        let dt = (now - this.time) / 1000;
        this.time = now;
        this.simulation(dt);
        // this.draw();
        window.requestAnimationFrame(() => this.animationLoop());
    }

}


//wait for planets to load
planet1_image.onload = () =>
planet2_image.onload = () =>
new OrbitVisualizer();