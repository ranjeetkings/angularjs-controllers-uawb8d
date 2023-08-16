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

    // Convert the file to a byte array if it is less than or equal to 10 MB
    if (file.size <= maxSize) {
      readFileAsByteArray(file, function (byteArray) {
        // Do something with the byte array here, like sending it to the server
        console.log(byteArray);

        // Now you can perform any additional actions using the byteArray
      });
    } else {
      alert(
        files.name + '\n exceeds limit ' + files.size / (1024 * 1024) + ' MB'
      );
    }
  };

  // Function to read the file as a byte array using FileReader with a callback
  function readFileAsByteArray(file, callback) {
    var reader = new FileReader();

    reader.onload = function (event) {
      var arrayBuffer = event.target.result;
      var byteArray = new Uint8Array(arrayBuffer);
      callback(byteArray);
    };

    reader.onerror = function (event) {
      console.error('Error reading the file:', event.target.error);
    };

    reader.readAsArrayBuffer(file);
  }
});

// Bootstrap angular onto the 'app' element, injecting the 'app' module.
angular.bootstrap(document.getElementById('app'), ['app']);
