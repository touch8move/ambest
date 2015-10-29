'use strict';

describe('Controller: ChallengeViewCtrl', function () {

  // load the controller's module
  beforeEach(module('ambestApp'));

  var ViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewCtrl = $controller('ChallengeViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
