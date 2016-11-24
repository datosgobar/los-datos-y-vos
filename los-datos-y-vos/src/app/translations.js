// Messages Config
// =============================================================================
angular.module('app').config(['$translateProvider', function($translateProvider) {
	
	var translations = {
  		YOUR_DEPARTMENT: '¿Tu {{key}}?',
  		YOUR_PROVINCE: '¿{{key}}?',
	};

	$translateProvider.useSanitizeValueStrategy(null);
	$translateProvider.translations('es', translations).preferredLanguage('es');

}]);