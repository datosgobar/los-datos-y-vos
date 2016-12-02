// Messages Config
// =============================================================================
angular.module('app').config(['$translateProvider', function($translateProvider) {
	
	var translations = {
  		YOUR_DEPARTMENT: '¿Tu {{key}}?',
  		YOUR_PROVINCE: '¿{{key}}?',
  		YOUR_HOUSE_RESULT: 'Tu casa',
  		YOUR_DEPARTMENT_RESULT: 'Tu {{key}}',
  		YOUR_PROVINCE_RESULT: '{{key}}',
	};

	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.translations('es', translations).preferredLanguage('es');

}]);