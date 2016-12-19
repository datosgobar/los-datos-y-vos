// App Config
// =============================================================================
angular.module('app', ['ngAnimate', 'ui.router', 'rzModule', 'pascalprecht.translate', 
	'templates', 'ngDropdowns', 'ngDialog', 'firebase']).run(function() {
	var config = {
    	apiKey: "AIzaSyBgL15t8NOSL0FjG-C180FFs9ZVVjxyCBw",
	    authDomain: "deductive-reach-153014.firebaseapp.com",
	    databaseURL: "https://deductive-reach-153014.firebaseio.com",
	    storageBucket: "deductive-reach-153014.appspot.com",
	    messagingSenderId: "385138051066"
  	};
  	firebase.initializeApp(config);	
});
