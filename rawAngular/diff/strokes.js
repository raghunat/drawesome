import {canvas}
// Contains JS class with methods to store, diff, and recognize
//   user interaction events with a canvas
class Strokes {
  allStrokes = [];

  // Recognize interactions
  static getDraw() {
    // Store stroke as JSON object
    var stroke = {
      color: "",
      tool: "",
      movementData: []
    };
    // Get color

    // Get tool/width
    // Get movement data (addClick(offsetLeft, offsetTop))
    return stroke;
  };

  // Be able to interpret interactions and export/store them
  static storeDraw(stroke) {
    // Push stroke to allStrokes
    allStrokes.push(stroke);

    // Save array of strokes locally
  };

  // For test purposes, make them repeat on separate canvas
  static redraw() {
    let canvas = document.querySelector('#canvas');
    let context = canvas.getContext('2d');
    // On canvas, run strokes one object at a time
    // Strokes should run right after stroke is drawn
    //  not all at same time
  };
};


Strokes.storeDraw({

});
Strokes.storeDraw({

});
Strokes.storeDraw({

});
Strokes.redraw();
