angular.module('app').controller('AppCtrl', function($scope) {
    
    var ctrl = this;
    ctrl.bodyClass = 'defaultSlide';

    $scope.$on('$stateChangeSuccess', function ($event, $toState, $toParams) {
        if (angular.isDefined($toState.data.bodyClass)) {
            ctrl.bodyClass = $toState.data.bodyClass;
            return;
        }
        ctrl.bodyClass = 'defaultSlide';
    });

});
