angular.module('app').controller('ResultSection3Ctrl', function($scope, $state, StudentDataSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';
    };

    activate();

});
