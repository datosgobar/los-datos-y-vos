// Routes Config
// =============================================================================
angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.html5Mode({
        enabled: false
    });

    $stateProvider.state('root',{
        url: '',
        abstract: true,
        views: {
            'header': {
                templateUrl: 'html/default/header.html',
                controller: 'HeaderCtrl'
            }
        }
    });

    $stateProvider.state('root.welcome', {
        url: '/bienvenido',
        data: {
            bodyClass: 'welcomeSlide',
        },
        views: {
            'container@': {
                templateUrl: 'html/welcome/index.html',
                controller: 'welcomeCtrl'
            }
        }
    });

    $stateProvider.state('root.signUpForm', {
        url: '/registro',
        views: {
            'container@': {
                templateUrl: 'html/sign-up/index.html',
                controller: 'signUpFormCtrl'
            }
        }
    });

    $stateProvider.state('root.signUpForm.classCode', {
        url: '/codigo-clase',
        data: {
            bodyClass: 'classCodeSlide',
        },
        templateUrl: 'html/sign-up/class-code.html'
    });

    $stateProvider.state('root.signUpForm.studentData', {
        url: '/informacion',
        data: {
            bodyClass: 'studentDataSlide',
        },
        templateUrl: 'html/sign-up/student-data.html'
    });
        
    $stateProvider.state('root.quizSection1', {
        url: '/primer-bloque',
        data: {
            stepNumber: 1
        },
        views: {
            'container@': {
                templateUrl: 'html/quiz/index.html',
            }
        }
    });

    $stateProvider.state('root.quizSection1.result', {
        url: '/resultados',
        data: {
            bodyClass: 'section1ResultSlide',
        },
        templateUrl: 'html/quiz/section1-result.html',
        controller: 'ResultSection1Ctrl'
    });

    $stateProvider.state('root.quizSection1.question', {
        url: '/{pageNumber}',
        data: {
            bodyClass: 'section1QuestionSlide',
        },
        templateUrl: 'html/quiz/question.html',
        controller: 'QuizCtrl'
    });

    $stateProvider.state('root.quizSection2', {
        url: '/segundo-bloque',
        data: {
            stepNumber: 2
        },
        views: {
            'container@': {
                templateUrl: 'html/quiz/index.html',
            }
        }
    });

    $stateProvider.state('root.quizSection2.result', {
        url: '/resultados',
        data: {
            bodyClass: 'section2ResultSlide',
        },
        templateUrl: 'html/quiz/section2-result.html',
        controller: 'ResultSection2Ctrl'
    });

    $stateProvider.state('root.quizSection2.question', {
        url: '/{pageNumber}',
        data: {
            bodyClass: 'section2QuestionSlide',
        },
        templateUrl: 'html/quiz/question.html',
        controller: 'QuizCtrl'
    });
          
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/bienvenido');

});
