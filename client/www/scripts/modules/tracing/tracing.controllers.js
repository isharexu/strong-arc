Tracing.controller('TracingMainController', [
  '$scope',
  '$log',
  'TracingServices',
  'TimeSeries',
  function($scope, $log, TracingServices, TimeSeries) {
    $log.debug('tracing controller');
    $scope.currentTimeline = {};
    $scope.currentTransactionKeys = [];
    $scope.currentTransactionHistoryCollection = [];
    $scope.currentApp = 'wfp:helloworld';
    $scope.currentPFKey = '';
    $scope.currentTrace = {};
    $scope.currentWaterfallKey = '';
    $scope.currentWaterfall = {};
    $scope.currentFunction = {};
    $scope.currentHostConfig = {};
    $scope.currentPids = [];

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
    $scope.$watch('currentHostConfig', function(newConfig, oldConfig) {
      if (newConfig.host && newConfig.pid && newConfig.project) {
        $scope.currentTimeline = TracingServices.getTimeline(newConfig)
          .then(function(timeline) {
            $scope.currentTimeline = timeline;
          });
      }
    }, true);

    function init() {

      /*

      first things first - kick the server to see if there are any hosts
      - there are no hosts then we can't populate the host selector
      - assumes a project / app context - for now
      - will map to mesh model: service - deploymentInfo

      v1 will use the current strong-pm pattern of choosing the host first
      - single host / single app
      - the strong-pm instance will report the app


      */
      $scope.hosts = TracingServices.fetchHosts({project:$scope.currentApp})
        .then(function(response) {

          if (response.length && response.length > 0) {
            $scope.hosts = response;

            // pre select the first one
            var firstHost = TracingServices.getFirstHost();

            // set up the core data context
            $scope.currentPids = firstHost.pids;
            $scope.currentHostConfig = {
              project: $scope.currentApp,
              host:firstHost.host,
              pid:firstHost.pids[0]
            };


            $scope.currentTimeline = TracingServices.getTimeline($scope.currentHostConfig)
              .then(function(timeline) {
                $scope.currentTimeline = timeline;
              });

            /*
            *
            * Process the transaction history list
            *
            * */
            TracingServices.getTransactionKeys({reqparams:$scope.currentHostConfig})
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
                  $scope.currentTransactionKeys = response.hosts[$scope.currentHostConfig.host] ? response.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid] : [];

                  // iterate over the transaction keys
                  $scope.currentTransactionKeys.map(function(transaction) {
                    /*
                    *
                    *   Transaction key
                    *
                    * */
                    var transObj = {
                      key: transaction
                    };

                    // history
                    TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.currentHostConfig.host, $scope.currentHostConfig.pid)
                      .then(function(response){

                        // get the history data per transaction
                        var rawTransactionData = JSON.parse(response.data);
                        // assign history data to ui model
                        transObj.history = rawTransactionData.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid];
                        $scope.currentTransactionHistoryCollection.push(transObj);

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
    init();

  }
]);
Tracing.controller('TracingMonitorController', [
  '$scope',
  '$log',
  function($scope, $log) {

  }
]);
