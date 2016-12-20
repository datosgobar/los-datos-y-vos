!function(e){"use strict";e.module("app",["ngAnimate","ui.router","rzModule","pascalprecht.translate","templates","ngDropdowns","ngDialog","firebase"]).run(function(){var e={apiKey:"AIzaSyBgL15t8NOSL0FjG-C180FFs9ZVVjxyCBw",authDomain:"deductive-reach-153014.firebaseapp.com",databaseURL:"https://deductive-reach-153014.firebaseio.com",storageBucket:"deductive-reach-153014.appspot.com",messagingSenderId:"385138051066"};firebase.initializeApp(e)})}(window.angular),function(e){"use strict";e.module("app").config(["$locationProvider","$stateProvider","$urlRouterProvider",function(e,t,s){e.html5Mode({enabled:!1}),t.state("root",{url:"",abstract:!0,views:{header:{templateUrl:"html/default/header.html",controller:"HeaderCtrl"}}}),t.state("root.welcome",{url:"/bienvenido",data:{bodyClass:"welcomeSlide"},views:{"container@":{templateUrl:"html/welcome/index.html",controller:"welcomeCtrl"}}}),t.state("root.signUpForm",{url:"/registro",views:{"container@":{templateUrl:"html/sign-up/index.html",controller:"signUpFormCtrl"}}}),t.state("root.signUpForm.classCode",{url:"/codigo-clase",data:{bodyClass:"classCodeSlide"},templateUrl:"html/sign-up/class-code.html"}),t.state("root.signUpForm.studentData",{url:"/informacion",data:{bodyClass:"studentDataSlide"},templateUrl:"html/sign-up/student-data.html"}),t.state("root.quizSection1",{url:"/primer-bloque",data:{stepNumber:1},views:{"container@":{templateUrl:"html/quiz/index.html"}}}),t.state("root.quizSection1.result",{url:"/resultados",data:{bodyClass:"section1ResultSlide"},templateUrl:"html/quiz/section1-result.html",controller:"ResultSection1Ctrl"}),t.state("root.quizSection1.question",{url:"/{pageNumber}",data:{bodyClass:"section1QuestionSlide"},templateUrl:"html/quiz/question.html",controller:"QuizCtrl"}),t.state("root.quizSection2",{url:"/segundo-bloque",data:{stepNumber:2},views:{"container@":{templateUrl:"html/quiz/index.html"}}}),t.state("root.quizSection2.result",{url:"/resultados",data:{bodyClass:"section2ResultSlide"},templateUrl:"html/quiz/section2-result.html",controller:"ResultSection2Ctrl"}),t.state("root.quizSection2.question",{url:"/{pageNumber}",data:{bodyClass:"section2QuestionSlide"},templateUrl:"html/quiz/question.html",controller:"QuizCtrl"}),s.otherwise("/bienvenido")}])}(window.angular),function(e){"use strict";e.module("app").config(["$translateProvider",function(e){var t={YOUR_DEPARTMENT:"a) Tu {{key}}",YOUR_PROVINCE:"b) {{key}}",YOUR_HOUSE_RESULT:"Tu casa",YOUR_DEPARTMENT_RESULT:"Tu {{key}}",YOUR_PROVINCE_RESULT:"{{key}}"};e.useSanitizeValueStrategy(null),e.translations("es",t).preferredLanguage("es")}])}(window.angular),function(e){"use strict";!function(e,t){var s=t.module("ngDropdowns",[]);s.run(["$templateCache",function(e){e.put("ngDropdowns/templates/dropdownSelect.html",['<div ng-class="{\'disabled\': dropdownDisabled}" class="wrap-dd-select" tabindex="0">','<span class="selected">{{dropdownModel[labelField]}}</span>','<ul class="dropdown">','<li ng-repeat="item in dropdownSelect"',' class="dropdown-item"',' dropdown-select-item="item"',' dropdown-item-label="labelField">',"</li>","</ul>","</div>"].join("")),e.put("ngDropdowns/templates/dropdownSelectItem.html",["<li ng-class=\"{divider: (dropdownSelectItem.divider && !dropdownSelectItem[dropdownItemLabel]), 'divider-label': (dropdownSelectItem.divider && dropdownSelectItem[dropdownItemLabel])}\">",'<a href="" class="dropdown-item"',' ng-if="!dropdownSelectItem.divider"',' ng-href="{{dropdownSelectItem.href}}"',' ng-click="selectItem()">',"{{dropdownSelectItem[dropdownItemLabel]}}","</a>",'<span ng-if="dropdownSelectItem.divider">',"{{dropdownSelectItem[dropdownItemLabel]}}","</span>","</li>"].join("")),e.put("ngDropdowns/templates/dropdownMenu.html",['<ul class="dropdown">','<li ng-repeat="item in dropdownMenu"',' class="dropdown-item"',' dropdown-item-label="labelField"',' dropdown-menu-item="item">',"</li>","</ul>"].join("")),e.put("ngDropdowns/templates/dropdownMenuItem.html",["<li ng-class=\"{divider: dropdownMenuItem.divider, 'divider-label': dropdownMenuItem.divider && dropdownMenuItem[dropdownItemLabel]}\">",'<a href="" class="dropdown-item"',' ng-if="!dropdownMenuItem.divider"',' ng-href="{{dropdownMenuItem.href}}"',' ng-click="selectItem()">',"{{dropdownMenuItem[dropdownItemLabel]}}","</a>",'<span ng-if="dropdownMenuItem.divider">',"{{dropdownMenuItem[dropdownItemLabel]}}","</span>","</li>"].join("")),e.put("ngDropdowns/templates/dropdownMenuWrap.html",'<div class="wrap-dd-menu" ng-class="{\'disabled\': dropdownDisabled}"></div>')}]),s.directive("dropdownSelect",["DropdownService",function(e){return{restrict:"A",replace:!0,scope:{dropdownSelect:"=",dropdownModel:"=",dropdownItemLabel:"@",dropdownOnchange:"&",dropdownDisabled:"="},controller:["$scope","$element",function(s,a){s.labelField=s.dropdownItemLabel||"text",e.register(a),this.select=function(e){t.equals(e,s.dropdownModel)||(s.dropdownModel=e),s.dropdownOnchange({selected:e}),a[0].blur()},a.bind("click",function(t){t.stopPropagation(),s.dropdownDisabled||e.toggleActive(a)}),s.$on("$destroy",function(){e.unregister(a)})}],templateUrl:"ngDropdowns/templates/dropdownSelect.html"}}]),s.directive("dropdownSelectItem",[function(){return{require:"^dropdownSelect",replace:!0,scope:{dropdownItemLabel:"=",dropdownSelectItem:"="},link:function(e,t,s,a){e.selectItem=function(){e.dropdownSelectItem.href||a.select(e.dropdownSelectItem)}},templateUrl:"ngDropdowns/templates/dropdownSelectItem.html"}}]),s.directive("dropdownMenu",["$parse","$compile","DropdownService","$templateCache",function(e,s,a,n){return{restrict:"A",replace:!1,scope:{dropdownMenu:"=",dropdownModel:"=",dropdownItemLabel:"@",dropdownOnchange:"&",dropdownDisabled:"="},controller:["$scope","$element",function(e,o){e.labelField=e.dropdownItemLabel||"text";var i=t.element(n.get("ngDropdowns/templates/dropdownMenu.html"));i.data("$dropdownMenuController",this);var r=s(i)(e),d=s(t.element(n.get("ngDropdowns/templates/dropdownMenuWrap.html")))(e);o.replaceWith(d),d.append(o),d.append(i),a.register(r),this.select=function(s){t.equals(s,e.dropdownModel)||(e.dropdownModel=s),e.dropdownOnchange({selected:s})},o.bind("click",function(t){t.stopPropagation(),e.dropdownDisabled||a.toggleActive(r)}),e.$on("$destroy",function(){a.unregister(r)})}]}}]),s.directive("dropdownMenuItem",[function(){return{require:"^dropdownMenu",replace:!0,scope:{dropdownMenuItem:"=",dropdownItemLabel:"="},link:function(e,t,s,a){e.selectItem=function(){e.dropdownMenuItem.href||a.select(e.dropdownMenuItem)}},templateUrl:"ngDropdowns/templates/dropdownMenuItem.html"}}]),s.factory("DropdownService",["$document",function(e){var s=e.find("body"),a={},n=[];return s.bind("click",function(){t.forEach(n,function(e){e.removeClass("active")})}),a.register=function(e){n.push(e)},a.unregister=function(e){var t;t=n.indexOf(e),t>-1&&n.splice(t,1)},a.toggleActive=function(e){t.forEach(n,function(t){t!==e&&t.removeClass("active")}),e.toggleClass("active")},a.clearActive=function(){t.forEach(n,function(e){e.removeClass("active")})},a.isActive=function(e){return e.hasClass("active")},a}])}(window,window.angular)}(window.angular),function(e){"use strict";e.module("app").directive("svgMap",function(){return{restrict:"E",replace:!0,template:"<object type='image/svg+xml' id='locationMap' class='student-info__maps'></object>",link:function(t,s,a){var n=function(){var n=function(t,a){if(t.id){var n=e.element(s[0].getSVGDocument().getElementsByClassName("selected"));n.removeClass("selected"),n.length>0&&(n[0].children[0].style.fill="#F2F2F2");var o=e.element(s[0].getSVGDocument().getElementById(("00"+t.id).slice(-5)));o.length&&(o.addClass("selected"),o.children("path")[0].style.fill="#FFEAA8")}};n(t.studentData.department),t.$watch(a.department,n)},o=function(e,t){e.id&&(s[0].data="img/maps/"+e.id+".svg")};t.$watch(a.province,o),s[0].getSVGDocument()?n():s.on("load",n)}}})}(window.angular),function(e){"use strict";e.module("app").factory("QuizFactory",function(){var e={1:{id:"section1",title:"Primer Paso",pages:{1:{previousPage:!1,nextPage:2,questions:[{id:"youngProportion",type:"slider",text:"1. En estos lugares que te detallamos, y teniendo en cuenta todas las personas que viven ahí, ¿qué porcentaje creés que son chicos de entre 15 y 18 años?",options:[{id:"department",textKey:"YOUR_DEPARTMENT"},{id:"province",textKey:"YOUR_PROVINCE"}]}]},2:{previousPage:1,nextPage:!1,questions:[{id:"schoolAttendance",type:"slider",text:"2. Contanos qué porcentaje de chicos de entre 15 y 18 años creés que van a la escuela en:",options:[{id:"department",textKey:"YOUR_DEPARTMENT"},{id:"province",textKey:"YOUR_PROVINCE"}]}]}}},2:{id:"section2",title:"Segundo Paso",pages:{1:{id:"avgPersonsPerHouse",previousPage:!1,nextPage:2,questions:[{id:"personsPerHouse",type:"numeric_single_option",text:"1. Contanos cuántas personas viven en tu casa:"},{id:"roomsPerHouse",type:"numeric_single_option",text:"2. Contanos cuántas habitaciones hay en tu casa:"},{id:"avgPersonsPerHouse",type:"numeric_multiple_option",text:"3. Cuántas personas, en promedio, creés que duermen por habitación en:",options:[{id:"department",textKey:"YOUR_DEPARTMENT"},{id:"province",textKey:"YOUR_PROVINCE"}]}]},2:{id:"avgRentingHouse",previousPage:1,nextPage:!1,questions:[{id:"rentedHouse",type:"radio_boolean",text:"1. El lugar en el que vos vivís, ¿es alquilado?"},{id:"personsRentingHouses",type:"slider",text:"2. Contanos qué porcentaje de personas creés que viven en un lugar alquilado en:",options:[{id:"department",textKey:"YOUR_DEPARTMENT"},{id:"province",textKey:"YOUR_PROVINCE"}]}]}}}};return e})}(window.angular),function(e){"use strict";e.module("app").factory("EventBusSvc",["$rootScope",function(e){var t=function(t,s){return e.$on(t,s)},s=function(t,s){e.$emit(t,s)};return{subscribe:t,broadcast:s}}])}(window.angular),function(e){"use strict";e.module("app").service("LocationIndicatorSvc",["$q","$http","$filter",function(t,s,a){var n=function(){var n=t.defer();return s.get("data/indicadores_provincia.json").success(function(t){var s=[];e.forEach(t,function(e){s.push({id:e.provincia_id,name:e.provincia_nombre,youngProportion:e.jovenes_proporcion,schoolAttendance:e.jovenes_asistencia_escolar,avgPersonsPerHouse:e.personas_por_cuarto,personsRentingHouses:e.propietarios_vivienda_proporcion})}),n.resolve(a("orderBy")(s,"name"))}).catch(function(e){n.reject(e)}),n.promise},o=function(){var n=t.defer();return s.get("data/indicadores_departamento.json").success(function(t){var s=[];e.forEach(t,function(e){s.push({id:e.departamento_id,name:""!=e.departamento_nombre?e.departamento_nombre:"Blank",provinceId:e.provincia_id,youngProportion:e.jovenes_proporcion,schoolAttendance:e.jovenes_asistencia_escolar,avgPersonsPerHouse:e.personas_por_cuarto,personsRentingHouses:e.propietarios_vivienda_proporcion})}),n.resolve(a("orderBy")(s,"name"))}).catch(function(e){n.reject(e)}),n.promise},i=function(){var n=t.defer();return this.getDepartmentList().then(function(t){s.get("data/barrios_caba.json").success(function(s){var o=[];e.forEach(s,function(e){var s=a("filter")(t,{id:e.comuna_id},!0)[0];s||(s={}),o.push({id:e.comuna_id,name:e.barrio_nombre,departmentName:e.comuna_nombre,youngProportion:s.youngProportion||0,schoolAttendance:s.schoolAttendance||0,avgPersonsPerHouse:s.avgPersonsPerHouse||0,personsRentingHouses:s.personsRentingHouses||0})}),n.resolve(a("orderBy")(o,"name"))}).catch(function(e){n.reject(e)})}),n.promise};return{getProvinceList:n,getDepartmentList:o,getNeighbourhoodList:i}}])}(window.angular),function(e){"use strict";e.module("app").service("QuizSvc",["$q","$http","QuizFactory",function(e,t,s){var a=function(e){return s[e]};return{getSectionData:a}}])}(window.angular),function(e){"use strict";e.module("app").factory("StudentDataSvc",function(){var e={},t=localStorage.getItem("studentData");t&&(e=JSON.parse(t));var s=function(){localStorage.removeItem("studentData"),e={}},a=function(){return e},n=function(e){localStorage.setItem("studentData",JSON.stringify(e))};return{clearStudentData:s,getStudentData:a,updateStudentData:n}})}(window.angular),function(e){"use strict";e.module("app").controller("AppCtrl",["$scope",function(t){var s=this;s.bodyClass="defaultSlide",t.$on("$stateChangeSuccess",function(t,a,n){return e.isDefined(a.data.bodyClass)?void(s.bodyClass=a.data.bodyClass):void(s.bodyClass="defaultSlide")})}])}(window.angular),function(e){"use strict";e.module("app").controller("HeaderCtrl",["$scope","$state","EventBusSvc","StudentDataSvc","ngDialog",function(e,t,s,a,n){e.step={},e.studentData=a.getStudentData(),e.$on("$stateChangeSuccess",function(n,o,i){switch(document.getElementById("header").scrollIntoView(),e.displayClassCode=!0,t.current.name){case"root.welcome":a.clearStudentData(),e.studentData=a.getStudentData(),e.displayClassCode=!1;break;case"root.signUpForm.classCode":e.displayClassCode=!1;break;case"root.signUpForm.studentData":s.broadcast("updateStep",{name:"PRIMER BLOQUE",number:1});break;case"root.quizSection1.question":var r=1;s.broadcast("updateStep",{name:"PRIMER BLOQUE",number:r+parseInt(i.pageNumber)});break;case"root.quizSection1.result":s.broadcast("updateStep",{name:"PRIMER BLOQUE",number:4});break;case"root.quizSection2.question":var r=4;s.broadcast("updateStep",{name:"SEGUNDO BLOQUE",number:r+parseInt(i.pageNumber)});break;case"root.quizSection2.result":s.broadcast("updateStep",{name:"SEGUNDO BLOQUE",number:7})}}),s.subscribe("updateClassCode",function(t,s){e.studentData.classCode=s}),s.subscribe("updateStep",function(t,s){e.stepName=s.name,e.progressStyle={width:100/7*s.number+"%"}}),e.openAboutModal=function(){n.open({template:"html/default/about.html",className:"ngdialog-theme-default",width:"80%"})}}])}(window.angular),function(e){"use strict";e.module("app").controller("QuizCtrl",["$scope","$state","$stateParams","EventBusSvc","StudentDataSvc","QuizSvc","$firebaseArray",function(e,t,s,a,n,o,i){e.studentData=n.getStudentData();var r=firebase.database().ref().child("studentsPerClass/"+e.studentData.classCode);e.studentsPerClass=i(r),e.sectionData=o.getSectionData(t.current.data.stepNumber),e.pageData=e.sectionData.pages[s.pageNumber],e.sliderOptions={floor:0,ceil:100,hideLimitLabels:!0,showTicks:!0,ticksArray:[0,50,100]},e.keys=[],e.keys.YOUR_DEPARTMENT=2==e.studentData.province.id?"comuna":"departamento",e.keys.YOUR_PROVINCE=(2==e.studentData.province.id?"":"Provincia de ")+e.studentData.province.name,e.goToNextPage=function(s){var a="root.quizSection{{stepNumber}}.question".replace("{{stepNumber}}",t.current.data.stepNumber),o="root.quizSection{{stepNumber}}.result".replace("{{stepNumber}}",t.current.data.stepNumber);n.updateStudentData(e.studentData),s?t.go(a,{pageNumber:s}):(2==t.current.data.stepNumber&&e.studentsPerClass.$add(e.studentData),t.go(o))},e.getTranslationKey=function(t){return{key:e.keys[t]}},e.initNumericValue=function(t,s){e.studentData[e.sectionData.id]||(e.studentData[e.sectionData.id]={}),e.studentData[e.sectionData.id][t]||(s?e.studentData[e.sectionData.id][t]={}:e.studentData[e.sectionData.id][t]=0),!e.studentData[e.sectionData.id][t][s]&&s&&(e.studentData[e.sectionData.id][t][s]=0)},e.decrementNumericValue=function(t,s){var a=s?e.studentData[e.sectionData.id][t][s]:e.studentData[e.sectionData.id][t];a-1>=e.sliderOptions.floor&&(s?e.studentData[e.sectionData.id][t][s]-=1:e.studentData[e.sectionData.id][t]-=1)},e.incrementNumericValue=function(t,s){var a=s?e.studentData[e.sectionData.id][t][s]:e.studentData[e.sectionData.id][t];a+1<=e.sliderOptions.ceil&&(s?e.studentData[e.sectionData.id][t][s]+=1:e.studentData[e.sectionData.id][t]+=1)}}])}(window.angular),function(e){"use strict";e.module("app").controller("ResultSection1Ctrl",["$scope","$state","StudentDataSvc","QuizSvc","LocationIndicatorSvc",function(t,s,a,n,o){var i=function(){t.studentData=a.getStudentData(),t.sectionData=n.getSectionData(s.current.data.stepNumber),t.keys=[],t.keys.YOUR_DEPARTMENT=2==t.studentData.province.id?"comuna":"departamento",t.keys.YOUR_PROVINCE=t.studentData.province.name,t.calculateResults()};t.getTranslationKey=function(e){return{key:t.keys[e]}},t.calculateResults=function(){t.results=[],e.forEach(t.sectionData.pages,function(s){e.forEach(s.questions,function(s){var a={questionText:s.text,options:[]};e.forEach(s.options,function(e){var n={optionText:e.textKey};n.yourAnswer=t.studentData[t.sectionData.id][s.id][e.id],"department"==e.id?n.censusResult=100*t.studentData.department[s.id]:"province"==e.id&&(n.censusResult=100*t.studentData.province[s.id]),a.options.push(n)}),t.results.push(a)})})},i()}])}(window.angular),function(e){"use strict";e.module("app").controller("ResultSection2Ctrl",["$scope","$state","StudentDataSvc","QuizSvc","LocationIndicatorSvc","$firebaseArray",function(t,s,a,n,o,i){var r=function(){t.studentData=a.getStudentData(),t.sectionData=n.getSectionData(s.current.data.stepNumber),t.keys=[],t.keys.YOUR_DEPARTMENT=2==t.studentData.province.id?"comuna":"departamento",t.keys.YOUR_PROVINCE=(2==t.studentData.province.id?"":"Provincia de ")+t.studentData.province.name;var e=firebase.database().ref().child("studentsPerClass/"+t.studentData.classCode);t.studentsPerClass=i(e),t.studentsPerClass.$loaded().then(function(){t.calculateResults(),t.displayResults=!0,t.studentsPerClass.$watch(function(){t.calculateResults()})})};t.getTranslationKey=function(e){return{key:t.keys[e]}},t.calculateResults=function(){t.results={},t.classAverages={avgPersonsPerHouse:{yourHouse:0,yourDepartment:0,yourProvince:0},personsRentingHouses:{department:0,province:0}},e.forEach(t.studentsPerClass,function(e){t.classAverages.avgPersonsPerHouse.yourHouse+=e[t.sectionData.id].personsPerHouse/e[t.sectionData.id].roomsPerHouse,t.classAverages.avgPersonsPerHouse.yourDepartment+=e[t.sectionData.id].avgPersonsPerHouse.department,t.classAverages.avgPersonsPerHouse.yourProvince+=e[t.sectionData.id].avgPersonsPerHouse.province,t.classAverages.personsRentingHouses.department+=e[t.sectionData.id].personsRentingHouses.department,t.classAverages.personsRentingHouses.province+=e[t.sectionData.id].personsRentingHouses.province}),e.forEach(t.sectionData.pages,function(s){if("avgPersonsPerHouse"==s.id){var a={questionText:"Personas que duermen por habitación en promedio:",options:[]};a.options.push({optionText:"YOUR_HOUSE",yourAnswer:t.studentData[t.sectionData.id].personsPerHouse/t.studentData[t.sectionData.id].roomsPerHouse,yourClass:t.classAverages.avgPersonsPerHouse.yourHouse/t.studentsPerClass.length}),a.options.push({optionText:"YOUR_DEPARTMENT",yourAnswer:t.studentData[t.sectionData.id].avgPersonsPerHouse.department,censusResult:t.studentData.department.avgPersonsPerHouse,yourClass:t.classAverages.avgPersonsPerHouse.yourDepartment/t.studentsPerClass.length}),a.options.push({optionText:"YOUR_PROVINCE",yourAnswer:t.studentData[t.sectionData.id].avgPersonsPerHouse.province,censusResult:t.studentData.province.avgPersonsPerHouse,yourClass:t.classAverages.avgPersonsPerHouse.yourProvince/t.studentsPerClass.length}),t.results[s.id]=a}if("avgRentingHouse"==s.id){var n={};e.forEach(s.questions,function(s){if("rentedHouse"==s.id){var a={questionText:"Vive en un lugar alquilado:",optionText:"Vivís en una vivienda alquilada?",yourAnswer:parseInt(t.studentData[t.sectionData.id].rentedHouse)?"Sí":"No"};n.rentedHouse=a}if("personsRentingHouses"==s.id){var o={questionText:"Porcentaje de personas que vive en un lugar alquilado en:",options:[]};e.forEach(s.options,function(e){var a={optionText:e.textKey};a.yourAnswer=t.studentData[t.sectionData.id][s.id][e.id],a.yourClass=t.classAverages[s.id][e.id]/t.studentsPerClass.length,a.censusResult=100*t.studentData[e.id][s.id],o.options.push(a)}),n.personsRentingHouses=o}}),t.results[s.id]=n}})},r()}])}(window.angular),function(e){"use strict";e.module("app").controller("signUpFormCtrl",["$scope","$state","$filter","EventBusSvc","StudentDataSvc","LocationIndicatorSvc",function(e,t,s,a,n,o){var i=function(){e.studentData=n.getStudentData(),e.defaultProvince={name:"Provincia"},e.defaultDepartment={name:"¿Dónde vivís?"},o.getProvinceList().then(function(t){e.provinceList=[e.defaultProvince],e.provinceList=e.provinceList.concat(t)}),e.departmentList=[e.defaultDepartment],e.pageLoad=!0},r=function(){e.pageLoad?e.pageLoad=!1:e.studentData.department=e.defaultDepartment;var t=e.studentData.province&&e.studentData.province.id?e.studentData.province.id:null;2==t?o.getNeighbourhoodList().then(function(t){e.departmentList=[e.defaultDepartment],e.departmentList=e.departmentList.concat(t)}):o.getDepartmentList().then(function(a){e.departmentList=[e.defaultDepartment],e.departmentList=e.departmentList.concat(s("filter")(a,{provinceId:t},!0))})};e.$watch("studentData.province",function(){r()}),e.initProvinceCombobox=function(){e.studentData.province||(e.studentData.province=e.defaultProvince)},e.initDepartmentCombobox=function(){e.studentData.department||(e.studentData.department=e.defaultDepartment)},e.saveClassCode=function(){t.go("root.signUpForm.studentData"),n.updateStudentData(e.studentData),a.broadcast("updateClassCode",e.studentData.classCode)},e.saveStudentData=function(){n.updateStudentData(e.studentData),t.go("root.quizSection1.question",{pageNumber:1})},i()}])}(window.angular),function(e){"use strict";e.module("app").controller("welcomeCtrl",["$scope",function(e){}])}(window.angular),function(e){"use strict";e.module("templates",[]).run(["$templateCache",function(e){e.put("index.html",'<!DOCTYPE html><html ng-app="app" ng-controller="AppCtrl as appCtrl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--base href="/"--><title>Los datos y vos</title><link rel="stylesheet" href="css/style.css"></head><body class="{{ appCtrl.bodyClass }}"><header ui-view="header" id="header"></header><div ui-view="container" id="container" class="wrapper"></div><!-- App --><script src="js/vendor.js"></script><script src="js/bundle.js"></script></body></html>'),e.put("html/default/about.html",'<div class="dialog"><h2 class="dialog__heading">Acerca</h2><p class="dialog__text">Esta aplicaci&oacute;n fue hecha con ❤ por el Open Data Institute, los equipos de Datos e Innovaci&oacute;n P&uacute;blica del Ministerio de Modernizaci&oacute;n argentino, Aerolab y Eidos. Ahora es tuya, ¡Disfrutala!</p><h2 class="dialog__heading">T&eacute;rminos de uso</h2><p class="dialog__text">Los datos que agregues a esta aplicaci&oacute;n no est&aacute;n asociados a ning&uacute;n apellido. S&oacute;lo guardamos la informaci&oacute;n por un breve per&iacute;odo, y en una planilla de c&aacute;lculo, para poder mostrarte visualizaciones en la aplicaci&oacute;n ¡Usala tranquilo!</p></div>'),e.put("html/default/header.html",'<div class="header"><div class="wrapper header__container"><div class="header__item header__item--1">Los datos y Vos</div><div ng-if="studentData.classCode && displayClassCode" class="header__item header__item--2 hidden-mobile"><div class="classCode header__code">Clase: {{studentData.classCode}}</div><div class="progress"><div class="header__progress-container"><div class="header__progress-bar" ng-style="progressStyle"></div></div><!-- <div class="header__section">{{stepName}}</div> --></div></div><div class="header__item header__item--3"><a href="" ng-click="openAboutModal()" class="header__acerca">Acerca</a></div></div><div ng-if="studentData.classCode && displayClassCode" class="header__item header__item--2 hidden-desktop"><div class="classCode header__code">Clase: {{studentData.classCode}}</div><div class="progress"><div class="header__progress-container"><div class="header__progress-bar" ng-style="progressStyle"></div></div><div class="header__section">{{stepName}}</div></div></div></div>'),e.put("html/quiz/index.html","<div ui-view></div>"),e.put("html/quiz/question.html",'<form name="questionForm" ng-submit="questionForm.$valid && goToNextPage(pageData.nextPage)" novalidate><div ng-repeat="question in pageData.questions" class="{{question.type}} question__single-container"><div class="question__text">{{question.text}}</div><div class="question__option-wrapper" ng-if="question.type == \'slider\'"><div ng-repeat="option in question.options" ng-init="initNumericValue(question.id, option.id)" class="question__option-item"><p class="question__option">{{ option.textKey | translate: getTranslationKey(option.textKey) }}</p><div class="question__input"><span class="input-square input-square--left" ng-click="decrementNumericValue(question.id, option.id)"></span><rzslider rz-slider-model="studentData[sectionData.id][question.id][option.id]" rz-slider-options="sliderOptions"></rzslider><span class="input-square input-square--right" ng-click="incrementNumericValue(question.id, option.id)"></span></div></div></div><div ng-if="question.type == \'numeric_single_option\'"><div class="question__input"><span class="input-square input-square--left" ng-click="decrementNumericValue(question.id)"></span> <input type="number" ng-model="studentData[sectionData.id][question.id]" ng-init="initNumericValue(question.id)" class="question__number-input"> <span class="input-square input-square--right" ng-click="incrementNumericValue(question.id)"></span></div></div><div ng-if="question.type == \'radio_boolean\'"><div class="question__radio"><input type="radio" ng-model="studentData[sectionData.id][question.id]" value="1" id="radio-si" ng-required="!studentData[sectionData.id][question.id]"><div class="check"></div><label for="radio-si">Sí</label></div><div class="question__radio"><input type="radio" ng-model="studentData[sectionData.id][question.id]" value="0" id="radio-no" ng-required="!studentData[sectionData.id][question.id]"><div class="check"></div><label for="radio-no">No</label></div></div><div class="question__option-wrapper" ng-if="question.type == \'numeric_multiple_option\'"><div ng-repeat="option in question.options" class="question__option-item"><p class="question__option">{{ option.textKey | translate: getTranslationKey(option.textKey) }}</p><div class="question__input"><span class="input-square input-square--left" ng-click="decrementNumericValue(question.id, option.id)"></span> <input type="number" ng-model="studentData[sectionData.id][question.id][option.id]" ng-init="initNumericValue(question.id, option.id)" class="question__number-input"> <span class="input-square input-square--right" ng-click="incrementNumericValue(question.id, option.id)"></span></div></div></div></div><button type="submit" class="btn center--mobile right--desktop">Siguiente</button></form>'),e.put("html/quiz/section1-result.html",'<div><h2>¡Wow! ¿Te imaginabas esto, {{studentData.name}}?</h2><div class="questionResult results" ng-repeat="question in results"><p>{{question.questionText}}</p><!-- Start table --><div class="Rtable Rtable--3cols"><!--Table Heading --><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tus respuestas</div><div class="Rtable__cell border__right--0 Rtable__heading">Censo Nacional del 2010</div><!--Table Body--><div ng-repeat="option in question.options" class="Rtable__results"><div class="Rtable__cell">{{ option.optionText.concat(\'_RESULT\') | translate: getTranslationKey(option.optionText) }}</div><div class="Rtable__cell results__yours"><span class="results__number">{{option.yourAnswer | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.yourAnswer | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div><div class="Rtable__cell"><span class="results__number">{{option.censusResult | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.censusResult | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div></div></div><!-- End table --></div><div><div class="results__bottom"><button ui-sref="root.quizSection2.question({pageNumber: 1})" class="btn center--mobile right--desktop">Siguiente</button></div></div></div>'),e.put("html/quiz/section2-result.html",'<div ng-show="displayResults"><h2>¡Wow! ¿Te imaginabas esto, {{studentData.name}}?</h2><div class="questionResult"><p>{{results.avgPersonsPerHouse.questionText}}</p><!-- Start table --><div class="Rtable Rtable--4cols"><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tus respuestas</div><div class="Rtable__cell Rtable__heading">Respuestas promedio de tu clase</div><div class="Rtable__cell border__right--0 Rtable__heading">Censo Nacional del 2010</div><div ng-repeat="option in results.avgPersonsPerHouse.options" class="Rtable__results"><div class="Rtable__cell Rtable__cell--per-promedio">{{ option.optionText.concat(\'_RESULT\') | translate: getTranslationKey(option.optionText) }}</div><div class="Rtable__cell Rtable__cell--per-promedio results__yours"><span class="results__promedio">{{option.yourAnswer | number:2}}</span> <span ng-if="option.yourAnswer" class="results__text">personas <span class="no-wrap">en promedio</span></span></div><div class="Rtable__cell Rtable__cell--per-promedio"><span class="results__promedio">{{option.yourClass | number:2}}</span> <span ng-if="option.yourAnswer" class="results__text">personas <span class="no-wrap">en promedio</span></span></div><div class="Rtable__cell Rtable__cell--per-promedio"><span class="results__promedio">{{option.censusResult | number:2}}</span> <span ng-if="option.censusResult" class="results__text">personas <span class="no-wrap">en promedio</span></span></div></div></div><!-- End table --></div><div class="questionResult"><p>{{results.avgRentingHouse.rentedHouse.questionText}}</p><!-- Start table --><div class="Rtable Rtable--3cols"><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours border__right--0">Tu respuesta</div><div class="Rtable__results"><div class="Rtable__cell Rtable__cell--per-promedio">{{ results.avgRentingHouse.rentedHouse.optionText }}</div><div class="Rtable__cell Rtable__cell--per-promedio results__yours"><span class="results__promedio">{{ results.avgRentingHouse.rentedHouse.yourAnswer }}</span></div></div></div><!-- End table --></div><div class="questionResult results"><p>{{results.avgRentingHouse.personsRentingHouses.questionText}}</p><!-- Start table --><div class="Rtable Rtable--4cols"><!--Table Heading --><div class="Rtable__cell"></div><div class="Rtable__cell Rtable__heading results__yours">Tus respuestas</div><div class="Rtable__cell Rtable__heading">Respuestas promedio de tu clase</div><div class="Rtable__cell border__right--0 Rtable__heading">Censo Nacional del 2010</div><!--Table Body--><div ng-repeat="option in results.avgRentingHouse.personsRentingHouses.options" class="Rtable__results"><div class="Rtable__cell">{{ option.optionText.concat(\'_RESULT\') | translate: getTranslationKey(option.optionText) }}</div><div class="Rtable__cell results__yours"><span class="results__number">{{option.yourAnswer | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.yourAnswer | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div><div class="Rtable__cell"><span class="results__number">{{option.yourClass | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.yourClass | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div><div class="Rtable__cell"><span class="results__number">{{option.censusResult | number:0}}%</span><object type="image/svg+xml" data="img/graph-svg/circle-graph.svg" style="width:{{option.censusResult | number:0}}%" class="results__graphic"><img src="img/graph-svg/circle-graph.png" class="results__graphic"></object></div></div></div><!-- End table --></div><div></div></div>'),e.put("html/sign-up/class-code.html",'<div class="code-slide"><form name="classCodeForm" ng-submit="classCodeForm.$valid && saveClassCode()" novalidate><div class="center"><p class="code-slide__text">Escrib&iacute; el c&oacute;digo de la clase que te dio tu profe.</p><input type="text" class="code-slide__input" ng-model="studentData.classCode" placeholder="" required><div><button type="submit" class="btn btn--alternative">Siguiente</button></div></div></form></div>'),
e.put("html/sign-up/index.html","<div ui-view></div>"),e.put("html/sign-up/student-data.html",'<form name="studentDataForm" ng-submit="studentDataForm.$valid && studentData.department.id && saveStudentData()" novalidate><div class="student-info"><h2>Antes de empezar</h2><div class="student-info__inputs"><input type="text" ng-model="studentData.name" placeholder="Nombre" class="student-info__left input--info" required> <input type="number" ng-model="studentData.age" placeholder="Edad" class="student-info__right input--info" required><div dropdown-select="provinceList" dropdown-model="studentData.province" dropdown-item-label="name" ng-init="initProvinceCombobox()" placeholder="Provincia" class="student-info__left input--info" required></div><div dropdown-select="departmentList" dropdown-model="studentData.department" dropdown-item-label="name" ng-init="initDepartmentCombobox()" placeholder="¿Dónde vivís?" class="student-info__right input--info" required></div></div><svg-map province="studentData.province" department="studentData.department"></svg-map><div><button type="submit" class="btn right--desktop center--mobile">Siguiente</button></div></div></form>'),e.put("html/welcome/index.html",'<div class="center"><object type="image/svg+xml" data="img/illustrations/start-img.svg" class="welcome-slide__img"><img src="img/illustrations/start-img.png" class="welcome-slide__img"></object><h1>¡Bienvenido!</h1><h2 class="welcome-slide__subheading">A Los datos y vos</h2><div class="welcome-slide__text"><p class="main-centered-text">El Estado <b>crea un montón de datos</b> todo el tiempo. Que est&eacute;n digitalizados en formatos abiertos y al alcance de todos es s&uacute;per importante para que podamos <b>usarlos, crear y compartirlos con libertad</b>.</p><p><b>Estos datos son suyos, ¡veamos qué descubrís!</b></p></div><div><a ui-sref="root.signUpForm.classCode" class="btn">Siguiente</a></div></div>')}])}(window.angular);