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
        },
        2: {
            id: "section2",
            title: "Segundo Paso",
            pages: {
                1: {
                    id: "avgPersonsPerHouse",
                    previousPage: false,
                    nextPage: 2,
                    questions: [
                        {
                            id: "personsPerHouse",
                            type: "numeric_single_option",
                            text: "1. Contanos, cuantas personas viven en tu casa"
                        },
                        {
                            id: "roomsPerHouse",
                            type: "numeric_single_option",
                            text: "2. Contanos, cuántas habitaciones hay en tu casa"
                        },
                        {
                            id: "avgPersonsPerHouse",
                            type: "numeric_multiple_option",
                            text: "3. Cuantas personas en promedio, crees que duermen por cuarto en:",
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
                    id: "avgRentingHouse",
                    previousPage: 1,
                    nextPage: false,
                    questions: [
                        {
                            id: "rentedHouse",
                            type: "radio_boolean",
                            text: "1. El lugar en el que vos vivís, ¿es alquilado?",
                        },
                        {
                            id: "personsRentingHouses",
                            type: "slider",
                            text: "2. Contanos qué porcentaje de personas crees que viven en un lugar alquilado en:",
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
