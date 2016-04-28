angular.module('app.directives', [])
//
// .directive('blankDirective', [function(){
//
// }])
// // got rid of semi colon to add another directive
// adding canvas directives
.directive('customCanvas', [function () {
    return {
        template: '<div id="canvasDiv"></div><button id="clearCanvas" type="button">Clear</button><button id="redColor" type="button">Red</button><button id="blueColor" type="button">Blue</button><button id="yellowColor" type="button">Yellow</button><button id="greenColor" type="button">Green</button><button id="eraseColor" type="button">Eraser</button><button id="save" type="button">Save</button>'
    };
}]);
