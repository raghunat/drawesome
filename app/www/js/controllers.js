angular.module('app.controllers', [])

.controller('loginPageCtrl', function($scope) {

})

.controller('registerCtrl', function($scope) {

})

.controller('drawesomeCtrl', function($scope) {

})

.controller('myProfileCtrl', function($scope) {

})

.controller('moreInformationCtrl', function($scope) {

})

.controller('mainCtrl', function($scope) {

})

.controller('createBoardCtrl', function($scope) {

})

.controller('boardCtrl', ['$scope', function($scope) {


  //Color Slider
  $scope.data = {
    first: '0',
    second: '100%',
    third: '50%'
  }
  $scope.color = "hsl(" + $scope.data.first + "," + $scope.data.second + "," + $scope.data.third + ")";

  $scope.sliderColor = function() {
    $scope.color = "hsl(" + $scope.data.first + "," + $scope.data.second + "," + $scope.data.third + ")";
    changeColor($scope.color);
  }

  // Adjusted canvas size, to per screen. Should be a good ratio...
  var screenWidth = screen.width;
  var screenHeight = screen.height;
  var canvasWidth = screenWidth * .25;
  var canvasHeight = screenHeight * 0.55;

  // //Colors
  // var colorRed = "#FF0000";
  // var colorBlue = "#4033FF";
  // var colorYellow = "#ffcf33";
  // var colorGreen = "#397D02";
  var colorErase = "#FFFFFF";

  var curColor = $scope.color;
  var clickColor = new Array();
  var clickTool = new Array();
  var curTool = "crayon";

  var canvasDiv = document.getElementById('canvasDiv');
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.setAttribute('id', 'canvas');
  canvas.style.border = "1px solid"; //helps distinguish board from whitespace
  canvasDiv.appendChild(canvas);
  if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
  }
  context = canvas.getContext("2d");

  //When the mouse is clicked
  $('#canvas').mousedown(function(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  //Records drawing when mouse is held
  $('#canvas').mousemove(function(e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  //When mouse is unclicked
  $('#canvas').mouseup(function(e) {
    paint = false;
  });

  //When mouse off the paper
  $('#canvas').mouseleave(function(e) {
    paint = false;
  });
  // clear


  //Saving "CLICK"
  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();
  var paint;

  function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    clickColor.push(curColor);
  }

  //Event listeners for html buttons
  document.getElementById("clearCanvas").addEventListener("click", clearSetUp);
  // document.getElementById("redColor").addEventListener("click", function() {
  //   changeColor(colorRed)
  // });
  // document.getElementById("blueColor").addEventListener("click", function() {
  //   changeColor(colorBlue)
  // });
  // document.getElementById("yellowColor").addEventListener("click", function() {
  //   changeColor(colorYellow)
  // });
  // document.getElementById("greenColor").addEventListener("click", function() {
  //   changeColor(colorGreen)
  // });
  document.getElementById("eraseColor").addEventListener("click", function() {
    changeColor(colorErase)
  });
  document.getElementById("paintBrush").addEventListener("click",function() {
    changeWidth(10);
  })
  document.getElementById("pencil").addEventListener("click",function() {
    changeWidth(5);
  })

  function changeWidth(newWidth){
    context.lineWidth = newWidth;
  }

  //Drawing function
  //Canvas clear
  function clearSetUp() {
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    clickDrag = new Array();
    clickColor = new Array();
    clearCanvas();
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  function changeColor(color) {
    curColor = color;
  }

  function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.closePath();
      context.strokeStyle = clickColor[i];
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
