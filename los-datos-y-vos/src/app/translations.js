// Messages Config
// =============================================================================
angular.module('app').config(['$translateProvider', function($translateProvider) {
	
	var translations = {
  		YOUR_DEPARTMENT: 'a) En tu {{key}}',
  		YOUR_PROVINCE: 'b) En {{key}}',
  		YOUR_HOUSE_RESULT: 'En tu casa',
  		YOUR_DEPARTMENT_RESULT: 'En tu {{key}}',
  		YOUR_PROVINCE_RESULT: '{{key}}',
	};

	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.translations('es', translations).preferredLanguage('es');

}]);