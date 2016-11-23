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
        templateUrl: 'html/sign-up/class-code.html'
    });

    $stateProvider.state('root.signUpForm.studentData', {
        url: '/informacion',
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
        templateUrl: 'html/quiz/section1-result.html'
    });

    $stateProvider.state('root.quizSection1.question', {
        url: '/{pageNumber}',
        templateUrl: 'html/quiz/question.html',
        controller: 'QuizCtrl'
    });
          
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/bienvenido');

});
