(function(angular){
'use strict';
// App Config
// =============================================================================
angular.module('app', ['ngAnimate', 'ui.router', 'rzModule', 'pascalprecht.translate', 
	'templates', 'ngDropdowns', 'ngDialog', 'firebase', 'chart.js', 'easypiechart']).run(function() {
	var config = {
    	apiKey: "AIzaSyDw_YugmuDa4zIj8LuOobtXRk3u1gMyc7E",
	    authDomain: "los-datos-y-vos.firebaseapp.com",
    	databaseURL: "https://los-datos-y-vos.firebaseio.com",
	    storageBucket: "los-datos-y-vos.appspot.com",
    	messagingSenderId: "893616193793"
	};
  	firebase.initializeApp(config);	
});
})(window.angular);
(function(angular){
'use strict';
// Routes Config
// =============================================================================
angular.module('app').config(["$locationProvider", "$stateProvider", "$urlRouterProvider", function($locationProvider, $stateProvider, $urlRouterProvider) {
    
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
         
    $stateProvider.state('root.quizSection3', {
        url: '/bloque-final',
        data: {
            stepNumber: 3
        },
        views: {
            'container@': {
                templateUrl: 'html/quiz/index.html',
            }
        }
    });

    $stateProvider.state('root.quizSection3.result', {
        url: '/resultados',
        data: {
            bodyClass: 'section3ResultSlide',
        },
        templateUrl: 'html/quiz/section3-result.html',
        controller: 'ResultSection3Ctrl'
    });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/bienvenido');

}]);
})(window.angular);
(function(angular){
'use strict';
// Messages Config
// =============================================================================
angular.module('app').config(['$translateProvider', function($translateProvider) {

	var translations = {
  		YOUR_DEPARTMENT: 'a) Tu {{key}}',
  		YOUR_PROVINCE: 'b) {{key}}',
  		YOUR_HOUSE_RESULT: 'Tu casa',
  		YOUR_DEPARTMENT_RESULT: 'Tu {{key}}',
  		YOUR_PROVINCE_RESULT: '{{key}}',
	};

	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.translations('es', translations).preferredLanguage('es');

}]);
})(window.angular);
(function(angular){
'use strict';
/**
 * @license MIT http://jseppi.mit-license.org/license.html
 */
(function (window, angular) {
  'use strict';

  var dd = angular.module('ngDropdowns', []);

  dd.run(['$templateCache', function ($templateCache) {
    $templateCache.put('ngDropdowns/templates/dropdownSelect.html', [
      '<div ng-class="{\'disabled\': dropdownDisabled}" class="wrap-dd-select" tabindex="0">',
      '<span class="selected">{{dropdownModel[labelField]}}</span>',
      '<ul class="dropdown">',
      '<li ng-repeat="item in dropdownSelect"',
      ' class="dropdown-item"',
      ' dropdown-select-item="item"',
      ' dropdown-item-label="labelField">',
      '</li>',
      '</ul>',
      '</div>'
    ].join(''));

    $templateCache.put('ngDropdowns/templates/dropdownSelectItem.html', [
      '<li ng-class="{divider: (dropdownSelectItem.divider && !dropdownSelectItem[dropdownItemLabel]), \'divider-label\': (dropdownSelectItem.divider && dropdownSelectItem[dropdownItemLabel])}">',
      '<a href="" class="dropdown-item"',
      ' ng-if="!dropdownSelectItem.divider"',
      ' ng-href="{{dropdownSelectItem.href}}"',
      ' ng-click="selectItem()">',
      '{{dropdownSelectItem[dropdownItemLabel]}}',
      '</a>',
      '<span ng-if="dropdownSelectItem.divider">',
      '{{dropdownSelectItem[dropdownItemLabel]}}',
      '</span>',
      '</li>'
    ].join(''));

    $templateCache.put('ngDropdowns/templates/dropdownMenu.html', [
      '<ul class="dropdown">',
      '<li ng-repeat="item in dropdownMenu"',
      ' class="dropdown-item"',
      ' dropdown-item-label="labelField"',
      ' dropdown-menu-item="item">',
      '</li>',
      '</ul>'
    ].join(''));

    $templateCache.put('ngDropdowns/templates/dropdownMenuItem.html', [
      '<li ng-class="{divider: dropdownMenuItem.divider, \'divider-label\': dropdownMenuItem.divider && dropdownMenuItem[dropdownItemLabel]}">',
      '<a href="" class="dropdown-item"',
      ' ng-if="!dropdownMenuItem.divider"',
      ' ng-href="{{dropdownMenuItem.href}}"',
      ' ng-click="selectItem()">',
      '{{dropdownMenuItem[dropdownItemLabel]}}',
      '</a>',
      '<span ng-if="dropdownMenuItem.divider">',
      '{{dropdownMenuItem[dropdownItemLabel]}}',
      '</span>',
      '</li>'
    ].join(''));

    $templateCache.put('ngDropdowns/templates/dropdownMenuWrap.html',
      '<div class="wrap-dd-menu" ng-class="{\'disabled\': dropdownDisabled}"></div>'
    );
  }]);

  dd.directive('dropdownSelect', ['DropdownService',
    function (DropdownService) {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          dropdownSelect: '=',
          dropdownModel: '=',
          dropdownItemLabel: '@',
          dropdownOnchange: '&',
          dropdownDisabled: '='
        },

        controller: ['$scope', '$element', function ($scope, $element) {
          $scope.labelField = $scope.dropdownItemLabel || 'text';

          DropdownService.register($element);

          this.select = function (selected) {
            if (!angular.equals(selected, $scope.dropdownModel)) {
                $scope.dropdownModel = selected;
            }
            $scope.dropdownOnchange({
              selected: selected
            });
            $element[0].blur(); //trigger blur to clear active
          };

          $element.bind('click', function (event) {
            event.stopPropagation();
            if (!$scope.dropdownDisabled) {
              DropdownService.toggleActive($element);
            }
          });

          $scope.$on('$destroy', function () {
            DropdownService.unregister($element);
          });
        }],
        templateUrl: 'ngDropdowns/templates/dropdownSelect.html'
      };
    }
  ]);

  dd.directive('dropdownSelectItem', [
    function () {
      return {
        require: '^dropdownSelect',
        replace: true,
        scope: {
          dropdownItemLabel: '=',
          dropdownSelectItem: '='
        },

        link: function (scope, element, attrs, dropdownSelectCtrl) {
          scope.selectItem = function () {
            if (scope.dropdownSelectItem.href) {
              return;
            }
            dropdownSelectCtrl.select(scope.dropdownSelectItem);
          };
        },

        templateUrl: 'ngDropdowns/templates/dropdownSelectItem.html'
      };
    }
  ]);

  dd.directive('dropdownMenu', ['$parse', '$compile', 'DropdownService', '$templateCache',
    function ($parse, $compile, DropdownService, $templateCache) {
      return {
        restrict: 'A',
        replace: false,
        scope: {
          dropdownMenu: '=',
          dropdownModel: '=',
          dropdownItemLabel: '@',
          dropdownOnchange: '&',
          dropdownDisabled: '='
        },

        controller: ['$scope', '$element', function ($scope, $element) {
          $scope.labelField = $scope.dropdownItemLabel || 'text';

          var $template = angular.element($templateCache.get('ngDropdowns/templates/dropdownMenu.html'));
          // Attach this controller to the element's data
          $template.data('$dropdownMenuController', this);

          var tpl = $compile($template)($scope);
          var $wrap = $compile(
            angular.element($templateCache.get('ngDropdowns/templates/dropdownMenuWrap.html'))
          )($scope);

          $element.replaceWith($wrap);
          $wrap.append($element);
          $wrap.append($template);

          DropdownService.register(tpl);

          this.select = function (selected) {
            if (!angular.equals(selected, $scope.dropdownModel)) {
                $scope.dropdownModel = selected;
            }
            $scope.dropdownOnchange({
              selected: selected
            });
          };

          $element.bind('click', function (event) {
            event.stopPropagation();
            if (!$scope.dropdownDisabled) {
              DropdownService.toggleActive(tpl);
            }
          });

          $scope.$on('$destroy', function () {
            DropdownService.unregister(tpl);
          });
        }]
      };
    }
  ]);

  dd.directive('dropdownMenuItem', [
    function () {
      return {
        require: '^dropdownMenu',
        replace: true,
        scope: {
          dropdownMenuItem: '=',
          dropdownItemLabel: '='
        },

        link: function (scope, element, attrs, dropdownMenuCtrl) {
          scope.selectItem = function () {
            if (scope.dropdownMenuItem.href) {
              return;
            }
            dropdownMenuCtrl.select(scope.dropdownMenuItem);
          };
        },

        templateUrl: 'ngDropdowns/templates/dropdownMenuItem.html'
      };
    }
  ]);

  dd.factory('DropdownService', ['$document',
    function ($document) {
      var body = $document.find('body'),
        service = {},
        _dropdowns = [];

      body.bind('click', function () {
        angular.forEach(_dropdowns, function (el) {
          el.removeClass('active');
        });
      });

      service.register = function (ddEl) {
        _dropdowns.push(ddEl);
      };

      service.unregister = function (ddEl) {
        var index;
        index = _dropdowns.indexOf(ddEl);
        if (index > -1) {
          _dropdowns.splice(index, 1);
        }
      };

      service.toggleActive = function (ddEl) {
        angular.forEach(_dropdowns, function (el) {
          if (el !== ddEl) {
            el.removeClass('active');
          }
        });

        ddEl.toggleClass('active');
      };

      service.clearActive = function () {
        angular.forEach(_dropdowns, function (el) {
          el.removeClass('active');
        });
      };

      service.isActive = function (ddEl) {
        return ddEl.hasClass('active');
      };

      return service;
    }
  ]);
})(window, window.angular);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').directive("svgMap", function() {
  return {
    restrict: "E",
    replace: true,
    template: "<object type='image/svg+xml' id='locationMap' class='student-info__maps'></object>",
    link: function(scope, element, attrs) {

      var init = function() {
        var departmentChanged = function(newValue, oldValue) {
          if(newValue.id) {
            var oldSelectedDepartment = angular.element(element[0].getSVGDocument().getElementsByClassName("selected"));
            oldSelectedDepartment.removeClass("selected");
            if(oldSelectedDepartment.length > 0) {
              oldSelectedDepartment[0].children[0].style.fill="#F2F2F2";
            }
            var selectedDepartment = angular.element(element[0].getSVGDocument().getElementById(("00" + newValue.id).slice(-5)));
            if(selectedDepartment.length) {
              selectedDepartment.addClass("selected");
              selectedDepartment.children('path')[0].style.fill="#FFEAA8";
            }
          }
        };
        departmentChanged(scope.studentData.department);
        scope.$watch(attrs.department, departmentChanged);
      }

      var provinceChanged = function(newValue, oldValue) {
        if(newValue.id) {
          element[0].data = "img/maps/" + newValue.id + ".svg";
        }
      };
      scope.$watch(attrs.province, provinceChanged);

      if (element[0].getSVGDocument()) {
        init();
      } else {
        element.on('load', init);
      }

    }
  }
});
})(window.angular);
(function(angular){
'use strict';
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
                            text: "1. En estos lugares que te detallamos, y teniendo en cuenta todas las personas que viven ahí, ¿qué porcentaje creés que son chicos de entre 15 y 18 años?",
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
                            text: "2. Contanos cuántas habitaciones hay en tu casa:"
                        },
                        {
                            id: "avgPersonsPerHouse",
                            type: "numeric_multiple_option",
                            text: "3. Cuántas personas, en promedio, creés que duermen por habitación en:",
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
                            text: "2. Contanos qué porcentaje de personas creés que viven en un lugar alquilado en:",
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
})(window.angular);
(function(angular){
'use strict';
angular.module('app').factory('EventBusSvc', ["$rootScope", function($rootScope) {
	
	/**
     * @description
     * Subscribes a callback to the given application wide event
     *
     * @param {String} eventName The name of the event to subscribe to.
     * @param {Function} callback A callback which is fire when the event is raised.
     * @return {Function} A function tht can be called to unsubscrive to the event.
     */
    var subscribe = function(eventName, callback) {
        return $rootScope.$on(eventName, callback);
    },
    
    /**
     * @description
     * Broadcasts the given event and data.
     *
     * @param {String} eventName The name of the event to broadcast.
     * @param {object} data A data object that will be passed along with the event.
     */
    broadcast = function(eventName, data) {
        $rootScope.$emit(eventName, data);
    };

    return {
        subscribe: subscribe,
        broadcast: broadcast
    };

}]);})(window.angular);
(function(angular){
'use strict';
angular.module('app').service('LocationIndicatorSvc', ["$q", "$http", "$filter", function($q, $http, $filter) {

    var getProvinceList = function() {
        var defer = $q.defer();
        $http.get("data/indicadores_provincia.json").success(function(data) {
            var list = []; 
            angular.forEach(data, function(element) {
                list.push({
                    id: element.provincia_id, 
                    name: element.provincia_nombre,
                    youngProportion: element.jovenes_proporcion,
                    schoolAttendance: element.jovenes_asistencia_escolar,
                    avgPersonsPerHouse: element.personas_por_cuarto,
                    personsRentingHouses: element.propietarios_vivienda_proporcion
                });
            });
            defer.resolve($filter('orderBy')(list, 'name'));
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    var getDepartmentList = function() {
        var defer = $q.defer();
        $http.get("data/indicadores_departamento.json").success(function(data) {
            var list = []; 
            angular.forEach(data, function(element) {
                list.push({
                    id: element.departamento_id, 
                    name: element.departamento_nombre != "" ? element.departamento_nombre : "Blank", 
                    provinceId: element.provincia_id,
                    youngProportion: element.jovenes_proporcion,
                    schoolAttendance: element.jovenes_asistencia_escolar,
                    avgPersonsPerHouse: element.personas_por_cuarto,
                    personsRentingHouses: element.propietarios_vivienda_proporcion
                });
            });
            defer.resolve($filter('orderBy')(list, 'name'));
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    var getNeighbourhoodList = function() {
        var defer = $q.defer();
        this.getDepartmentList().then(function(departments) {
            $http.get("data/barrios_caba.json").success(function(data) {
                var list = []; 
                angular.forEach(data, function(element) {
                    var department = $filter('filter')(departments, { id: element.comuna_id}, true)[0];
                    if(!department) {
                        department = {};
                    }
                    list.push({
                        id: element.comuna_id, 
                        name: element.barrio_nombre, 
                        departmentName: element.comuna_nombre,
                        youngProportion: department.youngProportion || 0,
                        schoolAttendance: department.schoolAttendance || 0,
                        avgPersonsPerHouse: department.avgPersonsPerHouse || 0,
                        personsRentingHouses: department.personsRentingHouses || 0
                    });
                });
                defer.resolve($filter('orderBy')(list, 'name'));
            }).catch(function(data) {
                defer.reject(data);
            });
        });
        return defer.promise;
    };

    return {
        getProvinceList: getProvinceList,
        getDepartmentList: getDepartmentList,
        getNeighbourhoodList: getNeighbourhoodList
    };

}]);})(window.angular);
(function(angular){
'use strict';
angular.module('app').service('QuizSvc', ["$q", "$http", "QuizFactory", function($q, $http, QuizFactory) {

    var getSectionData = function(sectionNumber) {
        return QuizFactory[sectionNumber];
    };

    return {
        getSectionData: getSectionData
    };

}]);})(window.angular);
(function(angular){
'use strict';
angular.module('app').factory('StudentDataSvc', function() {
	
    var studentData = {};
    var savedData = localStorage.getItem("studentData");
    if(savedData) {
        studentData = JSON.parse(savedData);
    }
	
    var clearStudentData = function() {
        localStorage.removeItem("studentData");
        studentData = {};
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

});})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('AppCtrl', ["$scope", function($scope) {
    
    var ctrl = this;
    ctrl.bodyClass = 'defaultSlide';

    $scope.$on('$stateChangeSuccess', function ($event, $toState, $toParams) {
        if (angular.isDefined($toState.data.bodyClass)) {
            ctrl.bodyClass = $toState.data.bodyClass;
            return;
        }
        ctrl.bodyClass = 'defaultSlide';
    });

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('HeaderCtrl', ["$scope", "$state", "EventBusSvc", "StudentDataSvc", "ngDialog", function($scope, $state, EventBusSvc, StudentDataSvc, ngDialog) {
    
    $scope.step = {};
    $scope.studentData = StudentDataSvc.getStudentData();

    $scope.$on('$stateChangeSuccess', function ($event, $toState, $toParams) {
        document.getElementById('header').scrollIntoView();
        $scope.displayClassCode = true;
        switch ($state.current.name) {
            case 'root.welcome':
                StudentDataSvc.clearStudentData();
                $scope.studentData = StudentDataSvc.getStudentData();
                $scope.displayClassCode = false;
                break;
            case 'root.signUpForm.classCode':
                $scope.displayClassCode = false;
                break;
            case 'root.signUpForm.studentData':
            	EventBusSvc.broadcast('updateStep', {
                    name: 'PRIMER BLOQUE', 
                    number: 1
                });
                break;
            case 'root.quizSection1.question':
                var baseStepNumber = 1;
                EventBusSvc.broadcast('updateStep', { 
                    name: 'PRIMER BLOQUE', 
                    number: baseStepNumber + parseInt($toParams.pageNumber)
                });
                break;
            case 'root.quizSection1.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'PRIMER BLOQUE', 
                    number: 4
                });
                break;
            case 'root.quizSection2.question':
                var baseStepNumber = 4;
                EventBusSvc.broadcast('updateStep', { 
                    name: 'SEGUNDO BLOQUE', 
                    number: baseStepNumber + parseInt($toParams.pageNumber)
                });
                break;
            case 'root.quizSection2.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'SEGUNDO BLOQUE', 
                    number: 7
                });
                break;
            case 'root.quizSection3.result':
                EventBusSvc.broadcast('updateStep', { 
                    name: 'BLOQUE FINAL', 
                    number: 8
                });
                break;
        }
    });

    EventBusSvc.subscribe('updateClassCode', function(event, classCode) {
    	$scope.studentData.classCode = classCode;
    });

    EventBusSvc.subscribe('updateStep', function(event, step) {
    	$scope.stepName = step.name;
    	$scope.progressStyle = { 'width' : (100 / 8) * step.number + '%' };
    });

    $scope.openAboutModal = function() {
        ngDialog.open({ template: 'html/default/about.html', className: 'ngdialog-theme-default', width: '80%' });
    };

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('QuizCtrl', ["$scope", "$state", "$stateParams", "EventBusSvc", "StudentDataSvc", "QuizSvc", "$firebaseArray", function($scope, $state, $stateParams, EventBusSvc, 
    StudentDataSvc, QuizSvc, $firebaseArray) {

    $scope.studentData = StudentDataSvc.getStudentData();
    
    var ref = firebase.database().ref().child("studentsPerClass/" + $scope.studentData.classCode);
    $scope.studentsPerClass = $firebaseArray(ref);

    $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
    $scope.pageData = $scope.sectionData.pages[$stateParams.pageNumber];
    $scope.sliderOptions = {
        floor: 0,
        ceil: 100,
        hideLimitLabels: true,
        showTicks: true,
        ticksArray: [0, 50, 100]
    };

    $scope.keys = [];
    $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
    $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "" : "Provincia de ") + $scope.studentData.province.name;

    $scope.goToNextPage = function(pageNumber) {
        var questionStateName = "root.quizSection{{stepNumber}}.question".replace("{{stepNumber}}", $state.current.data.stepNumber);
        var resultStateName = "root.quizSection{{stepNumber}}.result".replace("{{stepNumber}}", $state.current.data.stepNumber);
        StudentDataSvc.updateStudentData($scope.studentData);
        if(!!pageNumber) {
            $state.go(questionStateName, { pageNumber: pageNumber});
        } else {
            if ($state.current.data.stepNumber == 2) {
                $scope.studentsPerClass.$add($scope.studentData);
            }
            $state.go(resultStateName);
        }
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.initNumericValue = function(questionId, optionId) {
        if(!$scope.studentData[$scope.sectionData.id]) {
            $scope.studentData[$scope.sectionData.id] = {};
        }
        if(!$scope.studentData[$scope.sectionData.id][questionId]) {
            if(!optionId) {
                $scope.studentData[$scope.sectionData.id][questionId] = 0;
            } else {
                $scope.studentData[$scope.sectionData.id][questionId] = {};
            }
        }
        if(!$scope.studentData[$scope.sectionData.id][questionId][optionId] && optionId) {
            $scope.studentData[$scope.sectionData.id][questionId][optionId] = 0;
        }
    };

    $scope.decrementNumericValue = function(questionId, optionId) {
        var value = optionId ? $scope.studentData[$scope.sectionData.id][questionId][optionId]:
            $scope.studentData[$scope.sectionData.id][questionId];
        if((value -1) >= $scope.sliderOptions.floor) {
            if(optionId) {
                $scope.studentData[$scope.sectionData.id][questionId][optionId] -= 1;
            } else {
                $scope.studentData[$scope.sectionData.id][questionId] -= 1;
            }
        }
    };

    $scope.incrementNumericValue = function(questionId, optionId) {
        var value = optionId ? $scope.studentData[$scope.sectionData.id][questionId][optionId]:
            $scope.studentData[$scope.sectionData.id][questionId];
        if((value +1) <= $scope.sliderOptions.ceil) {
            if(optionId) {
                $scope.studentData[$scope.sectionData.id][questionId][optionId] += 1;
            } else {
                $scope.studentData[$scope.sectionData.id][questionId] += 1;
            }
        }
    };

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('ResultSection1Ctrl', ["$scope", "$state", "StudentDataSvc", "QuizSvc", "LocationIndicatorSvc", function($scope, $state, StudentDataSvc, QuizSvc, LocationIndicatorSvc) {
    
    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);
        
        $scope.keys = [];
        $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
        $scope.keys['YOUR_PROVINCE'] = $scope.studentData.province.name;

        $scope.calculateResults();
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.calculateResults = function() {
        $scope.results = [];
        angular.forEach($scope.sectionData.pages, function(sectionPages) {
            angular.forEach(sectionPages.questions, function(question) {
                var questionResults = {
                    questionText: question.text,
                    options: []
                };
                angular.forEach(question.options, function(option) {
                    var optionResult = {
                        optionText: option.textKey
                    };
                    optionResult.yourAnswer = $scope.studentData[$scope.sectionData.id][question.id][option.id];
                    if(option.id == "department") {
                        optionResult.censusResult = ($scope.studentData.department[question.id]*100);
                    } else if(option.id == "province") {
                        optionResult.censusResult = ($scope.studentData.province[question.id]*100);
                    }
                    questionResults.options.push(optionResult);
                });
                $scope.results.push(questionResults);
            });
        });
    };

    activate();

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('ResultSection2Ctrl', ["$scope", "$state", "StudentDataSvc", "QuizSvc", "LocationIndicatorSvc", "$firebaseArray", function($scope, $state, StudentDataSvc, QuizSvc, 
        LocationIndicatorSvc, $firebaseArray) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.sectionData = QuizSvc.getSectionData($state.current.data.stepNumber);

        $scope.keys = [];
        $scope.keys['YOUR_DEPARTMENT'] = $scope.studentData.province.id == 2 ? 'comuna' : 'departamento';
        $scope.keys['YOUR_PROVINCE'] = ($scope.studentData.province.id == 2 ? "" : "Provincia de ") + $scope.studentData.province.name;

        var ref = firebase.database().ref().child("studentsPerClass/" + $scope.studentData.classCode);
        $scope.studentsPerClass = $firebaseArray(ref);

        $scope.studentsPerClass.$loaded().then(function() {
            $scope.calculateResults();
            $scope.displayResults = true;
            $scope.studentsPerClass.$watch(function() {
                $scope.calculateResults();
            })
        });
    };

    $scope.getTranslationKey = function(keyName) {
        return {
            key: $scope.keys[keyName]
        };
    };

    $scope.calculateResults = function() {
        $scope.results = {};

        $scope.classAverages = {
            avgPersonsPerHouse: {
                yourHouse: 0,
                yourDepartment: 0,
                yourProvince: 0
            },
            personsRentingHouses: {
                department: 0,
                province: 0
            },
            rentedHouse: 0
        };

        angular.forEach($scope.studentsPerClass, function(student) {
            $scope.classAverages.avgPersonsPerHouse.yourHouse += student[$scope.sectionData.id]["personsPerHouse"] /
                        student[$scope.sectionData.id]["roomsPerHouse"]
            $scope.classAverages.avgPersonsPerHouse.yourDepartment += student[$scope.sectionData.id]["avgPersonsPerHouse"]['department'];
            $scope.classAverages.avgPersonsPerHouse.yourProvince += student[$scope.sectionData.id]["avgPersonsPerHouse"]['province'];
            $scope.classAverages.personsRentingHouses.department += student[$scope.sectionData.id]["personsRentingHouses"]['department'];
            $scope.classAverages.personsRentingHouses.province += student[$scope.sectionData.id]["personsRentingHouses"]['province'];
            $scope.classAverages.personsRentingHouses.province += student[$scope.sectionData.id]["personsRentingHouses"]['province'];
            $scope.classAverages.rentedHouse += parseInt(student[$scope.sectionData.id]["rentedHouse"]);
        });

        angular.forEach($scope.sectionData.pages, function(sectionPage) {
            if(sectionPage.id == "avgPersonsPerHouse") {
                var questionResults = {
                    questionText: "Personas que duermen por habitación en promedio:",
                    options: []
                };
                questionResults.options.push({
                    optionText: "YOUR_HOUSE",
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["personsPerHouse"] /
                        $scope.studentData[$scope.sectionData.id]["roomsPerHouse"],
                    yourClass: $scope.classAverages.avgPersonsPerHouse.yourHouse / $scope.studentsPerClass.length
                });
                questionResults.options.push({
                    optionText: "YOUR_DEPARTMENT",
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["avgPersonsPerHouse"]['department'],
                    censusResult: $scope.studentData.department["avgPersonsPerHouse"],
                    yourClass: $scope.classAverages.avgPersonsPerHouse.yourDepartment / $scope.studentsPerClass.length
                });
                questionResults.options.push({
                    optionText: "YOUR_PROVINCE",
                    yourAnswer: $scope.studentData[$scope.sectionData.id]["avgPersonsPerHouse"]['province'],
                    censusResult: $scope.studentData.province["avgPersonsPerHouse"],
                    yourClass: $scope.classAverages.avgPersonsPerHouse.yourProvince / $scope.studentsPerClass.length
                });
                $scope.results[sectionPage.id] = questionResults;
            }
            if(sectionPage.id == "avgRentingHouse") {
                var avgRentingHouseResults = {};

                angular.forEach(sectionPage.questions, function(question) {
                    if(question.id == "rentedHouse") {
                        var yesPercentage = Math.round($scope.classAverages.rentedHouse * 100 / $scope.studentsPerClass.length);
                        var noPercentage = 100 - yesPercentage;
                        var rentedHouseResults = {
                            questionText: "Vive en un lugar alquilado:",
                            optionText: "Vivís en una vivienda alquilada?",
                            yourAnswer: parseInt($scope.studentData[$scope.sectionData.id]["rentedHouse"]) ? 'Sí' : 'No',
                            yourClass: {
                                labels: ['Sí', 'No'],
                                data: [yesPercentage, noPercentage],
                                colors: ['#EEEEEE', '#34D1E2'],
                                options: {
                                    legend: {
                                        display: true,
                                        labels: {
                                            generateLabels: function(chart) {
                                                return chart.data.labels.map(function(label, i) {
                                                    var meta = chart.getDatasetMeta(0);
                                                    var ds = chart.data.datasets[0];
                                                    var arc = meta.data[i];
                                                    var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                                                    var arcOpts = chart.options.elements.arc;
                                                    var fill = ds.backgroundColor[i];
                                                    var stroke = getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                                    var bw = getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
                                                    return {
                                                        text:  label + ' ' + ds.data[i] + " %",
                                                        fillStyle: fill,
                                                        strokeStyle: stroke,
                                                        lineWidth: bw,
                                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                                        index: i
                                                    };
                                                });
                                            }
                                        }
                                    }                                }
                            }
                        };
                        avgRentingHouseResults.rentedHouse = rentedHouseResults
                    }
                    if(question.id == "personsRentingHouses") {
                        var questionResults = {
                            questionText: "Porcentaje de personas que vive en un lugar alquilado en:",
                            options: []
                        };
                        angular.forEach(question.options, function(option) {
                            var optionResult = {
                                optionText: option.textKey
                            };
                            optionResult.yourAnswer = $scope.studentData[$scope.sectionData.id][question.id][option.id];
                            optionResult.yourClass = $scope.classAverages[question.id][option.id] / $scope.studentsPerClass.length;
                            optionResult.censusResult = ($scope.studentData[option.id][question.id]*100);
                            questionResults.options.push(optionResult);
                        });
                        avgRentingHouseResults.personsRentingHouses = questionResults;
                    }
                });

                $scope.results[sectionPage.id] = avgRentingHouseResults;
            }
        });
    };

    activate();

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('ResultSection3Ctrl', ["$scope", "$state", "$filter", "StudentDataSvc", "LocationIndicatorSvc", function($scope, $state, $filter, StudentDataSvc, LocationIndicatorSvc) {

    var activate = function() {
        $scope.studentData = StudentDataSvc.getStudentData();
        $scope.comparisonType = 'youngProportion';
        $scope.currentDepartment = null;
        $scope.currentValue = 100;
        $scope.mapControl = {};

        initPieChart();

        LocationIndicatorSvc.getProvinceList().then(function(data) {
            $scope.provinceList = data;
        });
        $scope.$watch("studentData.province", function(){
            initMap();
            updateDepartmentList();
        });

    };

    var initMap = function() {
        var comparisonMap = document.getElementById("comparisonMap");
        comparisonMap.data = "img/maps/" + $scope.studentData.province.id + ".svg";
        comparisonMap.onload = function() {
            $scope.closeTooltip();
            var pathElements = angular.element(comparisonMap.getSVGDocument().getElementsByTagName("g"));
            var rootElement;
            for(var i = 0; i < pathElements.length; i++) {
                var pathElement = pathElements[i];
                if (pathElement.id != null && !isNaN(pathElement.id) 
                    && pathElement.id == $scope.studentData.province.id) {
                  rootElement = pathElement;
                  rootElement.setAttribute('class', $scope.comparisonType);
                }
            }
            $scope.mapControl.map = rootElement;
            for(var i = 0; i < pathElements.length; i++) {
                var pathElement = pathElements[i];
                if (pathElement.id != null && !isNaN(pathElement.id) 
                    && pathElement.id != $scope.studentData.province.id) {
                    pathElement.classList.add("department")
                    pathElement.addEventListener('click', function(event) {
                    removeActiveTooltips();
                    showDepartmentTooltip(event);
              });
            }
        }
        };
    };

    var initPieChart = function() {
        $scope.pieChartOptions = {
            animate:{
                duration:0,
                enabled:false
            },
            barColor: function(percent) {
                var ctx = this.renderer.getCtx();
                var canvas = this.renderer.getCanvas();
                var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
                    gradient.addColorStop(0, "#45E3C1");
                    gradient.addColorStop(1, "#00CAF6");
                return gradient;
              },
            scaleColor:false,
            lineWidth:6,
            lineCap:'round',
            size: 70,
            trackColor: "#EEEEEE"
        };
    };

    var updateDepartmentList = function() {
        var provinceId = $scope.studentData.province && $scope.studentData.province.id ? $scope.studentData.province.id : 2;
        if(provinceId == 2) { // CABA
            LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
                $scope.departmentList = $filter('orderBy')(data, 'avgPersonsPerHouse');
                $scope.avgPersonsPerHouse = {
                    min: $scope.departmentList[0].avgPersonsPerHouse,
                    max: $scope.departmentList[$scope.departmentList.length - 1].avgPersonsPerHouse
                };
            });
        } else {
            LocationIndicatorSvc.getDepartmentList().then(function(data) {
                $scope.departmentList = $filter('orderBy')($filter('filter')(data, {provinceId: provinceId}, true),
                    'avgPersonsPerHouse');
                $scope.avgPersonsPerHouse = {
                    min: $scope.departmentList[0].avgPersonsPerHouse,
                    max: $scope.departmentList[$scope.departmentList.length - 1].avgPersonsPerHouse
                };

            });
        }
    };

    $scope.closeTooltip = function(event) {
    	var description = document.getElementById("descriptionDiv");
        description.classList.remove("active");
        removeActiveTooltips();
    };

    $scope.changeComparisonType = function(type) {
    	$scope.comparisonType = type;
    	$scope.updateNormalizedValue();
    	$scope.mapControl.map.setAttribute('class', type);
    };

  	$scope.updateNormalizedValue = function() {
  		if($scope.currentDepartment) {
	      	if($scope.comparisonType == 'avgPersonsPerHouse') {
                var comparisonValue = $scope.currentDepartment[$scope.comparisonType];
	          	$scope.currentValue = Math.round((comparisonValue - $scope.avgPersonsPerHouse.min) / 
                    ($scope.avgPersonsPerHouse.max - $scope.avgPersonsPerHouse.min) * 100);
	        } else {
	        	$scope.currentValue = Math.round($scope.currentDepartment[$scope.comparisonType] * 100);
	        }
        }
  	};

    var showDepartmentTooltip = function(event) {
    	$scope.$apply(function(){
    		var departmentId = parseInt(event.currentTarget.id);
	        var department = $filter('filter')($scope.departmentList, {id: departmentId})[0];
	        $scope.currentDepartment = department;

            var selectedDepartment = event.currentTarget;
            selectedDepartment.classList.add("active");

	        var description = document.getElementById("descriptionDiv");
	        var mapWrapper = document.getElementById("comparisonMap");
            description.classList.add("active");
		     //Position Tooltip were mouse clicked
	        description.style.left = event.clientX + mapWrapper.offsetLeft + "px";
	        //the 100 is used because of the tooltip height
	      	description.style.top =  event.clientY + mapWrapper.offsetTop - 118 + "px";
	      	$scope.updateNormalizedValue();
    	});
    };

    var removeActiveTooltips = function() {
        var map = document.getElementById("comparisonMap");
        var pathElements = angular.element(map.getSVGDocument().getElementsByClassName("department active"));
        for(var i = 0; i < pathElements.length; i++) {
            var pathElement = pathElements[i];
            pathElement.classList.remove("active");
        }
    };

    activate();

}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('signUpFormCtrl', ["$scope", "$state", "$filter", "EventBusSvc", "StudentDataSvc", "LocationIndicatorSvc", function($scope, $state, $filter, EventBusSvc, StudentDataSvc, LocationIndicatorSvc) {

	var activate = function() {
	    $scope.studentData = StudentDataSvc.getStudentData();
        $scope.defaultProvince = { name: "Provincia"};
        $scope.defaultDepartment = { name: "¿Dónde vivís?"};
	    LocationIndicatorSvc.getProvinceList().then(function(data) {
            $scope.provinceList = [$scope.defaultProvince]; 
	    	$scope.provinceList = $scope.provinceList.concat(data);
	    });
	    $scope.departmentList = [$scope.defaultDepartment]; 
        $scope.pageLoad = true;
    };

    var updateDepartmentList = function() {
        if(!$scope.pageLoad) {
            $scope.studentData['department'] = $scope.defaultDepartment;    
        } else {
            $scope.pageLoad = false;
        }
        var provinceId = $scope.studentData.province && $scope.studentData.province.id ? $scope.studentData.province.id : null;
        if(provinceId == 2) { // CABA
            LocationIndicatorSvc.getNeighbourhoodList().then(function(data) {
                $scope.departmentList = [$scope.defaultDepartment];
                $scope.departmentList = $scope.departmentList.concat(data);
            });
        } else {
        	LocationIndicatorSvc.getDepartmentList().then(function(data) {
                $scope.departmentList = [$scope.defaultDepartment];
                $scope.departmentList = $scope.departmentList.concat($filter('filter')(data, {provinceId: provinceId}, true));
    	    });
        }
    };

    $scope.$watch("studentData.province", function(){
    	updateDepartmentList();
    });
    
    $scope.initProvinceCombobox = function() {
        if(!$scope.studentData['province']) {
            $scope.studentData['province'] = $scope.defaultProvince;
        }
    };

    $scope.initDepartmentCombobox = function() {
        if(!$scope.studentData['department']) {
            $scope.studentData['department'] = $scope.defaultDepartment;
        }
    };

    $scope.saveClassCode = function() {
    	$state.go("root.signUpForm.studentData");
    	StudentDataSvc.updateStudentData($scope.studentData);
    	EventBusSvc.broadcast('updateClassCode', $scope.studentData.classCode);
    };

    $scope.saveStudentData = function() {
    	StudentDataSvc.updateStudentData($scope.studentData);
        $state.go("root.quizSection1.question", { pageNumber: 1});
    };
    
    activate();
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('app').controller('welcomeCtrl', ["$scope", function($scope) {
    
}]);
})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('index.html','<!DOCTYPE html><html ng-app="app" ng-controller="AppCtrl as appCtrl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--base href="/"--><title>Los datos y vos</title><script src="https://use.fontawesome.com/3d4418b16e.js"></script><link rel="stylesheet" href="css/style.css"></head><body class="{{ appCtrl.bodyClass }}"><header ui-view="header" id="header"></header><div ui-view="container" id="container" class="wrapper"></div><!-- App --><script src="js/vendor.js"></script><script src="js/bundle.js"></script></body></html>');
$templateCache.put('html/default/about.html','<div class="dialog"><h2 class="dialog__heading">Acerca</h2><p class="dialog__text">Esta aplicaci&oacute;n fue hecha con \u2764 por el Open Data Institute, los equipos de Datos e Innovaci&oacute;n P&uacute;blica del Ministerio de Modernizaci&oacute;n argentino, Aerolab y Eidos. Ahora es tuya, \xA1Disfrutala!</p><h2 class="dialog__heading">T&eacute;rminos de uso</h2><p class="dialog__text">Los datos que agregues a esta aplicaci&oacute;n no est&aacute;n asociados a ning&uacute;n apellido. S&oacute;lo guardamos la informaci&oacute;n por un breve per&iacute;odo, y en una planilla de c&aacute;lculo, para poder mostrarte visualizaciones en la aplicaci&oacute;n \xA1Usala tranquilo!</p></div>');
$templateCache.put('html/default/header.html','<div class="header"><div class="wrapper header__container"><div class="header__item header__item--1">Los datos y Vos</div><div ng-if="studentData.classCode && displayClassCode" class="header__item header__item--2 hidden-mobile"><div class="classCode header__code">Clase: {{studentData.classCode}}</div><div class="progress"><div class="header__progress-container"><div class="header__progress-bar" ng-style="progressStyle"></div></div><!-- <div class="header__section">{{stepName}}</div> --></div></div><div class="header__item header__item--3"><a href="" ng-click="openAboutModal()" class="header__acerca">Acerca</a></div></div><div ng-if="studentData.classCode && displayClassCode" class="header__item header__item--2 hidden-desktop"><div class="classCode header__code">Clase: {{studentData.classCode}}</div><div class="progress"><div class="header__progress-container"><div class="header__progress-bar" ng-style="progressStyle"></div></div><div class="header__section">{{stepName}}</div></div></div></div>');
$templateCache.put('html/quiz/index.html','<div ui-view></div>');
$templateCache.put('html/quiz/question.html','<form name="questionForm" ng-submit="questionForm.$valid && goToNextPage(pageData.nextPage)" novalidate><div ng-repeat="question in pageData.questions" class="{{question.type}} question__single-container"><div class="question__text">{{question.text}}</div><div class="question__option-wrapper" ng-if="question.type == \'slider\'"><div ng-repeat="option in question.options" ng-init="initNumericValue(question.id, option.id)" class="question__option-item"><p class="question__option">{{ option.textKey | translate: getTranslationKey(option.textKey) }}</p><div class="question__input"><span class="input-square input-square--left" ng-click="decrementNumericValue(question.id, option.id)"></span><rzslider rz-slider-model="studentData[sectionData.id][question.id][option.id]" rz-slider-options="sliderOptions"></rzslider><span class="input-square input-square--right" ng-click="incrementNumericValue(question.id, option.id)"></span></div></div></div><div ng-if="question.type == \'numeric_single_option\'"><div class="question__input"><span class="input-square input-square--left" ng-click="decrementNumericValue(question.id)"></span> <input type="number" ng-model="studentData[sectionData.id][question.id]" ng-init="initNumericValue(question.id)" class="question__number-input"> <span class="input-square input-square--right" ng-click="incrementNumericValue(question.id)"></span></div></div><div ng-if="question.type == \'radio_boolean\'"><div class="question__radio"><input type="radio" ng-model="studentData[sectionData.id][question.id]" value="1" id="radio-si" ng-required="!studentData[sectionData.id][question.id]"><div class="check"></div><label for="radio-si">S\xED</label></div><div class="question__radio"><input type="radio" ng-model="studentData[sectionData.id][question.id]" value="0" id="radio-no" ng-required="!studentData[sectionData.id][question.id]"><div class="check"></div><label for="radio-no">No</label></div></div><div class="question__option-wrapper" ng-if="question.type == \'numeric_multiple_option\'"><div ng-repeat="option in question.options" class="question__option-item"><p class="question__option">{{ option.textKey | translate: getTranslationKey(option.textKey) }}</p><div class="question__input"><span class="input-square input-square--left" ng-click="decrementNumericValue(question.id, option.id)"></span> <input type="number" ng-model="studentData[sectionData.id][question.id][option.id]" ng-init="initNumericValue(question.id, option.id)" class="question__number-input"> <span class="input-square input-square--right" ng-click="incrementNumericValue(question.id, option.id)"></span></div></div></div></div><button type="submit" class="btn center--mobile right--desktop">Siguiente</button></form>');
$templateCache.put('html/quiz/section1-result.html','<div><h2>\xA1Wow! \xBFTe imaginabas esto, {{studentData.name}}?</h2><div class="questionResult results" ng-repeat="question in results"><p>{{question.questionText}}</p><!-- Start table --><div class="Rtable Rtable--3cols"><!--Table Heading --><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tus respuestas</div><div class="Rtable__cell border__right--0 Rtable__heading">Censo Nacional del 2010</div><!--Table Body--><div ng-repeat="option in question.options" class="Rtable__results"><div class="Rtable__cell">{{ option.optionText.concat(\'_RESULT\') | translate: getTranslationKey(option.optionText) }}</div><div class="Rtable__cell results__yours"><span class="results__number">{{option.yourAnswer | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.yourAnswer | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div><div class="Rtable__cell"><span class="results__number">{{option.censusResult | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.censusResult | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div></div></div><!-- End table --></div><div><div class="results__bottom"><button ui-sref="root.quizSection2.question({pageNumber: 1})" class="btn center--mobile right--desktop">Siguiente</button></div></div></div>');
$templateCache.put('html/quiz/section2-result.html','<div ng-show="displayResults"><h2>\xA1Wow! \xBFTe imaginabas esto, {{studentData.name}}?</h2><div class="questionResult"><p>{{results.avgPersonsPerHouse.questionText}}</p><!-- Start table --><div class="Rtable Rtable--4cols"><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tus respuestas</div><div class="Rtable__cell Rtable__heading">Respuestas promedio de tu clase</div><div class="Rtable__cell border__right--0 Rtable__heading">Censo Nacional del 2010</div><div ng-repeat="option in results.avgPersonsPerHouse.options" class="Rtable__results"><div class="Rtable__cell Rtable__cell--per-promedio">{{ option.optionText.concat(\'_RESULT\') | translate: getTranslationKey(option.optionText) }}</div><div class="Rtable__cell Rtable__cell--per-promedio results__yours"><span class="results__promedio">{{option.yourAnswer | number:2}}</span> <span ng-if="option.yourAnswer" class="results__text">personas <span class="no-wrap">en promedio</span></span></div><div class="Rtable__cell Rtable__cell--per-promedio"><span class="results__promedio">{{option.yourClass | number:2}}</span> <span ng-if="option.yourAnswer" class="results__text">personas <span class="no-wrap">en promedio</span></span></div><div class="Rtable__cell Rtable__cell--per-promedio"><span class="results__promedio">{{option.censusResult | number:2}}</span> <span ng-if="option.censusResult" class="results__text">personas <span class="no-wrap">en promedio</span></span></div></div></div><!-- End table --></div><div class="questionResult"><p>{{results.avgRentingHouse.rentedHouse.questionText}}</p><!-- Start table --><div class="Rtable Rtable--3cols"><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tu respuesta</div><div class="Rtable__cell Rtable__heading border__right--0">Respuestas promedio de tu clase</div><div class="Rtable__results"><div class="Rtable__cell Rtable__cell--per-promedio">{{ results.avgRentingHouse.rentedHouse.optionText }}</div><div class="Rtable__cell Rtable__cell--per-promedio results__yours"><span class="results__promedio">{{ results.avgRentingHouse.rentedHouse.yourAnswer }}</span></div><div class="Rtable__cell Rtable__cell--per-promedio"><canvas id="doughnut" class="chart chart-doughnut" chart-data="results.avgRentingHouse.rentedHouse.yourClass.data" chart-labels="results.avgRentingHouse.rentedHouse.yourClass.labels" chart-colors="results.avgRentingHouse.rentedHouse.yourClass.colors" chart-options="results.avgRentingHouse.rentedHouse.yourClass.options"></canvas></div></div></div><!-- End table --></div><div class="questionResult results"><p>{{results.avgRentingHouse.personsRentingHouses.questionText}}</p><!-- Start table --><div class="Rtable Rtable--4cols"><!--Table Heading --><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tus respuestas</div><div class="Rtable__cell Rtable__heading">Respuestas promedio de tu clase</div><div class="Rtable__cell border__right--0 Rtable__heading">Censo Nacional del 2010</div><!--Table Body--><div ng-repeat="option in results.avgRentingHouse.personsRentingHouses.options" class="Rtable__results"><div class="Rtable__cell">{{ option.optionText.concat(\'_RESULT\') | translate: getTranslationKey(option.optionText) }}</div><div class="Rtable__cell results__yours"><span class="results__number">{{option.yourAnswer | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.yourAnswer | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div><div class="Rtable__cell"><span class="results__number">{{option.yourClass | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.yourClass | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div><div class="Rtable__cell"><span class="results__number">{{option.censusResult | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.censusResult | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div></div></div><!-- End table --></div><div><div class="results__bottom"><button ui-sref="root.quizSection3.result" class="btn center--mobile right--desktop">Siguiente</button></div></div></div>');
$templateCache.put('html/quiz/section3-result.html','<div class="wrapper"><h2 class="center">Aprende m&aacute;s de los datos</h2><p class="center main-centered-text">Selecciona una ubicaci\xF3n en el mapa que ves a contuaci\xF3n y observa los resultados.</p><div dropdown-select="provinceList" dropdown-model="studentData.province" dropdown-item-label="name" class="input--info"></div><div class="comparativo"><div class="comparativo__buttons"><div class="comparativo__btn" ng-click="changeComparisonType(\'youngProportion\')" ng-class="{selected: comparisonType == \'youngProportion\' }"><div class="comparativo__circle comparativo__circle--primary"></div><h4 class="comparativo__heading">Comparativa 01</h4><p class="comparativo__text">Chicos entre 15 y 18 a\xF1os en la poblaci&oacute;n</p></div><div class="comparativo__btn" ng-click="changeComparisonType(\'schoolAttendance\')" ng-class="{selected: comparisonType == \'schoolAttendance\' }"><div class="comparativo__circle comparativo__circle--secondary"></div><h4 class="comparativo__heading">Comparativa 02</h4><p class="comparativo__text">Chicos entre 15 y 18 que van a la escuela</p></div><div class="comparativo__btn" ng-click="changeComparisonType(\'avgPersonsPerHouse\')" ng-class="{selected: comparisonType == \'avgPersonsPerHouse\' }"><div class="comparativo__circle comparativo__circle--tertiary"></div><h4 class="comparativo__heading">Comparativa 03</h4><p class="comparativo__text">Promedio de personas por habitaci&oacute;n</p></div><div class="comparativo__btn" ng-click="changeComparisonType(\'personsRentingHouses\')" ng-class="{selected: comparisonType == \'personsRentingHouses\' }"><div class="comparativo__circle comparativo__circle--fourth"></div><h4 class="comparativo__heading">Comparativa 04</h4><p class="comparativo__text">Promedio de personas que vive en un lugar alquilado</p></div></div><div class="comparativo__map youngProportion" id="map-wrapper"><object type="image/svg+xml" id="comparisonMap" class="student-info__maps"></object><div id="descriptionDiv" class="description {{comparisonType}}"><a ng-click="closeTooltip()"><i class="fa fa-times description__close" aria-hidden="true"></i></a><div class="pieChart" easypiechart options="pieChartOptions" percent="currentValue"><div class="easypielabel" ng-if="comparisonType != \'avgPersonsPerHouse\'">{{currentValue}}%</div><div class="easypielabel" ng-if="comparisonType == \'avgPersonsPerHouse\'">{{currentDepartment[comparisonType] | number:2}}</div></div><p class="comparativo__comuna">{{currentDepartment.departmentName ? currentDepartment.departmentName : currentDepartment.name}}</p></div></div></div><div></div></div>');
$templateCache.put('html/sign-up/class-code.html','<div class="code-slide"><form name="classCodeForm" ng-submit="classCodeForm.$valid && saveClassCode()" novalidate><div class="center"><p class="code-slide__text">Escrib&iacute; el c&oacute;digo de la clase que te dio tu profe.</p><input type="text" class="code-slide__input" ng-model="studentData.classCode" placeholder="" required><div><button type="submit" class="btn btn--alternative">Siguiente</button></div></div></form></div>');
$templateCache.put('html/sign-up/index.html','<div ui-view></div>');
$templateCache.put('html/sign-up/student-data.html','<form name="studentDataForm" ng-submit="studentDataForm.$valid && studentData.department.id && saveStudentData()" novalidate><div class="student-info"><h2>Antes de empezar</h2><div class="student-info__inputs"><input type="text" ng-model="studentData.name" placeholder="Nombre" class="student-info__left input--info" required> <input type="number" ng-model="studentData.age" placeholder="Edad" class="student-info__right input--info" required><div dropdown-select="provinceList" dropdown-model="studentData.province" dropdown-item-label="name" ng-init="initProvinceCombobox()" placeholder="Provincia" class="student-info__left input--info" required></div><div dropdown-select="departmentList" dropdown-model="studentData.department" dropdown-item-label="name" ng-init="initDepartmentCombobox()" placeholder="\xBFD\xF3nde viv\xEDs?" class="student-info__right input--info" required></div></div><svg-map province="studentData.province" department="studentData.department"></svg-map><div><button type="submit" class="btn right--desktop center--mobile">Siguiente</button></div></div></form>');
$templateCache.put('html/welcome/index.html','<div class="center"><object type="image/svg+xml" data="img/illustrations/start-img.svg" class="welcome-slide__img"><img src="img/illustrations/start-img.png" class="welcome-slide__img"></object><h1>\xA1Bienvenido!</h1><h2 class="welcome-slide__subheading">A Los datos y vos</h2><div class="welcome-slide__text"><p class="main-centered-text">El Estado <b>crea un mont\xF3n de datos</b> todo el tiempo. Que est&eacute;n digitalizados en formatos abiertos y al alcance de todos es s&uacute;per importante para que podamos <b>usarlos, crear y compartirlos con libertad</b>.</p><p><b>Estos datos son suyos, \xA1veamos qu\xE9 descubr\xEDs!</b></p></div><div><a ui-sref="root.signUpForm.classCode" class="btn">Siguiente</a></div></div>');}]);})(window.angular);