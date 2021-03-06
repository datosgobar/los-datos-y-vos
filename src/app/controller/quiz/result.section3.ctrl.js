angular.module('app').controller('ResultSection3Ctrl', function($scope, $state, $filter, StudentDataSvc, LocationIndicatorSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';
        $scope.province_id = StudentDataSvc.getStudentData().province.id;
        $scope.currentDepartment = null;
        LocationIndicatorSvc.getDepartmentList().then(function(data) {
        	$scope.allDepartmentList = data;
        });
        LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
        	$scope.departmentList = $filter('orderBy')(data, 'avgPersonsPerHouse');
            $scope.avgPersonsPerHouse = {
                min: $scope.departmentList[0].avgPersonsPerHouse,
                max: $scope.departmentList[$scope.departmentList.length - 1].avgPersonsPerHouse
            };
        });
		    $scope.currentValue = 100;
        $scope.pieChartOptions = {
       		animate:{
                duration:0,
                enabled:false
            },
            barColor: function(percent) {
                var ctx = this.renderer.getCtx();
                var canvas = this.renderer.getCanvas();
                var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                    gradient.addColorStop(0, "#45E3C1");
                    gradient.addColorStop(1, "#00CAF6");
                return gradient;
              },
            scaleColor:false,
            lineWidth:6,
            lineCap:'round',
            size: 70,
            trackColor: "#EEEEEE"
        };

        $scope.mapControl = {};
    };

    $scope.closeTooltip = function(event) {
    	var description = document.getElementById("descriptionDiv");
        description.classList.remove("active");
        $scope.mapControl.removeActiveTooltips();
    };

    $scope.changeComparisonType = function(type) {
    	$scope.comparisonType = type;
    	$scope.updateNormalizedValue();
    	$scope.mapControl.map.setAttribute('class', type);
    };

  	$scope.updateNormalizedValue = function() {
  		if($scope.currentDepartment) {
	      	if($scope.comparisonType == 'avgPersonsPerHouse') {
                var comparisonValue = $scope.currentDepartment[$scope.comparisonType];
	          	$scope.currentValue = Math.round((comparisonValue - $scope.avgPersonsPerHouse.min) /
                    ($scope.avgPersonsPerHouse.max - $scope.avgPersonsPerHouse.min) * 100);
	        } else {
	        	$scope.currentValue = Math.round($scope.currentDepartment[$scope.comparisonType] * 100);
	        }
        }
  	};

    $scope.showDepartmentTooltip = function(event) {

    	$scope.$apply(function(){
    		// var departmentId = parseInt(event.currentTarget.id);
        var departmentId = parseInt(event.target.parentNode.id);
        var department = $filter('filter')($scope.allDepartmentList, {id: departmentId})[0];
        $scope.currentDepartment = department;
        var selectedDepartment = event.currentTarget;
        selectedDepartment.classList.add("active");

        var description = document.getElementById("descriptionDiv");
        var mapWrapper = document.getElementById("comparisonMap");
        description.classList.add("active");
        //Position Tooltip were mouse clicked
        description.style.left = event.clientX + mapWrapper.offsetLeft + "px";
        //the 100 is used because of the tooltip height
        description.style.top =  event.clientY + mapWrapper.offsetTop - 118 + "px";
        $scope.updateNormalizedValue();
    	});
    };

    activate();

});
