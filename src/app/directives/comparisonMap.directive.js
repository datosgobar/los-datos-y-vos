angular.module('app').directive("comparisonMap", function($timeout) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      clickFunction: '=',
      mapControl: '='
    },
    template: "<object type='image/svg+xml' id='comparisonMap' class='student-info__maps' data='/img/maps/2.svg'></object>",
    link: function(scope, element, attrs) {

      var init = function() {
        if(element[0] === undefined) {
          $timeout(function(){}, 2000);  
        }
        
        var pathElements = angular.element(element[0].getSVGDocument().getElementsByTagName("g"));
        var rootElement;
        for(var i = 0; i < pathElements.length; i++) {
            var pathElement = pathElements[i];
            if (pathElement.id != null && !isNaN(pathElement.id) && pathElement.id == attrs.province) {
              rootElement = pathElement;
              rootElement.setAttribute('class', 'youngProportion');
            }
        }
        scope.mapControl.map = rootElement;

        for(var i = 0; i < pathElements.length; i++) {
            var pathElement = pathElements[i];
            if (pathElement.id != null && !isNaN(pathElement.id) && pathElement.id != attrs.province) {
              pathElement.classList.add("department")
              pathElement.addEventListener('click', function(event) {
                removeActiveTooltips();
                scope.clickFunction(event);
              });
            }
        }
        
      };

      var comparisonMap = document.getElementById("comparisonMap");
      comparisonMap.onload = function() {
        init();
      };

      var removeActiveTooltips = function() {
        var pathElements = angular.element(element[0].getSVGDocument().getElementsByClassName("department active"));
        for(var i = 0; i < pathElements.length; i++) {
            var pathElement = pathElements[i];
            pathElement.setAttribute('class', 'department');
        }
      };

      
      
    }
  }
});
