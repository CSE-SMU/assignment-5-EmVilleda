angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $http, $timeout) {

})

.factory('BeerData', function() {
  return {data: {}, selectedData: 0};
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
  $scope.organicChoices = ["Yes", "No", "Any"];
  $scope.organic = {};
  $scope.organic.index = 0;
  $scope.categories = [
    {
      "id" : 1,
      "name" : "British Origin Ales"
    },
    {
      "id" : 2,
      "name" : "Irish Origin Ales"
    },
    {
      "id" : 3,
      "name" : "North American Origin Ales"
    },
    {
      "id" : 4,
      "name" : "German Origin Ales"
    },
    {
      "id" : 5,
      "name" : "Belgian And French Origin Ales"
    },
    {
      "id" : 6,
      "name" : "International Ale Styles"
    },
    {
      "id" : 7,
      "name" : "European-germanic Lager"
    },
    {
      "id" : 8,
      "name" : "North American Lager"
    },
    {
      "id" : 9,
      "name" : "Other Lager"
    },
    {
      "id" : 10,
      "name" : "International Styles"
    },
    {
      "id" : 11,
      "name" : "Hybrid/mixed Beer"
    },
    {
      "id" : 12,
      "name" : "Mead, Cider, & Perry"
    }
  ];

  $scope.search = {};
  $scope.search.abvGreater = true;
  $scope.search.ibuGreater = true;

  $scope.search = function() {
    var data = {
      hasLabels: "Y"
    };

    if( $scope.search.beername ) {
      data.name = $scope.search.beername;
    }
    if( $scope.search.year ) {
      data.year = $scope.search.year;
    }
    if( $scope.search.abv ) {
      var direction = "+";
      if( !$scope.search.abvGreater ) {
        direction = "-";
      }
      data.abv = direction + $scope.search.abv;
    }
    if( $scope.search.ibu ) {
      var direction = "+";
      if( !$scope.search.abvGreater ) {
        direction = "-";
      }
      data.ibu = direction + $scope.search.ibu;
    }
    if( $scope.organic.index ) {
      if( $scope.organic.index == 1) {
        data.isOrganic = "Y";
      }
      else {
        data.isOrganic = "N";
      }
    }

    $http({
      method: 'GET'.
      url: 'https://salty-taiga-88146.herokuapp.com/beers',
      params: data
    }).then(function successCallback(response) {
      BeerData.data = response.data;
      $state.go('app.beers');
    });
  };
})

.controller('BeersCtrl', function($scope, $state, BeerData) {
  $scope.beers = {};
  $scope.beers.data = BeerData.data;

  console.log(BeerData.data);

  $scope.srmColor = function(srmVal) {
    return {'background-color': BeerData.colors[(srmVal)]};
  }
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  console.log($stateParams.beerId);
  $scope.beer = BeerData.data[($stateParams.beerId)];

  $scope.srmColor = function(srmVal) {
    return {'background': BeerData.colors[(srmVal)]};
  }

  console.log($scope.beer);
});
