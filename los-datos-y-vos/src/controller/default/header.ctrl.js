angular.module('app').controller('HeaderCtrl', function($scope, $state, EventBusSvc, StudentDataSvc) {
    
    $scope.step = {};
    $scope.studentData = StudentDataSvc.getStudentData();

    $scope.$on('$stateChangeSuccess', function () {
        switch ($state.current.name) {
            case 'root.welcome':
                StudentDataSvc.clearStudentData();
            break;
            case 'root.signUpForm.studentData':
            	EventBusSvc.broadcast('updateStep', { name: 'Primer paso 1', number: 1});
                break;
        }
    });

    EventBusSvc.subscribe('updateClassCode', function(event, classCode) {
    	$scope.studentData.classCode = classCode;
    });

    EventBusSvc.subscribe('updateStep', function(event, step) {
    	$scope.stepName = step.name;
    	$scope.stepNumber = step.number;
    });

});
