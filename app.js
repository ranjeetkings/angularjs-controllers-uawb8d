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

  var allBusinessesHaveEntries = true;

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

    // Check if each business has at least one entry

    for (var i = 0; i < $scope.businesses.length; i++) {
      var business = $scope.businesses[i];
      if (!business.otherData || business.otherData.trim() === '') {
        allBusinessesHaveEntries = false;
        break; // If any business has no entries, break the loop
      }
    }

    $scope.requestBody = {
      upload: [],
    };

    if (allBusinessesHaveEntries) {
      console.log('All businesses have at least one entry.');
    } else {
      console.log('Not all businesses have at least one entry.');
    }

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
    let maxSize = 50 * 1024 * 1024;
    if (files.size <= maxSize) {
      readFileAsByteArray(files, function (base64String) {
        // Do something with the byte array here, like sending it to the server
        console.log(' Base 64 Received ', base64String);
        $scope.selectedFiles.push({
          businessName: files.name,
          fileName: files.name,
          base64File: base64String,
        });

        // Now you can perform any additional actions using the byteArray
      });
      console.log(' Selected Files Array ', $scope.selectedFiles);
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
      if (callback && typeof callback === 'function') {
        // Convert the byte array to a base64 string
        var binaryString = '';
        for (var i = 0; i < byteArray.length; i++) {
          binaryString += String.fromCharCode(byteArray[i]);
        }
        var base64String = btoa(binaryString);

        // Do something with the base64 string, like sending it to the server
        console.log(base64String);
        callback(base64String);
      }
    };

    reader.onerror = function (event) {
      console.error('Error reading the file:', event.target.error);
    };

    reader.readAsArrayBuffer(file);
  }
});

// Bootstrap angular onto the 'app' element, injecting the 'app' module.
angular.bootstrap(document.getElementById('app'), ['app']);
