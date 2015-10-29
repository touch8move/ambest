'use strict';

describe('Controller: ChallengeCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('ambestApp'));

  var CreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateCtrl = $controller('ChallengeCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
