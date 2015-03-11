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
    $scope.currentHostConfig = {};
    $scope.currentHost;
    $scope.currentPid;
    $scope.currentPids = [];

    $scope.setCurrentWaterfallKey = function(key) {
      if (key && key.length > 0) {
        $scope.currentWaterfallKey = key;
      }
    };

    $scope.$watch('currentHost', function(newHost,oldHost) {
      if (newHost) {
        $scope.currentHostConfig.host = newHost;
        // iterate over the hosts and set currentHostConfig to new value
        $scope.hosts.map(function(host) {

          if (host.host === newHost) {
            $scope.currentPids = host.pids;
            $scope.currentHostConfig.pid = host.pids[0];
          }
        });

        //$scope.currentHostConfig.project = $scope.currentProject, $scope.currentPid = newHost.pids[0];

      }
    });
    $scope.$watch('currentPid', function(newPid,oldPid) {
      // iterate over the hosts and set currentHostConfig to new value
      if (newPid) {
        $scope.currentHostConfig.pid = newPid;
        $scope.currentPid = newPid;

      }
    });

    window.onresize = function() {
      window.setScrollView('.monitor-view');
    };
    //$scope.showTraceView = function(data) {
    //  $log.debug('load trace view: ' + data.pfkey);
    //  $scope.currentPFKey = data.pfkey;
    //};
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
      $scope.hosts = TracingServices.fetchHosts({project:$scope.currentProject})
        .then(function(response) {

          if (response.length && response.length > 0) {
            $scope.hosts = response;

            // pre select the first one
            var firstHost = TracingServices.getFirstHost();

            // set up the core data context
            $scope.currentPids = firstHost.pids;
            $scope.currentHostConfig = {
              project: $scope.currentProject,
              host:firstHost.host,
              pid:firstHost.pids[0]
            };


            $scope.currentTimeline = TracingServices.getTimeline($scope.currentHostConfig)
              .then(function(timeline) {
                $scope.currentTimeline = timeline;
              });
            $scope.transactionHistoryCollection = [];
            $scope.transactionKeys = TracingServices.transactionKeys({reqparams:$scope.currentHostConfig})
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
                  var transactionKCollection = response.hosts[$scope.currentHostConfig.host] ? response.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid] : [];
                  $scope.transactionKeys = response.hosts[$scope.currentHostConfig.host] ? response.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid] : []

                  // iterate over the transactions
                  transactionKCollection.map(function(transaction) {
                    var transObj = {
                      key: transaction
                    };

                    TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.currentHostConfig.host, $scope.currentHostConfig.pid)
                      .then(function(response){

                        var rawTransactionData = JSON.parse(response.data);
                        transObj.history = rawTransactionData.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid];
                        $log.debug('Assign transactionData');
                        //$log.debug('transdata: ' + response.data);
                        //self.renderItem(key, history.hosts[host][pid])
                        $scope.transactionHistoryCollection.push(transObj);
                      });


                  });

                }
              });
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
