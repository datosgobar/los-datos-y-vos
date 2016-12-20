// App Config
// =============================================================================
angular.module('app', ['ngAnimate', 'ui.router', 'rzModule', 'pascalprecht.translate', 
	'templates', 'ngDropdowns', 'ngDialog', 'firebase', 'chart.js']).run(function() {
	var config = {
    	apiKey: "AIzaSyDw_YugmuDa4zIj8LuOobtXRk3u1gMyc7E",
	    authDomain: "los-datos-y-vos.firebaseapp.com",
    	databaseURL: "https://los-datos-y-vos.firebaseio.com",
	    storageBucket: "los-datos-y-vos.appspot.com",
    	messagingSenderId: "893616193793"
	};
  	firebase.initializeApp(config);	
});
