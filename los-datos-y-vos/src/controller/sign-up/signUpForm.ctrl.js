angular.module('app').controller('signUpFormCtrl', function($scope, $state, EventBusSvc, StudentDataSvc) {

    $scope.studentData = StudentDataSvc.getStudentData();
    

    $scope.saveClassCode = function() {
    	$state.go("root.signUpForm.studentData");
    	StudentDataSvc.updateStudentData($scope.studentData);
    	EventBusSvc.broadcast('updateClassCode', $scope.studentData.classCode);
    };
    
});
