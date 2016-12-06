angular.module('app').directive("svgMap", function() {
  return {
    restrict: "E",
    replace: true,
    template: "<object type='image/svg+xml' id='locationMap'></object>",
    link: function(scope, element, attrs) {

      var init = function() {        
        var departmentChanged = function(newValue, oldValue) {
          if(newValue.id) {
            var oldSelectedDepartment = angular.element(element[0].getSVGDocument().getElementsByClassName("selected"));
            oldSelectedDepartment.removeClass("selected");
            if(oldSelectedDepartment.length > 0) {
              oldSelectedDepartment[0].children[0].style.fill="#F6F6F6";
            }
            var selectedDepartment = angular.element(element[0].getSVGDocument().getElementById(("00" + newValue.id).slice(-5)));
            selectedDepartment.addClass("selected");
            selectedDepartment.children('path')[0].style.fill="#FFEAA8";
          }
        };
        departmentChanged(scope.studentData.department);
        scope.$watch(attrs.department, departmentChanged);
      }

      var provinceChanged = function(newValue, oldValue) {
        if(newValue.id) {
          element[0].data = "/img/maps/" + newValue.id + ".svg";
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