angular.module('app').directive("svgMap", function() {
  return {
    restrict: "E",
    replace: true,
    template: "<object type='image/svg+xml' id='locationMap' class='student-info__maps'></object>",
    link: function(scope, element, attrs) {

      var init = function() {
        var departmentChanged = function(newValue, oldValue) {
          if(newValue.id) {
            var oldSelectedDepartment = angular.element(element[0].getSVGDocument().getElementsByClassName("selected"));
            if(oldSelectedDepartment.length > 0) {
              oldSelectedDepartment.removeClass("selected");
              angular.forEach(oldSelectedDepartment.children('path'), function(v,k){
                v.style.fill="#F2F2F2";
              });
            }
            var selectedDepartment = angular.element(element[0].getSVGDocument().getElementById(("00" + newValue.id).slice(-5)));
            if(selectedDepartment.length) {
              selectedDepartment.addClass('selected');
              angular.forEach(selectedDepartment.children('path'), function(v,k){
                v.style.fill="#FFEAA8";
              });
            }
          }
        };
        departmentChanged(scope.studentData.department);
        scope.$watch(attrs.department, departmentChanged);
      }

      var provinceChanged = function(newValue, oldValue) {
        if(newValue.id) {
          element[0].data = "img/maps/" + newValue.id + ".svg";
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
