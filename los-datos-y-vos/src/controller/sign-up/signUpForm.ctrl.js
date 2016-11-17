angular.module('app').controller('signUpFormCtrl', function($scope, $state, $filter, EventBusSvc, StudentDataSvc, LocationIndicatorSvc) {

	var activate = function() {
	    $scope.studentData = StudentDataSvc.getStudentData();
	    LocationIndicatorSvc.getProvinceList().then(function(data) {
	    	$scope.provinceList = data;
	    });
	    $scope.departmentList = []; 
    };

    var updateDepartmentList = function() {
    	LocationIndicatorSvc.getDepartmentList().then(function(data) {
    		$scope.departmentList = $filter('filter')(data, {provincia_id: $scope.studentData.provinceId}, true);
	    });
    };

    $scope.$watch("studentData.provinceId", function(){
    	updateDepartmentList();
    });
    
    $scope.saveClassCode = function() {
    	$state.go("root.signUpForm.studentData");
    	StudentDataSvc.updateStudentData($scope.studentData);
    	EventBusSvc.broadcast('updateClassCode', $scope.studentData.classCode);
    };

    $scope.saveStudentData = function() {
    	StudentDataSvc.updateStudentData($scope.studentData);
    };
    
    activate();
});
