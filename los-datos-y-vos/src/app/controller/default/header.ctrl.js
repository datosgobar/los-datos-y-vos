angular.module('app').controller('HeaderCtrl', function($scope, $state, EventBusSvc, StudentDataSvc) {
    
    $scope.step = {};
    $scope.studentData = StudentDataSvc.getStudentData();

    $scope.$on('$stateChangeSuccess', function ($event, $toState, $toParams) {
        switch ($state.current.name) {
            case 'root.welcome':
                StudentDataSvc.clearStudentData();
                $scope.studentData = StudentDataSvc.getStudentData();
                break;
            case 'root.signUpForm.studentData':
            	EventBusSvc.broadcast('updateStep', {
                    name: 'Ingreso datos', 
                    number: 1
                });
                break;
            case 'root.quizSection1.question':
                var baseStepNumber = 1;
                EventBusSvc.broadcast('updateStep', { 
                    name: 'Primer paso', 
                    number: baseStepNumber + parseInt($toParams.pageNumber)
                });
                break;
            case 'root.quizSection1.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'Primer paso', 
                    number: 4
                });
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
