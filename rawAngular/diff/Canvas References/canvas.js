// VERSION 0.1: 1. declared strokesArray[] (strokes.js) which holds all of the
                // strokes, regardless of whether the user cleared them or not
                // 2. declared strokesArrayCount (strokes.js) which is used while
                // looping in arrayDraw function in canvas.js
                // 3. added "Draw Again" button (diretive file) that's connected
                // to the "arrayDraw" function (strokes.js). This function displays
                // strokesArray[] on the console - now we have to link it to
                // a drawing function so when the Draw Again button is clicked,
                // everything in the array is automatically drawn onto the canvas

var canvas = angular.module('directivesModule', []);

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
  context.clearRect(0,0, context.canvas.width, context.canvas.height);
  context.save();

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
    returnColor = clickColor[i];
    returnTool = clickTool[i];
    i++;
  }

  //Event listeners for html buttons
  document.getElementById("clearCanvas").addEventListener("click", clearSetUp);
  document.getElementById("redColor").addEventListener("click", function(){changeColor(colorRed)});
  document.getElementById("blueColor").addEventListener("click", function(){changeColor(colorBlue)});
  document.getElementById("yellowColor").addEventListener("click", function(){changeColor(colorYellow)});
  document.getElementById("greenColor").addEventListener("click", function(){changeColor(colorGreen)});
  document.getElementById("eraseColor").addEventListener("click", function(){changeColor(colorErase)});
  document.getElementById("drawAgain").addEventListener("click", function(){arrayDraw(strokesArray)});

  //Drawing function
      //Canvas clear
  function clearSetUp(){
    clickX = new Array();
  		clickY = new Array();
  		clickDrag = new Array();
      clickDrag = new Array();
      clickColor = new Array();
      i = 0;
  		clearCanvas();
  }

  function clearCanvas()
  {
  	context.clearRect(0, 0, canvasWidth, canvasHeight);
    strokesArrayCount--;
  }


  function changeColor(color){
    curColor = color;
    console.log("color in changeColor is ", curColor);
    strokesArrayCount--;
  }

  function arrayDraw(strokesArray){
    console.log(strokesArray);
    strokesArrayCount--;
    for (var a = 0; a < strokesArray.length; a++) {
      for (var q = 0; q < strokesArray[a].length; q++)
      {
        if(q === 0) {
          addClick(strokesArray[a][q].x-8, strokesArray[a][q].y-8, true);
          context.strokeStyle = 0;
          redraw();
          context.restore();
        } else {
          addClick(strokesArray[a][q].x-8, strokesArray[a][q].y-8, true);
          redraw();
        }
      }
    }
  }

  function redraw(){
    context.restore();

    context.lineJoin = "round";
    context.lineWidth = 5;

    for(var i = 0; i < clickX.length; i++){
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
      }else{
        context.moveTo(clickX[i]-1, clickY[i]-1);
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
