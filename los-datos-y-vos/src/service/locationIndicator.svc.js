angular.module('app').service('LocationIndicatorSvc', function($q, $http) {

    var getProvinceList = function() {
        var defer = $q.defer();
        $http.get("data/indicadores_provincia.json").success(function(data) {
            defer.resolve(data);
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    var getDepartmentList = function() {
        var defer = $q.defer();
        $http.get("data/indicadores_departamento.json").success(function(data) {
            defer.resolve(data);
        }).catch(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    };

    return {
        getProvinceList: getProvinceList,
        getDepartmentList: getDepartmentList
    };

});