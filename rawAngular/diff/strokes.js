// Contains JS class with methods to store, diff, and recognize
//   user interaction events with a canvas
class Strokes {

  constructor() {
    // Store all strokes locally within a JSON object
      var strokeData = {};
  };

  // Recognize interactions
  getDraw() {
    // Store stroke as JSON object
    var stroke = {
      color: "",
      tool: "",
      startPosition: "",
      movementData: ""
    };
    // Get color
    // Get tool/width
    // Get Start position (offsetLeft, offsetTop)
    // Get movement data (addClick(offsetLeft, offsetTop))
    return stroke;
  };

  // Be able to interpret interactions and export/store them
  storeDraw(stroke) {
    // Push stroke to allStrokes
    allStrokes += JSON.stringify(stroke);

    // Save array of strokes locally
  };

  // For test purposes, make them repeat on separate canvas
  replicateDraw(stroke) {
    // On canvas, run strokes one object at a time
    // Strokes should run right after stroke is drawn
    //  not all at same time

  };
};
