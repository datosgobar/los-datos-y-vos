angular.module('app').controller('ResultSection2Ctrl', function($scope, $state, StudentDataSvc, QuizSvc,
        LocationIndicatorSvc, $firebaseArray) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);

        $scope.keys = [];
        $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.department.name;
        $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "" : "Provincia de ") + $scope.studentData.province.name;

        var ref = firebase.database().ref().child("studentsPerClass/" + $scope.studentData.classCode);
        $scope.studentsPerClass = $firebaseArray(ref);

        $scope.studentsPerClass.$loaded().then(function() {
            $scope.calculateResults();
            $scope.displayResults = true;
            $scope.studentsPerClass.$watch(function() {
                $scope.calculateResults();
            })
        });
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.calculateResults = function() {
        $scope.results = {};

        $scope.classAverages = {
            avgPersonsPerHouse: {
                yourHouse: 0,
                yourDepartment: 0,
                yourProvince: 0
            },
            personsRentingHouses: {
                department: 0,
                province: 0
            },
            rentedHouse: 0
        };

        angular.forEach($scope.studentsPerClass, function(student) {
            $scope.classAverages.avgPersonsPerHouse.yourHouse += student[$scope.sectionData.id]["personsPerHouse"] /
                        student[$scope.sectionData.id]["roomsPerHouse"]
            $scope.classAverages.avgPersonsPerHouse.yourDepartment += student[$scope.sectionData.id]["avgPersonsPerHouse"]['department'];
            $scope.classAverages.avgPersonsPerHouse.yourProvince += student[$scope.sectionData.id]["avgPersonsPerHouse"]['province'];
            $scope.classAverages.personsRentingHouses.department += student[$scope.sectionData.id]["personsRentingHouses"]['department'];
            $scope.classAverages.personsRentingHouses.province += student[$scope.sectionData.id]["personsRentingHouses"]['province'];
            $scope.classAverages.rentedHouse += parseInt(student[$scope.sectionData.id]["rentedHouse"]);
        });

        angular.forEach($scope.sectionData.pages, function(sectionPage) {
            if(sectionPage.id == "avgPersonsPerHouse") {
                var questionResults = {
                    questionText: "Personas que duermen por habitación en promedio:",
                    options: []
                };
                questionResults.options.push({
                    optionText: "YOUR_HOUSE",
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["personsPerHouse"] /
                        $scope.studentData[$scope.sectionData.id]["roomsPerHouse"],
                    yourClass: $scope.classAverages.avgPersonsPerHouse.yourHouse / $scope.studentsPerClass.length
                });
                questionResults.options.push({
                    optionText: "YOUR_DEPARTMENT",
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["avgPersonsPerHouse"]['department'],
                    censusResult: $scope.studentData.department["avgPersonsPerHouse"],
                    yourClass: $scope.classAverages.avgPersonsPerHouse.yourDepartment / $scope.studentsPerClass.length
                });
                questionResults.options.push({
                    optionText: "YOUR_PROVINCE",
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["avgPersonsPerHouse"]['province'],
                    censusResult: $scope.studentData.province["avgPersonsPerHouse"],
                    yourClass: $scope.classAverages.avgPersonsPerHouse.yourProvince / $scope.studentsPerClass.length
                });
                $scope.results[sectionPage.id] = questionResults;
            }
            if(sectionPage.id == "avgRentingHouse") {
                var avgRentingHouseResults = {};

                angular.forEach(sectionPage.questions, function(question) {
                    if(question.id == "rentedHouse") {
                        var yesPercentage = Math.round($scope.classAverages.rentedHouse * 100 / $scope.studentsPerClass.length);
                        var noPercentage = 100 - yesPercentage;
                        var rentedHouseResults = {
                            questionText: "Vive en un lugar alquilado:",
                            optionText: "Vivís en una vivienda alquilada?",
                            yourAnswer: parseInt($scope.studentData[$scope.sectionData.id]["rentedHouse"]) ? 'Sí' : 'No',
                            yourClass: {
                                labels: ['Sí', 'No'],
                                data: [yesPercentage, noPercentage],
                                colors: ['#EEEEEE', '#34D1E2'],
                                options: {
                                    legend: {
                                        display: true,
                                        labels: {
                                            generateLabels: function(chart) {
                                                return chart.data.labels.map(function(label, i) {
                                                    var meta = chart.getDatasetMeta(0);
                                                    var ds = chart.data.datasets[0];
                                                    var arc = meta.data[i];
                                                    var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                                                    var arcOpts = chart.options.elements.arc;
                                                    var fill = ds.backgroundColor[i];
                                                    var stroke = getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                                    var bw = getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                                    return {
                                                        text:  label + ' ' + ds.data[i] + " %",
                                                        fillStyle: fill,
                                                        strokeStyle: stroke,
                                                        lineWidth: bw,
                                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                                        index: i
                                                    };
                                                });
                                            }
                                        }
                                    }                                }
                            }
                        };
                        avgRentingHouseResults.rentedHouse = rentedHouseResults
                    }
                    if(question.id == "personsRentingHouses") {
                        var questionResults = {
                            questionText: "Porcentaje de personas que vive en un lugar alquilado en:",
                            options: []
                        };

                        angular.forEach(question.options, function(option) {

                            var optionResult = {
                                optionText: option.textKey
                            };

                            optionResult.yourAnswer   = $scope.studentData[$scope.sectionData.id][question.id][option.id];
                            optionResult.yourClass    = $scope.classAverages[question.id][option.id] / $scope.studentsPerClass.length;
                            optionResult.censusResult = ($scope.studentData[option.id][question.id]*100);

                            questionResults.options.push(optionResult);
                        });

                        avgRentingHouseResults.personsRentingHouses = questionResults;
                    }
                });

                $scope.results[sectionPage.id] = avgRentingHouseResults;
            }
        });
    };

    activate();

});
