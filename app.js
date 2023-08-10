import angular from 'angular';

// Create an angular module named 'app'.
angular.module('app', []);

// Put application code here before bootstrap is called.
angular.module('app').controller('MainCtrl', function ($scope) {
  $scope.message = 'hello';

  $scope.SelectFile = function (e) {
    
    var files = e.target.files[0];
    console.log(files.name);
    console.log(files.type);
    console.log(files.size);
    alert(files.name + "\n " + (files.size/(1024*1024)) + " MB");
  };
});

// Bootstrap angular onto the 'app' element, injecting the 'app' module.
angular.bootstrap(document.getElementById('app'), ['app']);
