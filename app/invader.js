import Constants from '../utils/constants';

const path = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]];

export default class Invader {
    
    constructor(pos, size) {
        this.x = pos.x;
        this.y = pos.y;
        this.size = size;
        this.isOffScreen = false;
        this.generatePoints();
    }
    
    generatePoints() {
        this.points = [];
        let point1 = {x: this.x, y: this.y};
        let point2 = {x: this.x + this.size / 2, y: this.y - this.size / 2};
        let point3 = {x: this.x + this.size, y: this.y};
        let point4 = {x: point3.x - this.size / 6, y: point3.y + this.size / 6};
        let point5 = {x: point4.x - this.size / 6, y: point4.y - this.size / 6};
        let point6 = {x: point5.x - this.size / 6, y: point5.y + this.size / 6};
        let point7 = {x: point6.x - this.size / 6, y: point6.y - this.size / 6};
        let point8 = {x: point7.x - this.size / 6, y: point7.y + this.size / 6};
        this.points.push(point1, point2, point3, point4, point5, point6, point7, point8);
    }
    
    update() {
        this.y -= 0.5;
        if(this.y < 0) {
            this.isOffScreen = true;    
        }
        else
            this.generatePoints();
    }
    
    draw() {

        let points = this.points.length > 0 ? this.points : this.generatePoints();
        function drawHandler(line) {
            let [point1, point2] = line;

            this.beginPath();
            this.strokeStyle = "rgba(30, 220, 10, 1)";
            this.moveTo(points[point1].x, points[point1].y);
            this.lineTo(points[point2].x, points[point2].y);
            this.closePath();
            this.stroke();
        }
        
        return function() {
            let dh = drawHandler.bind(this);
            for(let i = 0; i < path.length; i++) {
                dh(path[i]);
            }
        }
    }
}