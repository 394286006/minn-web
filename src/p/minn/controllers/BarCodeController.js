'use strict';
/**
* @auth:minn
* @qq:394286006
*/
angular.module('ngMinnWeb')
.controller('BarCodeController', function ($scope, $route,$location,$http) {
   $scope.$route = $route;
   $scope.initcode=false;
   let messageBody='{"page":0,"query":"2","qtype":"categoryid","rp":20}&lang="zh"';
   $http.get("../frontpic?method=frontquery&messageBody="+messageBody)
    .success(function(response) {
      var data=response.data.result;
      for(let i=0;i<data.length;i++ ){
      if(i%3==0){
        $('<li id="thumbnail_'+i+'"  class="span4"   style="margin-left:0px;"/>').appendTo('.thumbnails');
			  }else{
					$('<li id="thumbnail_'+i+'"  class="span4"/>').appendTo('.thumbnails');
			  }
  		  $('<div id="content_'+i+'"  class="thumbnail"/>').appendTo('#thumbnail_'+i);
  		  $('<img  src="../'+data[i].imgpath+'"/>').appendTo('#content_'+i);
        $('<img  id="barcode_'+i+'"/>').appendTo('#content_'+i);
        JsBarcode("#barcode_"+i, data[i].name,{width: 4,height: 100});
      }

    });


 })
