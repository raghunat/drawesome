//Directive for canvas.js
angular.module('directivesModule').directive('customCanvas', function () {
    return {
        template: '<div id="canvasDiv"><script src="canvas.js"></script></div><button id="clearCanvas" type="button">Clear</button><button id="redColor" type="button">Red</button><button id="blueColor" type="button">Blue</button><button id="yellowColor" type="button">Yellow</button><button id="greenColor" type="button">Green</button><button id="eraseColor" type="button">Eraser</button><button id="save" type="button">Save</button><button id="drawAgain" type="button">Draw Again</button>'
    };
});
