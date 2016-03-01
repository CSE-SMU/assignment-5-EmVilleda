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

.controller('BeersCtrl', function($scope, BeerData) {
  console.log(BeerData.data);

  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('BeerCtrl', function($scope, $stateParams, BeerData) {
  console.log($stateParams.id);
});
