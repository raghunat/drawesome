// TODO
//  May need to include canvas file for color and tool (if just doing strokes,
//    will need to change code to just get strokes themselves)
// Contains JS class with methods to store, diff, and recognize
//   user interaction events with a canvas
class Strokes {
  // Array of all JSON stroke data
  allStrokes = [];

  // Function to interpret stroke data for other functions to user
  static getStroke() {
    // Stroke in JSON format
    var stroke = {
      color: "",
      tool: "",
      movementData: []
    };
    //******If just using "screen" for input, need to change querySelector and
    //******  variables using mouse methods
    // Get canvas for input
    var canvas = document.querySelector('#canvas');
    // Mouse position variables
    var mouseX, mouseY,
    dragging = false;

    //When the mouse is clicked
    canvas.mousedown(function(e){
      stroke.color = curColor;
      stroke.tool = curTool;
      mouseX = e.pageX - this.offsetLeft;
      mouseY = e.pageY - this.offsetTop;

      stroke.movementData.push(mouseX,mouseY);
      dragging = true;
    });

    //Records drawing when mouse is held
    canvas.mousemove(function(e){
      if(dragging){
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;
        stroke.movementData.push(mouseX,mouseY);
      }
    });

    //When mouse is unclicked
    canvas.mouseup(function(e){
      dragging = false;
    });

    //When mouse leaves the canvas
    canvas.mouseleave(function(e){
      dragging = false;
    });
  }

  // Check to see if stroke is already in array, if not add it to array
  static storeStroke(stroke) {
    let newStroke = Strokes.allStrokes.find(s => {
      if (s.color !== stroke.color || s.tool !== stroke.tool) {
        return false;
      }
      let found = false;
      for (var i = 0; i < s.stroke.movementData.length; i++) {
        let dataPoint[0] = s.stroke.movementData[i];
        if (dataPoint[0] === stroke.movementData[i][0] && dataPoint[1] === stroke.movementData[i][1]) {
          continue;
        } else {
          found = false;
          break;
        }
      }
      if (!found) {
        return s;
      }
    });

    if (newStroke) {
      Strokes.allStrokes.push(newStroke);
    }
  }

  // Draw all strokes on canvas
  static redraw() {
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    // Get stroke object properties


    // On canvas, run strokes one object at a time
    // Strokes should run right after stroke is drawn
    //  not all at same time
  };
}

Strokes.storeDraw({

});
Strokes.storeDraw({

});
Strokes.storeDraw({

});
Strokes.redraw();
