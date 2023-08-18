import angular from 'angular';

// Create an angular module named 'app'.
angular.module('app', []);

// Put application code here before bootstrap is called.
angular.module('app').controller('MainCtrl', function ($scope) {
  $scope.message = 'hello';

  $scope.businesses = [
    // Your list of businesses here
    {
      nameOfBusiness: 'ABC',
      otherData: 'abc.pdf',
      bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
    },
    {
      nameOfBusiness: 'Pizza',
      otherData: 'pizza.pdf',
      bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
    },
    {
      nameOfBusiness: 'Tekken',
      otherData: 'tekken.pdf',
      bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
    },
    {
      nameOfBusiness: 'ABC',
      otherData: 'abc1.pdf',
      bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
    },
    {
      nameOfBusiness: 'ABC',
      otherData: 'abc2.pdf',
      bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
    },
  ];

  $scope.createReqBdy = function () {
    // Create the request body format
    var businessesMap = {};

    for (var i = 0; i < $scope.businesses.length; i++) {
      var business = $scope.businesses[i];

      if (!businessesMap[business.nameOfBusiness]) {
        businessesMap[business.nameOfBusiness] = [];
      }

      businessesMap[business.nameOfBusiness].push({
        documentName: business.otherData,
        document: business.bytearray,
      });
    }

    $scope.requestBody = {
      upload: [],
    };

    var businessNames = Object.keys(businessesMap);
    for (var j = 0; j < businessNames.length; j++) {
      var businessName = businessNames[j];
      $scope.requestBody.upload.push({
        businessName: businessName,
        document: businessesMap[businessName],
      });
    }
    console.log(' Request Body generated : ', $scope.requestBody);
  };

  $scope.SelectFile = function (e) {
    var files = e.target.files[0];
    var clickedRow = e.target.closest('tr');
    var firstTdText =
      clickedRow.cells[0].textContent.trim() ||
      clickedRow.cells[0].innerHTML.trim();
    console.log('First row text:', firstTdText);
    console.log(files.name);
    console.log(files.type);
    console.log(files.size);

    // Convert the file to a byte array if it is less than or equal to 16 MB
    let maxSize = 16 * 1024 * 1024;
    if (files.size <= maxSize) {
      readFileAsByteArray(files, function (byteArray) {
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
