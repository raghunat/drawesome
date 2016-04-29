angular.module('app.directives', [])
//
// .directive('blankDirective', [function(){
//
// }])
// // got rid of semi colon to add another directive
// adding canvas directives
.directive('customCanvas', [function () {
    return {
        template: '<div id="canvasDiv"></div>'
    };
}]);
