// Routes Config
// =============================================================================
angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.html5Mode({
        enabled: true
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
        url: '/primer-paso',
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
        templateUrl: 'html/quiz/section1-result.html'
    });

    $stateProvider.state('root.quizSection1.question', {
        url: '/{pageNumber}',
        data: {
            bodyClass: 'section1QuestionSlide',
        },
        templateUrl: 'html/quiz/question.html',
        controller: 'QuizCtrl'
    });
          
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/bienvenido');

});
