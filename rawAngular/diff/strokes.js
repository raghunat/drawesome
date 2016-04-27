var strokesArray = []; // Full array of strokes - DOES NOT RESET when "clear" button is hit
var strokesArrayCount = 0; // Value used when looping in arrayDraw function in canvas.js
var strokePositions = [];

class StrokeManager {

  constructor() {
      this.continue = false;
      this.returnResults = false;
      this.currentStrokeEvents = [];
      this.allStrokes = []
  }

  startStroke() {
    if (event.target.id == 'canvas') {
      this.continue = true;
      this.returnResults = true;
      this.currentStrokeEvents = {
        color: returnColor,
        tool: returnTool,
        positions: [{x: event.clientX, y: event.clientY}]
      };
    } else {
      this.continue = false;
      this.returnResults = false;
      this.currentStrokeEvents = null;
    }
  }

  updateStroke() {
      if (event.target.id != 'canvas') {
        this.continue = false;
      }
      if (this.continue) {
        this.currentStrokeEvents.positions.push({x: event.clientX, y: event.clientY});
      }
  }

  endStroke() {
    strokesArrayCount++;
    if (this.returnResults){
      if (this.allStrokes == null) {
        this.allStrokes = [this.currentStrokeEvents];
      } else {
      this.allStrokes.push(this.currentStrokeEvents);
      }
      this.continue = false;
      console.log('');
      console.log('Latest Stroke: ');
      console.log(this.currentStrokeEvents);
      console.log('Array of all strokes: ')
      console.log(this.allStrokes);
      strokesArray = this.allStrokes;
    }
  }
}
