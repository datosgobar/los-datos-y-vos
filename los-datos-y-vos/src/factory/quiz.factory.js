angular.module('app').factory('QuizFactory', function() {

    var quiz = {
        1: {
            title: "Primer Paso",
            pages: {
                1: {
                    previousPage: false,
                    nextPage: 2,
                    questions: [
                        {
                            id: 1,
                            type: "slider",
                            text: "1. En estos lugares que te detallamos, y teniendo en cuenta todas las personas que viven ahí, ¿qué porcentaje crees que son chicos de entre 15 y 18 años?",
                            options: [
                                {
                                    id: "a",
                                    text: "¿Tu comuna?"
                                },
                                {
                                    id: "b",
                                    text: "¿La Ciudad de Buenos Aires?"
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
                            id: 2,
                            type: "slider",
                            text: "Contanos qué porcentaje de chicos de entre 15 y 18 años crees que van a la escuela en:",
                            options: [
                                {
                                    id: "a",
                                    text: "¿Tu comuna?"
                                },
                                {
                                    id: "b",
                                    text: "¿La Ciudad de Buenos Aires?"
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
