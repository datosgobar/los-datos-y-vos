angular.module('app').directive("comparisonMap", function(LocationIndicatorSvc) {
  return {
    restrict: "E",
    replace: true,
    template: "<object type='image/svg+xml' id='comparisonMap' class='student-info__maps'></object>",
    link: function(scope, element, attrs) {
      var init = function() {
        var pathElements = angular.element(element[0].getSVGDocument().getElementsByTagName("g"));

        for(var i = 0; i < pathElements.length; i++) {
            element = pathElements[i];
            if (element.id != null && !isNaN(element.id) && element.id != attrs.province) {
              element.addEventListener('click', function(event) {
                console.log(parseInt(event.currentTarget.id));
              });
            }
        }

        var comparisonTypeChanged = function(newValue, oldValue) {
          
        };
        scope.$watch(attrs.comparisonType, comparisonTypeChanged);

      };

      var provinceChanged = function(newValue, oldValue) {
        if(newValue) {
          element[0].data = "img/maps/" + newValue + ".svg";
        }
      };
      scope.$watch(attrs.province, provinceChanged);

      if (element[0].getSVGDocument()) {
        init();
      } else {
        element.on('load', init);
      }
    }
  }
});
