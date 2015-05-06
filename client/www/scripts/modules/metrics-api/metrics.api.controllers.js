ApiMetrics.controller('MetricsApiController', [
    '$scope',
    '$state',
    '$log',
    '$q',
    '$interval',
    '$timeout',
    'MetricsApiService',
    function($scope, $state, $log, $q, $interval, $timeout, MetricsApiService) {
      $scope.apiChart = {};
      $scope.server = {};

      window.setScrollView('.common-instance-view-container');

      $scope.onClickLoad = function(form){
        $log.log('loading chart data...');
        $scope.server.host = form.host.$viewValue;
        $scope.server.port = form.port.$viewValue;
        $scope.apiChart = {};


        $scope.getData(null, 0, 0);
      };

      $scope.getData = function(d, i, depth, initialModel){
        var def = $q.defer();

        MetricsApiService.getMetricsApiChartDataByNode(d, i, depth, $scope.server, initialModel)
          .then(function(data){
            var chart = {
              data: data,
              node: d,
              nodeIdx: i
            };

            $scope.apiChart = chart;

            def.resolve($scope.apiChart);
          });

        return def.promise;
      };
    }]);
