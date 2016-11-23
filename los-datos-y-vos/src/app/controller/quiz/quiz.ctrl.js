angular.module('app').controller('QuizCtrl', function($scope, $state, $stateParams, EventBusSvc, StudentDataSvc, QuizSvc) {
    
    $scope.studentData = StudentDataSvc.getStudentData();
    $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
    $scope.pageData = $scope.sectionData.pages[$stateParams.pageNumber];
   
    $scope.goToNextPage = function(pageNumber) {
        if(pageNumber) {
            $state.go("root.quizSection1.question", { pageNumber: pageNumber});
        } else {
            $state.go("root.quizSection1.result");
        }
    };

});
