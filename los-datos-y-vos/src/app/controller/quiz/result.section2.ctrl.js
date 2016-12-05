angular.module('app').controller('ResultSection2Ctrl', function($scope, $state, StudentDataSvc, QuizSvc, LocationIndicatorSvc) {
    
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
        $scope.results = {};
        
        angular.forEach($scope.sectionData.pages, function(sectionPage) {
            if(sectionPage.id == "avgPersonsPerHouse") {
                var questionResults = {
                    questionText: "Personas que duermen por cuarto en promedio",
                    options: []
                };
                questionResults.options.push({ 
                    optionText: "YOUR_HOUSE",  
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["personsPerHouse"] /
                        $scope.studentData[$scope.sectionData.id]["roomsPerHouse"]
                });
                questionResults.options.push({ 
                    optionText: "YOUR_DEPARTMENT",  
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["avgPersonsPerHouse"]['department'],
                    censusResult: $scope.studentData.department["avgPersonsPerHouse"]
                });
                questionResults.options.push({ 
                    optionText: "YOUR_PROVINCE",  
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["avgPersonsPerHouse"]['province'],
                    censusResult: $scope.studentData.province["avgPersonsPerHouse"]
                });
                $scope.results[sectionPage.id] = questionResults;

            }
        });
    };

    activate();

});