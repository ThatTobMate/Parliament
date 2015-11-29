app.controller('ModalCtrl', function ($scope, $uibModalInstance, selectedEvent) {

  $scope.selectedEvent = selectedEvent;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});