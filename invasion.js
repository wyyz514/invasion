import Constants from './utils/constants';
import Grid from './app/grid';
import Invader from './app/invader';
import "./css/style.css";

const root = document.getElementById("root");
const canvas = document.createElement("canvas");
canvas.height = Constants.SCREEN_HEIGHT;
canvas.width = Constants.SCREEN_WIDTH;
const ctx = canvas.getContext("2d");
root.appendChild(canvas);

function loop(fn) {
    window.webkitRequestAnimationFrame(fn);
}
    
export default class Invasion {
    constructor() {
        this.grid = new Grid(20);
        this.grid.generateBlocks();
        this.invaders = [];
        this.createInvaders();
    }
    
    clear() {
        ctx.clearRect(0, 0, Constants.SCREEN_WIDTH, Constants.SCREEN_HEIGHT);
    }
    
    createInvaders() {
        for(let i = 0; i < 150; i++) {
            let coords = this.grid.getRandomBlock();
            let invader = new Invader(coords, 20);
            this.invaders.push(invader);
        }    
    }
    
    createInvader() {
        let coords = this.grid.getRandomBlock();
        let invader = new Invader({x: coords.x, y: Constants.SCREEN_HEIGHT}, 20);
        this.invaders.push(invader);
    }
    
    drawGrid() {
        let gridDrawable = this.grid.draw();
        gridDrawable.apply(ctx);
    }
    
    drawInvaders() {
        for(let i = 0; i < this.invaders.length; i++) {
            let invaderDrawable = this.invaders[i].draw();
            invaderDrawable.apply(ctx);
        }
    }
    
    updateInvaders() {
        for(let i = 0; i < this.invaders.length; i++) {
            if(this.invaders[i].isOffScreen) {
                this.invaders.splice(i, 1);
                this.createInvader();        
            }
            else {
                this.invaders[i].update();
            }
        }  
    }
    
    draw() {
        this.clear();
        this.drawGrid();
        this.updateInvaders();
        this.drawInvaders();
        loop(this.draw.bind(this))
    }
}

let invasion = new Invasion();
invasion.draw();

