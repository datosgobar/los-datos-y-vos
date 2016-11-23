// Messages Config
// =============================================================================
angular.module('app').config(['$translateProvider', function($translateProvider) {
	
	var translations = {
  		HEADLINE: 'What an awesome module! {{username}}',
  		PARAGRAPH: 'Srsly!',
	};

	$translateProvider.translations('es', translations).preferredLanguage('es');

}]);