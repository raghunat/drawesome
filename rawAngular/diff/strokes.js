import {canvas}
// Contains JS class with methods to store, diff, and recognize
//   user interaction events with a canvas
class Strokes {
  allStrokes = [];

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

  // For test purposes, make them repeat on separate canvas
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
