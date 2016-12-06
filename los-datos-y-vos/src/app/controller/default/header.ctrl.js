angular.module('app').controller('HeaderCtrl', function($scope, $state, EventBusSvc, StudentDataSvc, ngDialog) {
    
    $scope.step = {};
    $scope.studentData = StudentDataSvc.getStudentData();

    $scope.$on('$stateChangeSuccess', function ($event, $toState, $toParams) {
        $scope.displayClassCode = true;
        switch ($state.current.name) {
            case 'root.welcome':
                StudentDataSvc.clearStudentData();
                $scope.studentData = StudentDataSvc.getStudentData();
                $scope.displayClassCode = false;
                break;
            case 'root.signUpForm.classCode':
                $scope.displayClassCode = false;
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
            case 'root.quizSection2.question':
                var baseStepNumber = 4;
                EventBusSvc.broadcast('updateStep', { 
                    name: 'Segundo paso', 
                    number: baseStepNumber + parseInt($toParams.pageNumber)
                });
                break;
            case 'root.quizSection2.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'Segundo paso', 
                    number: 7
                });
                break;
        }
    });

    EventBusSvc.subscribe('updateClassCode', function(event, classCode) {
    	$scope.studentData.classCode = classCode;
    });

    EventBusSvc.subscribe('updateStep', function(event, step) {
    	$scope.stepName = step.name;
    	$scope.progressStyle = { 'width' : (100 / 7) * step.number + '%' };
    });

    $scope.openAboutModal = function() {
        ngDialog.open({ template: 'html/default/about.html', className: 'ngdialog-theme-default', width: '60%' });
    };

});
