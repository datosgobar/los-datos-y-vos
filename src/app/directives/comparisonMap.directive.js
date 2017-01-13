angular.module('app').directive("comparisonMap", function() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      clickFunction: '='
    },
    template: "<object type='image/svg+xml' id='comparisonMap' class='student-info__maps'></object>",
    link: function(scope, element, attrs) {

      var provinceChanged = function(newValue, oldValue) {
        if(newValue) {
          var object = document.getElementById("comparisonMap");
          object.data = "img/maps/" + newValue + ".svg";
          object.addEventListener('load', init);
        }
      };

      var init = function() {
        var pathElements = angular.element(element[0].getSVGDocument().getElementsByTagName("g"));
        for(var i = 0; i < pathElements.length; i++) {
            element = pathElements[i];
            if (element.id != null && !isNaN(element.id) && element.id != attrs.province) {
              element.classList.add("department")
              element.addEventListener('click', scope.clickFunction);
            }
        }
        
      };

      scope.$watch(attrs.province, provinceChanged);

    }
  }
});
