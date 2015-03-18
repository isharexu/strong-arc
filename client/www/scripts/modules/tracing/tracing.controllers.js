Tracing.controller('TracingMainController', [
  '$scope',
  '$log',
  'TracingServices',
  'TimeSeries',
  function($scope, $log, TracingServices, TimeSeries) {
    $log.debug('tracing controller');
    //$scope.tracingCtx.currentTimeline = {};
    //$scope.currentTransactionKeys = [];
    //$scope.currentTransactionHistoryCollection = [];
    //$scope.currentApp = 'wfp:helloworld';
    $scope.tracingCtx = {
      currentPFKey: '',
      currentTimelineTimestamp: '',
      currentTimelineDuration: 0,
      currentTrace: {},
      currentWaterfallKey: '',
      currentWaterfall: {},
      currentFunction: {},
      currentHostConfig: {},
      currentPids: [],
      currentTimeline: {},
      currentTransactionKeys: [],
      currentTransactionHistoryCollection: [],
      currentApp: {name: 'wfp:helloworld'}
    };
    $scope.getCurrentTimelineDuration = function() {
      if (!$scope.tracingCtx.currentTimeline) {
        return 0;
      }
      var dataPointCount = $scope.tracingCtx.currentTimeline.cpu.length;
      return $scope.tracingCtx.currentTimeline.cpu[dataPointCount - 1].Uptime

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
    function updateTimelineData(timeline) {
      $scope.tracingCtx.currentTimeline = timeline;
      $scope.tracingCtx.currentTimelineTimestamp = TracingServices.getCurrentTimelineTimestamp();
      $scope.updateTransactionHistory();
      $scope.tracingCtx.currentTimelineDuration = $scope.getCurrentTimelineDuration();

    }
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
    $scope.$watch('tracingCtx.currentHostConfig', function(newConfig, oldConfig) {
      if (newConfig.host && newConfig.pid && newConfig.project) {
        $scope.tracingCtx.currentTimeline = TracingServices.getTimeline(newConfig)
          .then(function(timeline) {

            updateTimelineData(timeline);
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
      $scope.hosts = TracingServices.fetchHosts({project:$scope.tracingCtx.currentApp.name})
        .then(function(response) {

          if (response.length && response.length > 0) {
            $scope.hosts = response;

            // pre select the first one
            var firstHost = TracingServices.getFirstHost();

            // set up the core data context
            $scope.tracingCtx.currentPids = firstHost.pids;
            $scope.tracingCtx.currentHostConfig = {
              project: $scope.tracingCtx.currentApp.name,
              host:firstHost.host,
              pid:firstHost.pids[0]
            };


            $scope.tracingCtx.currentTimeline = TracingServices.getTimeline($scope.tracingCtx.currentHostConfig)
              .then(function(timeline) {
                updateTimelineData(timeline);
              });


          }
          else {
            $log.debug('There are no tracing hosts');
          }

        })
        .catch(function(error) {
          $log.warn('error: ' + error.message);
        });
    };
    $scope.updateTransactionHistory = function() {
      $scope.tracingCtx.currentTransactionHistoryCollection = [];
      /*
       *
       * Process the transaction history list
       *
       * */
      TracingServices.getTransactionKeys({reqparams:$scope.tracingCtx.currentHostConfig})
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
            $scope.tracingCtx.currentTransactionKeys = response.hosts[$scope.tracingCtx.currentHostConfig.host] ? response.hosts[$scope.tracingCtx.currentHostConfig.host][$scope.tracingCtx.currentHostConfig.pid] : [];

            // iterate over the transaction keys
            $scope.tracingCtx.currentTransactionKeys.map(function(transaction) {
              /*
               *
               *   Transaction key
               *
               * */
              var transObj = {
                key: transaction
              };

              // history
              TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.tracingCtx.currentHostConfig.host, $scope.tracingCtx.currentHostConfig.pid)
                .then(function(response){

                  // get the history data per transaction
                  var rawTransactionData = JSON.parse(response.data);
                  // assign history data to ui model
                  transObj.history = rawTransactionData.hosts[$scope.tracingCtx.currentHostConfig.host][$scope.tracingCtx.currentHostConfig.pid];
                  $scope.tracingCtx.currentTransactionHistoryCollection.push(transObj);

                });
            });
          }
        });
    };
    $scope.setCurrentPFKey = function(key) {
      $scope.tracingCtx.currentPFKey = key;
    };
    $scope.init();

  }
]);
Tracing.controller('TracingMonitorController', [
  '$scope',
  '$log',
  function($scope, $log) {

  }
]);
