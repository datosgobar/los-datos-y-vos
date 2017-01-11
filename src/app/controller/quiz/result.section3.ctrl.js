angular.module('app').controller('ResultSection3Ctrl', function($scope, $state, StudentDataSvc, LocationIndicatorSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';

        LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
        	$scope.departmentList = data;
        });
    };

    activate();

});
