angular.module('app').service('QuizSvc', function($q, $http, QuizFactory) {

    var getSectionData = function(sectionNumber) {
        return QuizFactory[sectionNumber];
    };

    return {
        getSectionData: getSectionData
    };

});