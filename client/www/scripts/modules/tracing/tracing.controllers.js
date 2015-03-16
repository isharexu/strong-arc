Tracing.controller('TracingMainController', [
  '$scope',
  '$log',
  'TracingServices',
  'TimeSeries',
  function($scope, $log, TracingServices, TimeSeries) {
    $log.debug('tracing controller');
    //$scope.currentCtx.currentTimeline = {};
    //$scope.currentTransactionKeys = [];
    //$scope.currentTransactionHistoryCollection = [];
    //$scope.currentApp = 'wfp:helloworld';
    $scope.currentCtx = {
      pfKey: '',
      currentTrace: {},
      currentWaterfallKey: '',
      currentWaterfall: {},
      currentFunction: {},
      currentHostConfig: {},
      currentPids: [],
      currentTimeline: {},
      currentTransactionKeys: [],
      currentTransactionHistoryCollection: [],
      currentApp: 'wfp:helloworld'
    };
    //$scope.currentTrace = {};
    //$scope.currentWaterfallKey = '';
    //$scope.currentWaterfall = {};
    //$scope.currentFunction = {};
    //$scope.currentHostConfig = {};
    //$scope.currentPids = [];

    window.onresize = function() {
      window.setScrollView('.tracing-content-container');
    };

    /*
    *
    * update trigger
    * if anything changes in the view context
    * - app name /version
    * - pm host
    * - pid
    *
    * should probably be renamed to currentTracingContext
    *
    * */
    $scope.$watch('currentCtx.currentHostConfig', function(newConfig, oldConfig) {
      if (newConfig.host && newConfig.pid && newConfig.project) {
        $scope.currentCtx.currentTimeline = TracingServices.getTimeline(newConfig)
          .then(function(timeline) {
            $scope.currentCtx.currentTimeline = timeline;
          });
      }
    }, true);

    $scope.init = function() {

      /*

      first things first - kick the server to see if there are any hosts
      - there are no hosts then we can't populate the host selector
      - assumes a project / app context - for now
      - will map to mesh model: service - deploymentInfo

      v1 will use the current strong-pm pattern of choosing the host first
      - single host / single app
      - the strong-pm instance will report the app


      */
      $scope.hosts = TracingServices.fetchHosts({project:$scope.currentCtx.currentApp})
        .then(function(response) {

          if (response.length && response.length > 0) {
            $scope.hosts = response;

            // pre select the first one
            var firstHost = TracingServices.getFirstHost();

            // set up the core data context
            $scope.currentCtx.currentPids = firstHost.pids;
            $scope.currentCtx.currentHostConfig = {
              project: $scope.currentCtx.currentApp,
              host:firstHost.host,
              pid:firstHost.pids[0]
            };


            $scope.currentCtx.currentTimeline = TracingServices.getTimeline($scope.currentCtx.currentHostConfig)
              .then(function(timeline) {
                $scope.currentCtx.currentTimeline = timeline;
              });

            /*
            *
            * Process the transaction history list
            *
            * */
            TracingServices.getTransactionKeys({reqparams:$scope.currentCtx.currentHostConfig})
              .then(function(response) {


                // make sure we get a list
                if (response.hosts) {

                  /*
                   the current context list of transactions

                   we need to iterate over them and create a deeper object than the simple one used by transaction-list component

                   trasObj = {
                    key: transaction,
                    history: {object based on api call}
                   };

                   */
                  // var rawTransactionList = response.hosts[$scope.currentHostConfig.host] ? response.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid] : [];
                  // isolate the transactions for this pid
                  $scope.currentCtx.currentTransactionKeys = response.hosts[$scope.currentCtx.currentHostConfig.host] ? response.hosts[$scope.currentCtx.currentHostConfig.host][$scope.currentCtx.currentHostConfig.pid] : [];

                  // iterate over the transaction keys
                  $scope.currentCtx.currentTransactionKeys.map(function(transaction) {
                    /*
                    *
                    *   Transaction key
                    *
                    * */
                    var transObj = {
                      key: transaction
                    };

                    // history
                    TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.currentCtx.currentHostConfig.host, $scope.currentCtx.currentHostConfig.pid)
                      .then(function(response){

                        // get the history data per transaction
                        var rawTransactionData = JSON.parse(response.data);
                        // assign history data to ui model
                        transObj.history = rawTransactionData.hosts[$scope.currentCtx.currentHostConfig.host][$scope.currentCtx.currentHostConfig.pid];
                        $scope.currentCtx.currentTransactionHistoryCollection.push(transObj);

                      });
                  });
                }
              });
          }
          else {
            $log.debug('There are no tracing hosts');
          }

        })
        .catch(function(error) {
          $log.warn('error: ' + error.message);
        });
    }
    $scope.init();

  }
]);
Tracing.controller('TracingMonitorController', [
  '$scope',
  '$log',
  function($scope, $log) {

  }
]);
