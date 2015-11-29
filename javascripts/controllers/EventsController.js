app.controller('EventsCtrl', function ($scope, _, $uibModal, Event){

  $scope.animationsEnabled = true;

  $scope.oneAtATime = true;

  $scope.accordionView = "/templates/accordion-view.html"

  function thisWeek(){
    Event.thisWeek()
      .then(function(data){
        console.log(data)
        sortWeek(data);
      },
      function(error) {
        $scope.error = error;
      });
  };

  $scope.selectedWeek = function(){
    var startDate = moment($scope.dt).format('YYYY-MM-DD');
    var endDate = moment($scope.dt).add(4, 'days').format('YYYY-MM-DD');
    Event.selectedWeek(startDate, endDate)
      .then(function(data){
        sortWeek(data);
      },
      function(error) {
        $scope.error = error;
      });
  };

  function sortWeek(data){
    if(data.length > 0){
      var groupedByDate = _.groupBy(data, function(obj) {
          if(!obj.StartTime){
            obj.StartTime = 'Not Specified';
          }
          return obj.StartDate;
      });

      var sortedByDate = _.sortBy(groupedByDate, function(v, k) { return k; });

      $scope.weeklyEvents = {
        'Monday': sortedByDate[0],
        'Tuesday': sortedByDate[1],
        'Wednesday': sortedByDate[2],
        'Thursday': sortedByDate[3],
        'Friday': sortedByDate[4]
      };

      $scope.weekDate = sortedByDate[0][0].StartDate;
    }else{
      $scope.weeklyEvents = {
              'Monday': [],
              'Tuesday': [],
              'Wednesday': [],
              'Thursday': [],
              'Friday': []
            };
      $scope.weekDate = $scope.dt;
    }
  }

  $scope.today = function(){
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function (){
    $scope.dt = null;
  };

  $scope.status = {
     opened: false,
     isFirstOpen: true,
     isFirstDisabled: false
   };

  $scope.open = function($event){
      $scope.status.opened = true;
  };

  $scope.disabled = function(date, mode){
      return (mode === 'day' && (date.getDay() !== 1));
  };

  $scope.openModal = function (selectedEvent) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal.html',
      controller: 'ModalCtrl',
      resolve: {
        selectedEvent: function () {
          return selectedEvent;
        }
      }
    });
  };

  $scope.closeAlert = function() {
      $scope.error = false;
    };

  $scope.$watch('dt', function(newValue, oldValue) {
    if(newValue !== oldValue){
      $scope.selectedWeek();
    }
  });

  thisWeek();

});


