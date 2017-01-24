angular.module('app').controller('ResultSection3Ctrl', function($scope, $state, $filter, StudentDataSvc, LocationIndicatorSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';
        $scope.currentDepartment = null;
        $scope.currentValue = 100;
        $scope.mapControl = {};

        initPieChart();

        LocationIndicatorSvc.getProvinceList().then(function(data) {
            $scope.provinceList = data;
        });
        $scope.$watch("studentData.province", function(){
            initMap();
            updateDepartmentList();
        });

    };

    var initMap = function() {
        var comparisonMap = document.getElementById("comparisonMap");
        comparisonMap.data = "img/maps/" + $scope.studentData.province.id + ".svg";
        comparisonMap.onload = function() {
            $scope.closeTooltip();
            var pathElements = angular.element(comparisonMap.getSVGDocument().getElementsByTagName("g"));
            var rootElement;
            for(var i = 0; i < pathElements.length; i++) {
                var pathElement = pathElements[i];
                if (pathElement.id != null && !isNaN(pathElement.id) 
                    && pathElement.id == $scope.studentData.province.id) {
                  rootElement = pathElement;
                  rootElement.setAttribute('class', $scope.comparisonType);
                }
            }
            $scope.mapControl.map = rootElement;
            for(var i = 0; i < pathElements.length; i++) {
                var pathElement = pathElements[i];
                if (pathElement.id != null && !isNaN(pathElement.id) 
                    && pathElement.id != $scope.studentData.province.id) {
                    pathElement.classList.add("department")
                    pathElement.addEventListener('click', function(event) {
                    removeActiveTooltips();
                    showDepartmentTooltip(event);
              });
            }
        }
        };
    };

    var initPieChart = function() {
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
    };

    var updateDepartmentList = function() {
        var provinceId = $scope.studentData.province && $scope.studentData.province.id ? $scope.studentData.province.id : 2;
        if(provinceId == 2) { // CABA
            LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
                $scope.departmentList = $filter('orderBy')(data, 'avgPersonsPerHouse');
                $scope.avgPersonsPerHouse = {
                    min: $scope.departmentList[0].avgPersonsPerHouse,
                    max: $scope.departmentList[$scope.departmentList.length - 1].avgPersonsPerHouse
                };
            });
        } else {
            LocationIndicatorSvc.getDepartmentList().then(function(data) {
                $scope.departmentList = $filter('orderBy')($filter('filter')(data, {provinceId: provinceId}, true),
                    'avgPersonsPerHouse');
                $scope.avgPersonsPerHouse = {
                    min: $scope.departmentList[0].avgPersonsPerHouse,
                    max: $scope.departmentList[$scope.departmentList.length - 1].avgPersonsPerHouse
                };

            });
        }
    };

    $scope.closeTooltip = function(event) {
    	var description = document.getElementById("descriptionDiv");
        description.classList.remove("active");
        removeActiveTooltips();
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

    var showDepartmentTooltip = function(event) {
    	$scope.$apply(function(){
    		var departmentId = parseInt(event.currentTarget.id);
	        var department = $filter('filter')($scope.departmentList, {id: departmentId})[0];
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

    var removeActiveTooltips = function() {
        var map = document.getElementById("comparisonMap");
        var pathElements = angular.element(map.getSVGDocument().getElementsByClassName("department active"));
        for(var i = 0; i < pathElements.length; i++) {
            var pathElement = pathElements[i];
            pathElement.classList.remove("active");
        }
    };

    activate();

});
