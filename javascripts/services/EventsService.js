app.factory('Event', ['$http', '$q', function ($http, $q) {

  var Event = {};

  Event.thisWeek = function(){
    var deferred = $q.defer();
    $http.get('http://service.calendar.parliament.uk/calendar/events/list.json?date=thisweek')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(){
        deferred.reject("There was an error getting this weeks events.")
      });
      return deferred.promise;
  };

  Event.selectedWeek = function(startDate, endDate){
    var deferred = $q.defer();
    $http.get('http://service.calendar.parliament.uk/calendar/events/list.json?startdate='+ startDate +'&enddate='+ endDate +'')
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(){
        deferred.reject("There was an error getting the selected weeks events.")
      });
      return deferred.promise;
  };

  return Event;
}]);