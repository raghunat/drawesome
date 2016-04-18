class StrokeManager {

    constructor() {
        this.started = false;
        this.currentStrokeEvents = [];
        this.allStrokes = []
    }

    startStroke() {
        this.started = true;
        this.currentStrokeEvents = {
          color: returnColor, // changed from event.curColor to returnColor
                              // because I could not for the life of me
                              // get event.curColor to show anything but
                              // undefined
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
