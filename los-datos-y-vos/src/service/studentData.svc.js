angular.module('app').factory('StudentDataSvc', function() {
	
    var studentData = {};
    var savedData = localStorage.getItem("studentData");
    if(savedData) {
        studentData = JSON.parse(savedData);
    }
	
    var clearStudentData = function() {
        localStorage.setItem("studentData", JSON.stringify({}));
    };

    var getStudentData = function() {
        return studentData;
    };
    
    var updateStudentData = function(newStudentData) {
        localStorage.setItem("studentData", JSON.stringify(newStudentData));
    };

    return {
        clearStudentData: clearStudentData,
        getStudentData: getStudentData,
        updateStudentData: updateStudentData
    };

});