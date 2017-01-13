angular.module('app').directive("comparisonMap", function($filter) {
  return {
    restrict: "E",
    replace: true,
    scope: {
      valueList: '<',
      comparisonType: '='
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

      var comparisonTypeChanged = function(newValue, oldValue) {
          // TODO HIDE TOOLTIPS
      };

      var showDepartmentTooltip = function(event) {
        var departmentId = parseInt(event.currentTarget.id);
        var department = $filter('filter')(scope.valueList, {id: departmentId})[0];
        var normalizedValue;
        var description = document.getElementById("descriptionDiv");
        var mapWrapper = document.getElementById("comparisonMap");
        description.className = "description active";
        if(scope.comparisonType == 'avgPersonsPerHouse') {
          normalizedValue = Math.round(department[scope.comparisonType]);
        } else {
          normalizedValue = Math.round(department[scope.comparisonType] * 100) + '%';
        }
        // Set this value to the tooltip
        console.log(normalizedValue);
        //Position Tooltip were mouse clicked
          description.style.left = event.clientX + mapWrapper.offsetLeft + "px";
          //the 100 is used because of the tooltip height
          description.style.top =  event.clientY + mapWrapper.offsetTop - 100 + "px";

          //Get data-info value
          var info = this.getAttribute("id");
          //Add information from data-info to HTML element
          description.innerHTML = normalizedValue;
      };

      var init = function() {
        var pathElements = angular.element(element[0].getSVGDocument().getElementsByTagName("g"));
        for(var i = 0; i < pathElements.length; i++) {
            element = pathElements[i];
            if (element.id != null && !isNaN(element.id) && element.id != attrs.province) {
              element.classList.add("department")
              element.addEventListener('click', showDepartmentTooltip);
            }
        }
        scope.$watch(attrs.comparisonType, comparisonTypeChanged);
      };

      scope.$watch(attrs.province, provinceChanged);

    }
  }
});
