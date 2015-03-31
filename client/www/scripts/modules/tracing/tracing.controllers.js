Tracing.controller('TracingMainController', [
  '$scope',
  '$log',
  '$location',
  'TracingServices',
  'TimeSeries',
  'TraceEnhance',
  function($scope, $log, $location, TracingServices, TimeSeries, TraceEnhance) {
    var PMClient = require('strong-mesh-models').Client;
    $scope.pm = new PMClient('http://' + $location.host() + ':8701');
    //
    //
    //('http://' + $location.host() + ':' + $location.port() + '/manager');




    $log.debug('tracing controller');
    //$scope.tracingCtx.currentTimeline = {};
    //$scope.currentTransactionKeys = [];
    //$scope.currentTransactionHistoryCollection = [];
    //$scope.currentApp = 'wfp:helloworld';
    $scope.tracingCtx = {
      currentPFKey: '',
      currentTraceToggleBool: false,
      currentTimelineTimestamp: '',
      currentTimelineDuration: 0,
      currentTimelineKeyCollection: [],
      currentTrace: {},
      currentWaterfallKey: '',
      currentWaterfall: {},
      currentFunction: {},
      currentHostConfig: {},
      currentProcess: {},
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
      var dataPointCount = $scope.tracingCtx.currentTimeline.length;
      if (dataPointCount > 0) {
        return $scope.tracingCtx.currentTimeline[dataPointCount - 1].Uptime

      }

      return 0;
    };
    $scope.prevPFKey = function() {
      if ($scope.tracingCtx.currentTimelineKeyCollection) {
        var currIndex = $scope.tracingCtx.currentTimelineKeyCollection.indexOf($scope.tracingCtx.currentPFKey);
        if (currIndex > 1) {
          $scope.tracingCtx.currentPFKey = $scope.tracingCtx.currentTimelineKeyCollection[currIndex - 1];
        }
      }

    };
    $scope.nextPFKey = function() {
      if ($scope.tracingCtx.currentTimelineKeyCollection) {
        var currIndex = $scope.tracingCtx.currentTimelineKeyCollection.indexOf($scope.tracingCtx.currentPFKey);
        var len = $scope.tracingCtx.currentTimelineKeyCollection.length;
        if (len > 0) {
          if (currIndex < (len - 2)) {
            $scope.tracingCtx.currentPFKey = $scope.tracingCtx.currentTimelineKeyCollection[currIndex + 1];
          }
        }

      }
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
      var self = this;
      self.timeline = timeline;
      $scope.tracingCtx.currentTimelineKeyCollection = [];
      self.timeline.map(function(trace) {
        var t = trace;
        $scope.tracingCtx.currentTimelineKeyCollection.push(trace.__data.pfkey);
        //trace._t = moment(trace.ts).unix();
        //trace.Uptime = trace.p_ut;
        //trace['Load Average'] = trace.s_la;
      });
      $scope.$apply(function() {
        $scope.tracingCtx.currentTimeline = self.timeline;

      });

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

    $scope.closeTraceView = function() {
      $scope.tracingCtx.currentPFKey = '';
    };

    $scope.$watch('tracingCtx.currentPFKey', function(newKey, oldVal) {

      if (newKey) {
        $scope.tracingCtx.currentProcess.getTrace(newKey, function(err, trace) {
          if (err) {
            $log.warn('bad get trace: ' + err.message);
            return {};
          }
          var obj = JSON.parse(trace);
          var TE = TraceEnhance(obj);
          $scope.tracingCtx.currentTrace = TE;
          // too expensive to compare the trace
          $scope.$apply(function() {
            $scope.tracingCtx.currentTraceToggleBool = !$scope.tracingCtx.currentTraceToggleBool;

          });

        });

      }

    });

    $scope.ginit = function() {


      $scope.pm.instanceFind('1', function(err, instance) {
        if (err) {
          $log.debug('error finding instance 1: ' + err.message);
          return;
        }
        instance.processes(function(err, processes) {
          $scope.tracingCtx.currentProcess = processes[1];

          $scope.tracingCtx.currentProcess.getTimeline(function(err, rawResponse) {

            /*
            *
            * For now we need to process the redundant wrapper code
            *
            * */
            var trueResponse = TracingServices.convertTimeseries(rawResponse);

       //     $scope.$apply(function() {
              updateTimelineData(trueResponse.cpu);

           // });
          });


          //process.getMetaTransactions(function(err, metaTxs) {
          //
          //});
          //process.getTransaction(txId, function(err, txs) {
          //
          //});
          //
          //process.getTrace(pfKey, function(err, timeline) {
          //
          //});
        });
      });
    };
    $scope.fetchTrace = function(key) {

      return $scope.tracingCtx.currentProcess.getTrace(key, function(err, trace) {
        if (err) {
          $log.warn('bad get Trace: ' + err.message);
          return;
        }
        return trace;
      });

    };
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

      $scope.tracingCtx.currentProcess.getMetaTransactions(function(err, response) {
        if (err) {
          $log.warn('bad get meta transactions: ' + err.message);
        }
        if (response && response.length) {

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
          $scope.tracingCtx.currentTransactionKeys = response || [];

          // iterate over the transaction keys
          $scope.tracingCtx.currentTransactionKeys.map(function(transaction) {


            $scope.tracingCtx.currentProcess.getTransaction(encodeURIComponent(transaction), function(err, history) {
              if (err) {
                $log.warn('bad get history: ' + err.message);
              }
              transObj = {
                history: history,
                key: transaction
              };
              $scope.tracingCtx.currentTransactionHistoryCollection.push(transObj);
            });





            /*
             *
             *   Transaction key
             *
             * */
            //var transObj = {
            //  key: transaction
            //};
            //
            //// history
            //TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.tracingCtx.currentHostConfig.host, $scope.tracingCtx.currentHostConfig.pid)
            //  .then(function(response){
            //
            //    // get the history data per transaction
            //    var rawTransactionData = JSON.parse(response.data);
            //    // assign history data to ui model
            //    transObj.history = rawTransactionData.hosts[$scope.tracingCtx.currentHostConfig.host][$scope.tracingCtx.currentHostConfig.pid];
            //    $scope.tracingCtx.currentTransactionHistoryCollection.push(transObj);
            //
            //  });
          });
        }
        else {
          $log.warn('no response or length meta transactions: ');
        }
      });

      /*
       *
       * Process the transaction history list
       *
       * */
      //TracingServices.getTransactionKeys({reqparams:$scope.tracingCtx.currentHostConfig})
      //  .then(function(response) {
      //
      //
      //    // make sure we get a list
      //    if (response.hosts) {
      //
      //      /*
      //       the current context list of transactions
      //
      //       we need to iterate over them and create a deeper object than the simple one used by transaction-list component
      //
      //       trasObj = {
      //       key: transaction,
      //       history: {object based on api call}
      //       };
      //
      //       */
      //      // var rawTransactionList = response.hosts[$scope.currentHostConfig.host] ? response.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid] : [];
      //      // isolate the transactions for this pid
      //      $scope.tracingCtx.currentTransactionKeys = response.hosts[$scope.tracingCtx.currentHostConfig.host] ? response.hosts[$scope.tracingCtx.currentHostConfig.host][$scope.tracingCtx.currentHostConfig.pid] : [];
      //
      //      // iterate over the transaction keys
      //      $scope.tracingCtx.currentTransactionKeys.map(function(transaction) {
      //        /*
      //         *
      //         *   Transaction key
      //         *
      //         * */
      //        var transObj = {
      //          key: transaction
      //        };
      //
      //        // history
      //        TracingServices.transactionHistory(encodeURIComponent(transaction), $scope.tracingCtx.currentHostConfig.host, $scope.tracingCtx.currentHostConfig.pid)
      //          .then(function(response){
      //
      //            // get the history data per transaction
      //            var rawTransactionData = JSON.parse(response.data);
      //            // assign history data to ui model
      //            transObj.history = rawTransactionData.hosts[$scope.tracingCtx.currentHostConfig.host][$scope.tracingCtx.currentHostConfig.pid];
      //            $scope.tracingCtx.currentTransactionHistoryCollection.push(transObj);
      //
      //          });
      //      });
      //    }
      //  });
    };
    $scope.setCurrentPFKey = function(key) {
      $scope.tracingCtx.currentPFKey = key;
    };
    $scope.ginit();

  }
]);
Tracing.controller('TracingMonitorController', [
  '$scope',
  '$log',
  function($scope, $log) {

  }
]);
