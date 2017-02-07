import Constants from "../utils/constants.js";

export default class Grid {
    constructor(blockSize) {
        this.blocks = [];
        this.blockSize = blockSize;
        this.rows = Math.ceil((Constants.SCREEN_HEIGHT / this.blockSize));
        this.columns = Math.ceil((Constants.SCREEN_WIDTH  / this.blockSize));
        this.gap = 0.5;
    }
    
    generateBlocks() {
        let startX = 0;
        let startY = 0;
        let index = 0;
        
        for(let row = 0; row < this.rows; row++) {
            let newRow = [];
            
            for(let col = 0; col < this.columns; col++) {
                
                let block = {
                    x: startX,
                    y: startY,
                    occupied: false,
                    index: index++
                };
                
                startX = startX + this.blockSize;
                newRow.push(block);
            } 
            
            this.blocks.push(newRow);
            startY = startY + this.blockSize;
            startX = 0;
        }
        return this.blocks;
    }
    
    getRandomBlock() {
        let rows = this.rows - 1;
        let columns = this.columns - 1;
        
        let x = Math.ceil(Math.random() * rows);
        let y = Math.ceil(Math.random() * columns);
        
        return this.blocks[x][y];
    }
    
    draw() {
        //grid context
        let blocks = this.blocks.length == 0 ? this.generateBlocks() : this.blocks;
        let size = this.blockSize;
        let gap = this.gap;
        
        function drawRow(row, ctx) {
            for(let i = 0; i < row.length; i++) {
                ctx.strokeStyle = "#444";
                ctx.strokeRect(row[i].x + gap, row[i].y + gap, size, size);
            }
        }
        
        //applying canvas context
        return function() {
            let rows = blocks.length;
            for(let i = 0; i < rows; i++) {
                drawRow(blocks[i], this); 
            }
        }
    }
}