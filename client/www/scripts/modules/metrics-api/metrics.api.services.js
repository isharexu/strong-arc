ApiMetrics.service('MetricsApiService', [
  '$http',
  '$log',
  function($http, $log) {
    var svc = this;

    svc.getMetricsApiChartData = function(){
      return $http.get('/scripts/modules/metrics-api/data.json');
    };

    return svc;
  }]);
