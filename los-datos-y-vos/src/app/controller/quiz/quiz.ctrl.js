angular.module('app').controller('QuizCtrl', function($scope, $state, $stateParams, EventBusSvc, StudentDataSvc, QuizSvc) {
    
    $scope.studentData = StudentDataSvc.getStudentData();
    $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
    $scope.pageData = $scope.sectionData.pages[$stateParams.pageNumber];
    $scope.sliderOptions = {
        floor: 0,
        ceil: 100,
        hideLimitLabels: true
    };
    
    $scope.keys = [];
    $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
    $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "la " : "la Provincia de ") + $scope.studentData.province.name;
    
    $scope.goToNextPage = function(pageNumber) {
        var questionStateName = "root.quizSection{{stepNumber}}.question".replace("{{stepNumber}}", $state.current.data.stepNumber);
        var resultStateName = "root.quizSection{{stepNumber}}.result".replace("{{stepNumber}}", $state.current.data.stepNumber);
        StudentDataSvc.updateStudentData($scope.studentData);
        if(!!pageNumber) {
            $state.go(questionStateName, { pageNumber: pageNumber});
        } else {
            $state.go(resultStateName);
        }
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.initNumericValue = function(questionId, optionId) {
        if(!$scope.studentData[$scope.sectionData.id]) {
            $scope.studentData[$scope.sectionData.id] = {};
        }
        if(!$scope.studentData[$scope.sectionData.id][questionId]) {
            if(!optionId) {
                $scope.studentData[$scope.sectionData.id][questionId] = 0;
            } else {
                $scope.studentData[$scope.sectionData.id][questionId] = {};
            }
        }
        if(!$scope.studentData[$scope.sectionData.id][questionId][optionId] && optionId) {
            $scope.studentData[$scope.sectionData.id][questionId][optionId] = 0;
        }
    };

    $scope.decrementNumericValue = function(questionId, optionId) {
        var value = optionId ? $scope.studentData[$scope.sectionData.id][questionId][optionId]: 
            $scope.studentData[$scope.sectionData.id][questionId];
        if((value -1) >= $scope.sliderOptions.floor) { 
            if(optionId) {
                $scope.studentData[$scope.sectionData.id][questionId][optionId] -= 1;
            } else {
                $scope.studentData[$scope.sectionData.id][questionId] -= 1;
            }
        }
    };

    $scope.incrementNumericValue = function(questionId, optionId) {
        var value = optionId ? $scope.studentData[$scope.sectionData.id][questionId][optionId]: 
            $scope.studentData[$scope.sectionData.id][questionId];
        if((value +1) <= $scope.sliderOptions.ceil) { 
            if(optionId) {
                $scope.studentData[$scope.sectionData.id][questionId][optionId] += 1;
            } else {
                $scope.studentData[$scope.sectionData.id][questionId] += 1;
            }
        }
    };

});
