angular.module('app').factory('EventBusSvc', function($rootScope) {
	
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

});