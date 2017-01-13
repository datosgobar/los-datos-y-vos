angular.module('app').controller('ResultSection3Ctrl', function($scope, $state, $filter, StudentDataSvc, LocationIndicatorSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';
        $scope.currentDepartment = {};
        LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
        	$scope.departmentList = data;
        });

        $scope.doughnutChart = {
       		labels: ['Sí', 'No'],
            data: ['30', '40'],
        	colors: ['#EEEEEE', '#34D1E2'],
            options: {
            	legend: {
                	display: true,
                    labels: {
                    	generateLabels: function(chart) {
                            return chart.data.labels.map(function(label, i) {
                                var meta = chart.getDatasetMeta(0);
                                var ds = chart.data.datasets[0];
                                var arc = meta.data[i];
                                var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                                var arcOpts = chart.options.elements.arc;
                                var fill = ds.backgroundColor[i];
                                var stroke = getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                var bw = getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                return {
                                    text:  label + ' ' + ds.data[i] + " %",
                                    fillStyle: fill,
                                    strokeStyle: stroke,
                                    lineWidth: bw,
                                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                    index: i
                                };
                            });
                        }
                    }
                }          
            }
        };

        $scope.$watch($scope.comparisonType, comparisonTypeChanged);
    };

    var comparisonTypeChanged = function(newValue, oldValue) {
      // TODO HIDE TOOLTIPS
  	};

  	var updateNormalizedValue = function() {
  		if($scope.currentDepartment) {
	      	if($scope.comparisonType == 'avgPersonsPerHouse') {
	          	$scope.currentValue = Math.round($scope.currentDepartment[$scope.comparisonType]);
	        } else {
	        	$scope.currentValue = Math.round($scope.currentDepartment[$scope.comparisonType] * 100);
	        	var yesPercentage = Math.round($scope.currentDepartment[$scope.comparisonType] * 100);
	        	var noPercentage = 100 - yesPercentage;
        		$scope.doughnutChart.data = [yesPercentage, noPercentage];
	        }
        }
  	};

    $scope.showDepartmentTooltip = function(event) {
    	$scope.$apply(function(){
    		var departmentId = parseInt(event.currentTarget.id);
	        var department = $filter('filter')($scope.departmentList, {id: departmentId})[0];
	        $scope.currentDepartment = department;

	        var description = document.getElementById("descriptionDiv");
	        var mapWrapper = document.getElementById("comparisonMap");
	        description.className = "description active";
		     //Position Tooltip were mouse clicked
	        description.style.left = event.clientX + mapWrapper.offsetLeft + "px";
	        //the 100 is used because of the tooltip height
	      	description.style.top =  event.clientY + mapWrapper.offsetTop - 100 + "px";
	      	updateNormalizedValue();	
    	}); 
    };    

    activate();

});
