angular.module('app').directive("svgMap", function() {
  return {
    restrict: "E",
    replace: true,
    template: "<object type='image/svg+xml' id='locationMap'></object>",
    link: function(scope, element, attrs) {
      var provinceChanged = function(newValue, oldValue) {
        var locationMap = angular.element(document.querySelector('#locationMap'));
        if(newValue.id) {
          locationMap[0].data = "/img/maps/" + newValue.id + ".svg";
        }
      };
      var departmentChanged = function(newValue, oldValue) {
        var locationMap = angular.element(document.querySelector('#locationMap'));
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
      scope.$watch(attrs.province, provinceChanged);
      scope.$watch(attrs.department, departmentChanged);
    }
  }
});
