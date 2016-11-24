angular.module('app').controller('signUpFormCtrl', function($scope, $state, $filter, EventBusSvc, StudentDataSvc, LocationIndicatorSvc) {

	var activate = function() {
	    $scope.studentData = StudentDataSvc.getStudentData();
	    LocationIndicatorSvc.getProvinceList().then(function(data) {
	    	$scope.provinceList = data;
	    });
	    $scope.departmentList = []; 
    };

    var updateDepartmentList = function() {
        var provinceId = $scope.studentData.province && $scope.studentData.province.id ? $scope.studentData.province.id : null;
        if(provinceId == 2) { // CABA
            LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
                $scope.departmentList = data;
            });
        } else {
        	LocationIndicatorSvc.getDepartmentList().then(function(data) {
                $scope.departmentList = $filter('filter')(data, {provinceId: provinceId}, true);
    	    });
        }
    };

    $scope.$watch("studentData.province", function(){
    	updateDepartmentList();
    });
    
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
