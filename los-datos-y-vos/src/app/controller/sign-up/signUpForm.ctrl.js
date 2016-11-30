angular.module('app').controller('signUpFormCtrl', function($scope, $state, $filter, EventBusSvc, StudentDataSvc, LocationIndicatorSvc) {

	var activate = function() {
	    $scope.studentData = StudentDataSvc.getStudentData();
        $scope.defaultProvince = { name: "Provincia"};
        $scope.defaultDepartment = { name: "¿Dónde vivís?"};
	    LocationIndicatorSvc.getProvinceList().then(function(data) {
            $scope.provinceList = [$scope.defaultProvince]; 
	    	$scope.provinceList = $scope.provinceList.concat(data);
	    });
	    $scope.departmentList = [$scope.defaultDepartment]; 
    };

    var updateDepartmentList = function() {
        $scope.studentData['department'] = $scope.defaultDepartment;
        var provinceId = $scope.studentData.province && $scope.studentData.province.id ? $scope.studentData.province.id : null;
        if(provinceId == 2) { // CABA
            LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
                $scope.departmentList = [$scope.defaultDepartment];
                $scope.departmentList = $scope.departmentList.concat(data);
            });
        } else {
        	LocationIndicatorSvc.getDepartmentList().then(function(data) {
                $scope.departmentList = [$scope.defaultDepartment];
                $scope.departmentList = $scope.departmentList.concat($filter('filter')(data, {provinceId: provinceId}, true));
    	    });
        }
    };

    $scope.$watch("studentData.province", function(){
    	updateDepartmentList();
    });
    
    $scope.initProvinceCombobox = function() {
        if(!$scope.studentData['province']) {
            $scope.studentData['province'] = $scope.defaultProvince;
        }
    };

    $scope.initDepartmentCombobox = function() {
        if(!$scope.studentData['department']) {
            $scope.studentData['department'] = $scope.defaultDepartment;
        }
    };

    $scope.saveClassCode = function() {
    	$state.go("root.signUpForm.studentData");
    	StudentDataSvc.updateStudentData($scope.studentData);
    	EventBusSvc.broadcast('updateClassCode', $scope.studentData.classCode);
    };

    $scope.saveStudentData = function() {
    	StudentDataSvc.updateStudentData($scope.studentData);
        $state.go("root.quizSection1.question", { pageNumber: 1});
    };
    
    activate();
});
