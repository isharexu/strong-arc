Tracing.controller('TracingMainController', [
  '$scope',
  '$log',
  'TracingServices',
  'TimeSeries',
  function($scope, $log, TracingServices, TimeSeries) {
    $log.debug('tracing controller');
    $scope.currentTimeline = {};
    $scope.transactionKeys = [];
    $scope.currentProject = 'wfp:helloworld';
   // $scope.tracingHosts = [];
    $scope.currentPFKey = '';
    $scope.currentTrace = {};
    $scope.currentWaterfallKey = '';
    $scope.currentWaterfall = {};
    $scope.currentFunction = {};

    $scope.setCurrentWaterfallKey = function(key) {
      if (key && key.length > 0) {
        $scope.currentWaterfallKey = key;
      }
    };


    //$scope.showTraceView = function(data) {
    //  $log.debug('load trace view: ' + data.pfkey);
    //  $scope.currentPFKey = data.pfkey;
    //};
    $scope.hosts = TracingServices.fetchHosts({project:$scope.currentProject})
      .then(function(response) {
        $log.debug('yay hosts: ' + JSON.stringify(response));

        $scope.hosts = response;
        var firstHost = TracingServices.getFirstHost();
        $scope.currentHost = {
          project: $scope.currentProject,
          host:firstHost.host,
          pid:firstHost.pids[0]
        };
        $scope.currentTimeline = TracingServices.fetchTimeline({reqparams:$scope.currentHost})
          .then(function(timelineRaw) {
            var tHost = timelineRaw.hosts[$scope.currentHost.host];
            var dataArray = tHost[$scope.currentHost.pid];
            if (dataArray) {
              $scope.currentTimeline = TracingServices.convertTimeseries(dataArray)
            }
          });
        $scope.transactionHistoryCollection = [];
        $scope.transactionKeys = TracingServices.transactionKeys({reqparams:$scope.currentHost})
          .then(function(response) {

            if (response.hosts) {





              /*
                the current context list of transactions

                we need to iterate over them and create a deeper object than the simple one used by transaction-list component

                trasObj = {
                  key: transaction,
                  history: {object based on api call}
                };
              */
              var transactionKCollection = response.hosts[$scope.currentHost.host] ? response.hosts[$scope.currentHost.host][$scope.currentHost.pid] : [];
              $scope.transactionKeys = response.hosts[$scope.currentHost.host] ? response.hosts[$scope.currentHost.host][$scope.currentHost.pid] : []

              // iterate over the transactions
              transactionKCollection.map(function(transaction) {
                var transObj = {
                  key: transaction
                };

                TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.currentHost.host, $scope.currentHost.pid)
                  .then(function(response){

                    var rawTransactionData = JSON.parse(response.data);
                    transObj.history = rawTransactionData.hosts[$scope.currentHost.host][$scope.currentHost.pid];
                    $log.debug('Assign transactionData');
                    //$log.debug('transdata: ' + response.data);
                    //self.renderItem(key, history.hosts[host][pid])
                    $scope.transactionHistoryCollection.push(transObj);
                  });


              });

            }
          });
      })
      .catch(function(error) {
        $log.warn('error: ' + error.message);
      });
  }
]);
Tracing.controller('TracingMonitorController', [
  '$scope',
  '$log',
  function($scope, $log) {

  }
]);
