ApiMetrics.controller('MetricsApiController', [
    '$scope',
    '$state',
    '$log',
    '$interval',
    '$timeout',
    'MetricsApiService',
    function($scope, $state, $log, $interval, $timeout, MetricsApiService) {
        $scope.apiChart = {};

      window.setScrollView('.common-instance-view-container');

      MetricsApiService.getMetricsApiChartData()
          .then(function(data){
            $scope.apiChart.data = data.data;
          });
    }]);
