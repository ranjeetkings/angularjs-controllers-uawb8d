import angular from 'angular';

// Create an angular module named 'app'.
angular.module('app', []);

// Put application code here before bootstrap is called.
angular.module('app').controller('MainCtrl', function ($scope) {
  $scope.message = 'hello';

  $scope.val = '';

  // $scope.businesses = [
  //   // Your list of businesses here
  //   {
  //     nameOfBusiness: 'ABC',
  //     otherData: 'abc.pdf',
  //     bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
  //   },
  //   {
  //     nameOfBusiness: 'Pizza',
  //     otherData: 'pizza.pdf',
  //     bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
  //   },
  //   {
  //     nameOfBusiness: 'Tekken',
  //     otherData: 'tekken.pdf',
  //     bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
  //   },
  //   {
  //     nameOfBusiness: 'ABC',
  //     otherData: 'abc1.pdf',
  //     bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
  //   },
  //   {
  //     nameOfBusiness: 'ABC',
  //     otherData: 'abc2.pdf',
  //     bytearray: [37, 80, 68, 70, 45, 49, 46, 53, 10],
  //   },
  // ];

  $scope.uploadedFilesResponse = [
    {
      businessName: 'ABC',
      document: [
        {
          documentName: 'abc.pdf',
          documentId: 1,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
        {
          documentName: 'abc1.pdf',
          documentId: 2,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
        {
          documentName: 'abc2.pdf',
          documentId: 3,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'Pizza',
      document: [
        {
          documentName: 'pizza.pdf',
          documentId: 4,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
        {
          documentName: 'pizza1.pdf',
          documentId: 5,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'Tekken',
      document: [
        {
          documentName: 'tekken.pdf',
          documentId: 6,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'ABC',
      document: [
        {
          documentName: 'newDocument1.pdf',
          documentId: 8,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'XYZ',
      document: [
        {
          documentName: 'newDocument2.pdf',
          documentId: 9,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'ABC',
      document: [
        {
          documentName: 'newDocument3.pdf',
          documentId: 10,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
  ];

  var newEntries = [
    {
      businessName: 'ABC',
      document: [
        {
          documentName: 'newDocument1.pdf',
          documentId: 8,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'XYZ',
      document: [
        {
          documentName: 'newDocument2.pdf',
          documentId: 9,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
    {
      businessName: 'ABC',
      document: [
        {
          documentName: 'newDocument3.pdf',
          documentId: 10,
          document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
        },
      ],
    },
  ];

  $scope.businesses = [
    // Your list of businesses here
    {
      nameOfBusiness: 'ABC (ahsgdh)',
      requiresSupportDocs: true,
    },
    {
      nameOfBusiness: 'Pizza (ahsgdh)',
      requiresSupportDocs: true,
    },
    {
      nameOfBusiness: 'Tekken (ahsgdh)',
      requiresSupportDocs: true,
    },
  ];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to update documents by businessName
  $scope.updateDocumentByBusinessName = function () {
    var businessNameMap = {}; // A map to store entries by businessName

    // Group entries by businessName
    for (var i = 0; i < $scope.uploadedFilesResponse.length; i++) {
      var entry = $scope.uploadedFilesResponse[i];
      var businessName = entry.businessName;

      if (!businessNameMap[businessName]) {
        businessNameMap[businessName] = entry;
      } else {
        // Merge documents into the existing entry
        businessNameMap[businessName].document.concat(entry.document);
      }
    }

    // Convert the map back to an array
    var updatedEntries = [];
    for (var key in businessNameMap) {
      if (businessNameMap.hasOwnProperty(key)) {
        updatedEntries.push(businessNameMap[key]);
      }
    }

    // Replace the original array with the updated one
    return ($scope.uploadedFilesResponse = updatedEntries);
  };

  $scope.init = function () {
    $scope.updateDocumentByBusinessName();
    for (var i = 0; i < $scope.businesses.length; i++) {
      // console.log("Bus Value ",$scope.businesses[i]);
      if ($scope.businesses[i].nameOfBusiness.indexOf('(') !== -1) {
        console.log(
          $scope.businesses[i].nameOfBusiness
            .substring(0, $scope.businesses[i].nameOfBusiness.indexOf('('))
            .trim()
        );
      }
    }
  };

  $scope.init();

  // Watch for changes in the uploadedFilesResponse array
  $scope.$watch(
    'uploadedFilesResponse',
    function (newValue, oldValue) {
      // Check if the array has changed
      console.log('New', newValue);
      console.log('Old', oldValue);
      if (newValue !== oldValue) {
        // Call the method to update entries by rearranging the array
        // $scope.updateDocumentByBusinessName();
        console.log('Changed', $scope.updateDocumentByBusinessName());
      }
    },
    true
  ); // The 'true' parameter makes it a deep watch

  $scope.putFiles = function (e) {
    var file = e.target.files;
    $scope.randomNumber = getRandomNumber(1, 100);
    $scope.$apply(function () {
      for (var i = 0; i < file.length; i++) {
        var bus = file[i];
        var targetBusinessIndex = $scope.uploadedFilesResponse.findIndex(
          function (business) {
            return (
              business.businessName ===
              $scope.uploadedFilesResponse[getRandomNumber(0, 3)].businessName
            );
          }
        );

        // If a business with the matching name is found, update its document array
        if (targetBusinessIndex !== -1) {
          $scope.uploadedFilesResponse[targetBusinessIndex].document.push({
            documentId: $scope.randomNumber,
            documentName: bus.name,
          });
        } else {
          $scope.uploadedFilesResponse.push({
            businessName: 'XYZ',
            document: [
              {
                documentName: 'XYZ',
                documentId: 4,
                document: [37, 80, 68, 70, 45, 49, 46, 53, 10],
              },
            ],
          });
        }
        // $scope.$apply();
      }
    });
    console.log($scope.uploadedFilesResponse);
  };

  $scope.deleteDocumentByDocumentID = function (documentID) {
    for (var i = 0; i < $scope.uploadedFilesResponse.length; i++) {
      var documents = $scope.uploadedFilesResponse[i].document;

      for (var j = 0; j < documents.length; j++) {
        if (documents[j].documentId === documentID) {
          // Remove the document directly from the array
          documents.splice(j, 1);

          // If the parent object has no documents left, remove it
          if (documents.length === 0) {
            $scope.uploadedFilesResponse.splice(i, 1);
          }

          // Exit the loop once the document is found and removed
          return;
        }
      }
    }
  };

  // Function to find and delete a document by documentID
  //   $scope.deleteDocumentByDocumentID = function (documentID) {
  //     console.log(" Document to be removed is : ",documentID);
  //     var documentToRemove = null;
  //     var indexToDelete = -1;

  //     for (var i = 0; i < $scope.uploadedFilesResponse.length; i++) {
  //         var documents = $scope.uploadedFilesResponse[i].document;

  //         for (var j = 0; j < documents.length; j++) {
  //             if (documents[j].documentId === documentID) {
  //                 documentToRemove = documents.splice(j, 1)[0];
  //                 indexToDelete = i;
  //                 break;
  //             }
  //         }

  //         // If the document was found and removed, exit the outer loop.
  //         if (indexToDelete !== -1) {
  //             break;
  //         }
  //     }

  //     // If a document was found and removed, remove the parent object if it has no documents left.
  //     if (indexToDelete !== -1 && $scope.uploadedFilesResponse[indexToDelete].document.length === 0) {
  //         $scope.uploadedFilesResponse.splice(indexToDelete, 1);
  //     }
  //     console.log(" Removed document is : ",documentToRemove);
  //     // Return the removed document, or null if not found.
  //     return documentToRemove;
  // };

  // Example usage:
  // var removedDocument = $scope.deleteDocumentByDocumentID('ABC'); // Replace '123' with the actual documentID you want to delete.

  // Helper function to get documents for a specific business
  $scope.getDocumentsForBusiness = function (businessName) {
    var business = $scope.uploadedFilesResponse.find(function (item) {
      return item.businessName === businessName;
    });
    return business ? business.document : [];
  };

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
    let maxSize = 16 * 1024 * 1024;
    if (files.size <= maxSize) {
      readFileAsByteArray(files, function (base64String) {
        // Do something with the byte array here, like sending it to the server
        console.log(' Base 64 Received ', base64String);

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
