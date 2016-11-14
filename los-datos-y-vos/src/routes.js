// Routes Config
// =============================================================================
angular.module('app').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    $locationProvider.html5Mode({
        enabled: true
    });

    $stateProvider        
        .state('root',{
            url: '',
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'html/default/header.html',
                    controller: 'HeaderCtrl'
                }
            }
        })
        .state('root.welcome', {
            url: '/welcome',
            views: {
                'container@': {
                    templateUrl: 'html/welcome/index.html',
                    controller: 'welcomeCtrl'
                }
            }
        })
        .state('root.signUpForm', {
            url: '/signUp',
            views: {
                'container@': {
                    templateUrl: 'html/sign-up/index.html',
                    controller: 'signUpFormCtrl'
                }
            }
        })
        .state('root.signUpForm.classCode', {
            url: '/classCode',
            templateUrl: 'html/sign-up/class-code.html'
        })
        .state('root.signUpForm.studentData', {
            url: '/studentData',
            templateUrl: 'html/sign-up/student-data.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/welcome');
});
