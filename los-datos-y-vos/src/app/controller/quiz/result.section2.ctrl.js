angular.module('app').controller('ResultSection2Ctrl', function($scope, $state, $stateParams, EventBusSvc, StudentDataSvc, QuizSvc) {
    
    $scope.studentData = StudentDataSvc.getStudentData();
    $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
        
    $scope.keys = [];
    $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
    $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "La " : "La Provincia de ") + $scope.studentData.province.name;

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

});
