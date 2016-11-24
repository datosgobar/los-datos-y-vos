angular.module('app').factory('QuizFactory', function() {

    var quiz = {
        1: {
            id: "section1",
            title: "Primer Paso",
            pages: {
                1: {
                    previousPage: false,
                    nextPage: 2,
                    questions: [
                        {
                            id: "youngProportion",
                            type: "slider",
                            text: "1. En estos lugares que te detallamos, y teniendo en cuenta todas las personas que viven ahí, ¿qué porcentaje crees que son chicos de entre 15 y 18 años?",
                            options: [
                                {
                                    id: "department",
                                    textKey: "YOUR_DEPARTMENT"
                                },
                                {
                                    id: "province",
                                    textKey: "YOUR_PROVINCE"
                                }
                            ]
                        }
                    ]                    
                },
                2: {
                    previousPage: 1,
                    nextPage: false,
                    questions: [
                        {
                            id: "schoolAttendance",
                            type: "slider",
                            text: "Contanos qué porcentaje de chicos de entre 15 y 18 años crees que van a la escuela en:",
                            options: [
                                {
                                    id: "department",
                                    textKey: "YOUR_DEPARTMENT"
                                },
                                {
                                    id: "province",
                                    textKey: "YOUR_PROVINCE"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    };
    return quiz;

});
