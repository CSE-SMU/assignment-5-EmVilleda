angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.factory('BeerData', function() {
  return {data: {}};
})

.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
  $scope.form = {};

  $scope.search = function() {
    $http({
      method: 'GET'.
      url: 'https://salty-taiga-88146.herokuapp.com/beers',
      params: {
        name: $scope.form.name
      }
    }).then(function successCallback(response) {
      BeerData.data = response.data;
      $state.go('app.beers');
    });
  }
})

.controller('BeersCtrl', function($scope, $state, BeerData) {
  $scope.beers = {};
  $scope.beers.data = BeerData.data;

  console.log(BeerData.data);
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  console.log($stateParams.beerId);
  $scope.beer = BeerData.data[($stateParams.beerId)];
});
