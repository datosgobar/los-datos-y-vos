angular.module('app').controller('HeaderCtrl', function($scope, $state, EventBusSvc, StudentDataSvc, ngDialog) {
    
    $scope.step = {};
    $scope.studentData = StudentDataSvc.getStudentData();

    $scope.$on('$stateChangeSuccess', function ($event, $toState, $toParams) {
        document.getElementById('header').scrollIntoView();
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
                    name: 'PRIMER BLOQUE', 
                    number: 1
                });
                break;
            case 'root.quizSection1.question':
                var baseStepNumber = 1;
                EventBusSvc.broadcast('updateStep', { 
                    name: 'PRIMER BLOQUE', 
                    number: baseStepNumber + parseInt($toParams.pageNumber)
                });
                break;
            case 'root.quizSection1.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'PRIMER BLOQUE', 
                    number: 4
                });
                break;
            case 'root.quizSection2.question':
                var baseStepNumber = 4;
                EventBusSvc.broadcast('updateStep', { 
                    name: 'SEGUNDO BLOQUE', 
                    number: baseStepNumber + parseInt($toParams.pageNumber)
                });
                break;
            case 'root.quizSection2.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'SEGUNDO BLOQUE', 
                    number: 7
                });
                break;
            case 'root.quizSection3.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'BLOQUE FINAL', 
                    number: 8
                });
                break;
        }
    });

    EventBusSvc.subscribe('updateClassCode', function(event, classCode) {
    	$scope.studentData.classCode = classCode;
    });

    EventBusSvc.subscribe('updateStep', function(event, step) {
    	$scope.stepName = step.name;
    	$scope.progressStyle = { 'width' : (100 / 8) * step.number + '%' };
    });

    $scope.openAboutModal = function() {
        ngDialog.open({ template: 'html/default/about.html', className: 'ngdialog-theme-default', width: '80%' });
    };

});
