// Messages Config
// =============================================================================
angular.module('app').config(['$translateProvider', function($translateProvider) {

	// cod 11042
	var translations = {
  		YOUR_DEPARTMENT: '{{key}}',
  		YOUR_PROVINCE: '{{key}}',
  		YOUR_HOUSE_RESULT: 'Tu casa',
  		YOUR_DEPARTMENT_RESULT: '{{key}}',
  		YOUR_PROVINCE_RESULT: '{{key}}',
	};

	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.translations('es', translations).preferredLanguage('es');

}]);
