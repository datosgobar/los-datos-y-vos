angular.module('app').controller('ResultSection1Ctrl', function($scope, $state, StudentDataSvc, QuizSvc, LocationIndicatorSvc) {
    
    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
        
        $scope.keys = [];
        $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
        $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "La " : "La Provincia de ") + $scope.studentData.province.name;

        $scope.calculateResults();
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.calculateResults = function() {
        $scope.results = [];
        angular.forEach($scope.sectionData.pages, function(sectionPages) {
            angular.forEach(sectionPages.questions, function(question) {
                var questionResults = {
                    questionText: question.text,
                    options: []
                };
                angular.forEach(question.options, function(option) {
                    var optionResult = {
                        optionText: option.textKey
                    };
                    optionResult.yourAnswer = $scope.studentData[$scope.sectionData.id][question.id][option.id];
                    if(option.id == 'department') {
                        optionResult.censusResult = ($scope.studentData.department[question.id]*100);
                    } else if(option.id == 'province') {
                        optionResult.censusResult = ($scope.studentData.province[question.id]*100);
                    }
                    questionResults.options.push(optionResult);
                });
                $scope.results.push(questionResults);
            });
        });
    };

    activate();

});
