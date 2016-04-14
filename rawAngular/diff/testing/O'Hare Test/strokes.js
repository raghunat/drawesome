class StrokeManager {

    constructor() {
        this.started = false;
        this.currentStrokeEvents = [];
        this.allStrokes = []
    }

    startStroke() {
        this.started = true;
        this.currentStrokeEvents = {
          color: event.curColor,
          tool: event.curTool,
          positions: [{x: event.clientX, y: event.clientY}]
        };
        console.log(event);
    }

    updateStroke(event) {
        if (this.started) {
            this.currentStrokeEvents.positions.push({x: event.clientX, y: event.clientY});
        }
    }

    endStroke() {
      this.started = false;
      if (this.allStrokes == null) {
        this.allStrokes = [this.currentStrokeEvents];
      } else {
      this.allStrokes.push(this.currentStrokeEvents);
      }
      console.log(this.currentStrokeEvents);
      console.log(this.allStrokes);
    }
}
