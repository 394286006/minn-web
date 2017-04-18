'use strict';
/**
* @auth:minn
* @qq:394286006
*/
angular.module('ngMinnWeb')
.controller('HomeController', function ($scope, $route,$location) {
   console.log('main:'+$location.url());
   $scope.$route = $route;
   $('#qrcode').qrcode({width: 200,
   height: 200, 
   colorDark : "#000000",
   colorLight : "#ffffff",
   text:"http://fmfl.iteye.com"
 });
 })
