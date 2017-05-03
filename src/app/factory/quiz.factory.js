angular.module('app').factory('QuizFactory', function() {

    // cod 11042
    // cod 11043
    // cod 11044
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
                            text: "1. En estos lugares que te detallamos, y teniendo en cuenta todas las personas que viven ahí, ¿qué porcentaje creés que son chicos de entre 15 y 18 años?",
                            text_result: "1. Porcentaje de chicos de entre 15 y 18 años entre toda la población estos lugares:",
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
                            text: "2. Contanos qué porcentaje de chicos de entre 15 y 18 años creés que van a la escuela en:",
                            text_result: "2. Porcentaje de chicos de entre 15 y 18 años que van a la escuela en:",
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
                            text: "1. Contanos cuántas personas viven en tu casa:"
                        },
                        {
                            id: "roomsPerHouse",
                            type: "numeric_single_option",
                            text: "2. Contanos cuántos cuartos hay en tu casa:"
                        },
                        {
                            id: "avgPersonsPerHouse",
                            type: "numeric_multiple_option",
                            text: "3. Cuántas personas, en promedio, creés que duermen por cuarto en:",
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
                            text: "2. ¿Cuántas personas creés que viven en un lugar alquilado? Expresalo en porcentaje:",
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
