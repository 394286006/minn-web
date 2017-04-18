'use strict';
/**
* @auth:minn
* @qq:394286006
*/
angular.module('ngMinnWeb', ['ngRoute','ui.bootstrap','ngAnimate','ngTouch'])
.config(['$httpProvider','$routeProvider',function ($httpProvider,$routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'p/minn/views/home.html',
        controller: 'HomeController'
    }).
    when('/barcode', {
        templateUrl: 'p/minn/views/barcode.html',
        controller: 'BarCodeController'
    }).
    when('/about', {
        templateUrl: 'p/minn/views/about.html',
        controller: 'AboutController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);
