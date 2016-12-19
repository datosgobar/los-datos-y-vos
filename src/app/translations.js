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
