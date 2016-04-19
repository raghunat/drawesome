class StrokeManager {

  constructor() {
      this.continue = false;
      this.returnResults = false;
      this.currentStrokeEvents = [];
      this.allStrokes = []
  }

  startStroke() {
    if (event.target.id === 'canvas') {
      this.continue = true;
      this.returnResults = true;
      this.currentStrokeEvents = {
        color: returnColor,
        tool: event.curTool,
        positions: [{x: event.clientX, y: event.clientY}]
      };
    }
  }

  updateStroke(event) {
      if (event.target.id !== 'canvas') {
        console.log('OFF CANVAS');
        this.continue = false;
      }
      if (this.continue) {
        console.log('RECORDING');
        this.currentStrokeEvents.positions.push({x: event.clientX, y: event.clientY});
      }
  }

  endStroke() {
    if (this.continue || this.returnResults){
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
    }
  }
}
