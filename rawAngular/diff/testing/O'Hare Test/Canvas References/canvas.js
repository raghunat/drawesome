var canvas = angular.module('directivesModule', []);

// 0.8.1: ERRORS FIXED:
// When "Clear" is clicked on the canvas, the clickColor array is redeclared
// as a near-empty array, with "CLEARED" being its only memeber. Now, when addClick
// is called, an if statement checks to see if clickColor[0] == "CLEARED". If
// it does, i (the variable used on line 93 to give returnColor a value, which
// is used in strokes.js) is set to 1. This makes sure that i is always set to
// the correct value, even if "Clear" is clicked on the canvas (this was previously
// causing an error where clickColor was reset but i was not, resulting in returnColor
// becoming undefined)

// 0.7: ERRORS FIXED:
// For whatever reason, I had to declare a separate variable outside of the
// controller to store the color because whatever I did inside the controller
// wasn't transferring properly to strokes.js
// See lines 81 and 82 for the code implementation

var returnColor = undefined;
var returnTool = undefined;
var i = 0;

canvas.controller('canvasController', ['$scope', function ($scope) {
  var canvasWidth = 500;
  var canvasHeight = 500;

  //Colors
  var colorRed = "#FF0000";
  var colorBlue = "#4033FF";
  var colorYellow = "#ffcf33";
  var colorGreen = "#397D02";
  var colorErase = "#FFFFFF";

  var curColor = colorGreen;
  var clickColor = new Array();

  var clickTool = new Array();
  var curTool = "crayon";

  var canvasDiv = document.getElementById('canvasDiv');
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas');
  canvasDiv.appendChild(canvas);
  if(typeof G_vmlCanvasManager != 'undefined'){
          canvas = G_vmlCanvasManager.initElement(canvas);
  }
  context = canvas.getContext("2d");

  //When the mouse is clicked
  $('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  //Records drawing when mouse is held
  $('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  //When mouse is unclicked
  $('#canvas').mouseup(function(e){
    paint = false;
  });

  //When mouse off the paper
  $('#canvas').mouseleave(function(e){
    paint = false;
  });
  // clear


  //Saving "CLICK"
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var paint;

  function addClick(x,y,dragging)
  {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
    clickTool.push(curTool);
    if (clickColor[0] == "CLEARED")
    {
      i = 1;
    }
    returnColor = clickColor[i];
    // returnTool = clickTool[i];  TOOLS DON'T EXIST YET
    i++;
  }

  //Event listeners for html buttons
  document.getElementById("clearCanvas").addEventListener("click", clearSetUp);
  document.getElementById("redColor").addEventListener("click", function(){changeColor(colorRed)});
  document.getElementById("blueColor").addEventListener("click", function(){changeColor(colorBlue)});
  document.getElementById("yellowColor").addEventListener("click", function(){changeColor(colorYellow)});
  document.getElementById("greenColor").addEventListener("click", function(){changeColor(colorGreen)});
  document.getElementById("eraseColor").addEventListener("click", function(){changeColor(colorErase)});

  //Drawing function
      //Canvas clear
  function clearSetUp(){
    clickX = new Array();
  		clickY = new Array();
  		clickDrag = new Array();
      clickDrag = new Array();
      clickColor = new Array("CLEARED");
  		clearCanvas();
  }

  function clearCanvas()
  {
  	context.clearRect(0, 0, canvasWidth, canvasHeight);
  }


  function changeColor(color){
    curColor = color;
  }

  function redraw(){
    context.clearRect(0,0, context.canvas.width, context.canvas.height);

    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i = 0; i < clickX.length; i++){
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
      }else{
        context.moveTo(clickX[i]-1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.strokeStyle = clickColor[i];
      context.strokeStyle = clickTool[i];
      context.stroke();
    }
  }

  function downloadCanvas(link, canvasId, filename) {
      link.href = document.getElementById(canvasId).toDataURL();
      link.download = filename;
      console.log("finished");
  }

  // document.getElementById('save').addEventListener('click', function() {
  //   var imgCanvas = document.getElementById("canvas");
  //   imgCanvas.width = canvas.width;
  //   imgCanvas.length = canvas.length;
  //   var imgContent = imgCanvas.getContext("2d");
  //   imgContent.getImageData(0, 0, canvasWidth, canvasHeight);
  //   imgContent.drawImage(imgCanvas, 0, 0, canvasWidth, canvasHeight);
  //   localStorage.setItem('drawStore', JSON.stringify(imgContent));
  // });
}]);
