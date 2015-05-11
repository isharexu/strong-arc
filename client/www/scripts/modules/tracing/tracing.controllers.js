Tracing.controller('TracingMainController', [
  '$scope',
  '$log',
  '$timeout',
  '$interval',
  '$location',
  'TracingServices',
  'TimeSeries',
  'TraceEnhance',
  function($scope, $log, $timeout, $interval, $location, TracingServices, TimeSeries, TraceEnhance) {

    $scope.pm = {};
    $scope.systemFeedback = [];  // FEEDBACK
    $scope.managerHosts = [];    // $location.host()
    $scope.selectedPMHost = {};
    $scope.processes = [];
    $scope.showTransactionHistoryLoading = true;
    $scope.showTimelineLoading = true;
    $scope.selectedProcess = {};
    $scope.tracingCtx = {};

    /*
     *
     * INIT
     *
     * */
    $scope.init = function() {
      $scope.resetTracingCtx();

      // check if user has a valid metrics license
      TracingServices.validateLicense()
        .then(function(isValid) {
          // isValid = true;
          if (!isValid) {
            $log.warn('invalid tracing license');
            return;
          }

          $scope.managerHosts = TracingServices.getManagerHosts(function(hosts) {
            $scope.managerHosts = hosts;
            if (!$scope.selectedPMHost.host) {
              $scope.selectedPMHost = {
                host: $scope.managerHosts[0].host,
                port: $scope.managerHosts[0].port
              }
            }
            $scope.main();
          });

        })
        .catch(function(error) {
          $log.warn('exception validating tracing license (controller)');
          return;
        });

    };

    /*
     *
     * MAIN
     *
     * */
    $scope.main = function() {

      if (!$scope.selectedPMHost.host) {
        // set notification banner?
        $log.warn('tracing main: no host selected');
        return;
      }

      // check for change before re-render
      if ($scope.tracingCtx.currentPMHost) {
        if (($scope.selectedPMHost.host === $scope.tracingCtx.currentPMHost.host) &&
          ($scope.selectedPMHost.port === $scope.tracingCtx.currentPMHost.port)) {
          return;
        }
      }

      TracingServices.getFirstPMInstance($scope.selectedPMHost, function(instance) {
        $scope.tracingCtx.currentPMInstance = instance;

        $scope.tracingCtx.currentPMHost = {
          host:$scope.selectedPMHost.host,
          port:$scope.selectedPMHost.port
        };
        $scope.tracingCtx.currentPMInstance = instance;
        $scope.tracingCtx.currentBreadcrumbs[0] = {
          instance: $scope.tracingCtx.currentPMInstance,
          label: $scope.tracingCtx.currentPMInstance.applicationName
        };
        $scope.tracingCtx.currentPMInstance.processes(function(err, processes) {
          if (err) {
            $log.warn('bad get processes: ' + err.message);
            return;
          }
          if (!processes) {
            $log.warn('no processes');

          }
          /*
           * we have processes but they need to be filtered
           * */
          var filteredProcesses = [];

          // get rid of the supervisor
          processes.map(function(proc) {
            if (proc.workerId !== 0) {
              filteredProcesses.push(proc);
            }
          });
          $scope.processes = filteredProcesses;
          $scope.tracingCtx.currentProcesses = filteredProcesses;
          $scope.tracingCtx.currentProcess = filteredProcesses[0];  //default
          $scope.selectedProcess = filteredProcesses[0];
          $scope.refreshTimelineProcess();

        });

      });

    };
    /*
    * reset main context variables
    * */
    $scope.resetTracingCtx = function() {
      $scope.tracingCtx = {
        currentPFKey: '',
        selectedManagerHost: {},
        currentPMHost: {},
        currentPMInstance: {},
        currentTraceToggleBool: false,
        currentTimelineTimestamp: '',
        currentTimelineDuration: 0,
        currentTimelineKeyCollection: [],
        currentTrace: {},
        currentBreadcrumbs: [],
        currentWaterfallKey: '',
        currentWaterfall: {},
        currentFunction: {},
        currentProcesses: [],
        currentProcess: {},
        currentPids: [],
        currentTimeline: [],
        currentTransactionKeys: [],
        currentTransactionHistoryCollection: [],
        currentApp: {name: ''}
      };
    };

    /*
    *
    *
    *
    * UPDATE TIMELINE DATA
    *
    *
    * */
    function updateTimelineData(timeline) {
      var self = this;
      self.timeline = timeline;
      $scope.tracingCtx.currentTimelineKeyCollection = [];
      self.timeline.map(function(trace) {
        var t = trace;
        $scope.tracingCtx.currentTimelineKeyCollection.push(trace.__data.pfkey);
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
     * REFRESH TIMELINE PROCESS
     *
     * */
    $scope.refreshTimelineProcess = function() {
      $scope.tracingCtx.currentProcess.getTimeline(function(err, rawResponse) {
        $scope.showTimelineLoading = false;
        if (err) {
          $log.warn('bad get timeline: ' + err.message);
          return;
        }

        $scope.tracingCtx.currentPFKey = '';

        $scope.tracingCtx.timelineStart = 0;

        /*
         *
         *  process the response
         *
         * */
        var trueResponse = TracingServices.convertTimeseries(rawResponse);

        updateTimelineData(trueResponse.cpu);
      });
    };



    /*

    HELPERS

    *
    * GET TIMESTAMP FOR KEY
    *
    * */
    $scope.getTimestampForPFKey = function(pfKey) {
      if ($scope.tracingCtx && $scope.tracingCtx.currentTimeline.length) {
        for (var i = 0;i < $scope.tracingCtx.currentTimeline.length;i++) {
          var instance = $scope.tracingCtx.currentTimeline[i];
          if (instance.__data && (instance.__data.pfkey === pfKey)) {
            return instance._t;

          }
        }
        return 0;
      }
      return 0;
    };
    /*
    *
    * GET TIMELINE DURATION
    *
    * */
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
    /*
     *
     * GET TRACE DATA FOR KEY
     *
     * TODO move this into a service
     *
     * */
    $scope.fetchTrace = function(key) {
      return $scope.tracingCtx.currentProcess.getTrace(key, function(err, trace) {
        if (err) {
          $log.warn('bad get Trace: ' + err.message);
          return;
        }
        return trace;
      });
    };

    /*
    *
    * PF KEY WATCH
    *
    * if we get a key then load the trace file
    * set currentTrace
    * toggle currentTraceToggleBool
    * - watch target for directives
    * - instead of comparing the trace data object
    *
    * */
    $scope.$watch('tracingCtx.currentPFKey', function(newKey, oldVal) {
      if (newKey) {
        $scope.tracingCtx.currentTrace = {};

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


    /*

    DATA MODEL CHANGERS
    *
    * CHANGE PM HOST
    *
    *
    * */
    // from the host selector in tracing header
    $scope.changePMHost = function(host) {
      if (host.host && host.port) {
        //$scope.resetTracingCtx();
        $scope.selectedPMHost = host;


        $scope.main();
      }
    };
    /*
    *
    * CHANGE PID
    *
    * */
    $scope.changePid = function() {
      alert('change process B');
      $scope.tracingCtx.currentProcess = $scope.selectedProcess;
      if ($scope.tracingCtx.currentProcess) {
        $scope.tracingCtx.currentTrace = {};

        $scope.refreshTimelineProcess();
        $scope.tracingCtx.currentWaterfallKey = '';

      }
    };
    /*
    *
    * SET ACTIVE PID
    *
    * */
    $scope.setActiveProcess = function(process) {
      $scope.showTimelineLoading = true;
      $scope.tracingCtx.currentTimeline = [];
      $scope.tracingCtx.currentTransactionKeys = [];
      $scope.tracingCtx.currentTransactionHistoryCollection = [];
      $scope.tracingCtx.currentWaterfallKey = '';
      $scope.tracingCtx.currentTrace = {};

      $scope.tracingCtx.currentProcess = process;
      if ($scope.tracingCtx.currentProcess) {
        $scope.refreshTimelineProcess();
      }
    };
    /*
    *
    * CHANGE PROCESS
    *
    * */
    $scope.changeProcess = function(process) {
      alert('change process B');
      if (process) {
        $scope.tracingCtx.currentProcess = process;
        $scope.refreshTimelineProcess();
      }
    };
    /*
     *
     * SET PF KEY
     *
     * */
    $scope.setCurrentPFKey = function(key) {
      $scope.tracingCtx.currentTrace = {};
      $scope.tracingCtx.currentPFKey = key;
      $scope.tracingCtx.currentWaterfallKey = '';

    };
    /*
     * PREV KEY
     * */
    $scope.prevPFKey = function() {
      if ($scope.tracingCtx.currentTimelineKeyCollection) {
        var currIndex = $scope.tracingCtx.currentTimelineKeyCollection.indexOf($scope.tracingCtx.currentPFKey);
        if (currIndex > 1) {
          $scope.tracingCtx.currentTrace = {};
          $scope.tracingCtx.currentPFKey = $scope.tracingCtx.currentTimelineKeyCollection[currIndex - 1];
          $scope.tracingCtx.currentWaterfallKey = '';
        }
      }

    };
    /*
     * NEXT KEY
     * */
    $scope.nextPFKey = function() {
      if ($scope.tracingCtx.currentTimelineKeyCollection) {
        var currIndex = $scope.tracingCtx.currentTimelineKeyCollection.indexOf($scope.tracingCtx.currentPFKey);
        var len = $scope.tracingCtx.currentTimelineKeyCollection.length;
        if (len > 0) {
          if (currIndex < (len - 2)) {
            $scope.tracingCtx.currentTrace = {};
            $scope.tracingCtx.currentPFKey = $scope.tracingCtx.currentTimelineKeyCollection[currIndex + 1];
            $scope.tracingCtx.currentWaterfallKey = '';
          }
        }

      }
    };
    /*
    *
    *   TRANSACTION HISTORY
    *
    *
    *
    * */
    $scope.updateTransactionHistory = function() {
      $scope.tracingCtx.currentTransactionHistoryCollection = [];

      $scope.tracingCtx.currentProcess.getMetaTransactions(function(err, response) {
        $scope.showTransactionHistoryLoading = false;
        if (err) {
          $log.warn('bad get meta transactions: ' + err.message);

          return;
        }
        $scope.tracingCtx.currentTransactionKeys = response;


          /*
           the current context list of transactions

           we need to iterate over them and create a deeper object than the simple one used by transaction-list component

           trasObj = {
           key: transaction,
           history: {object based on api call}
           };

           */
          //var rawTransactionList = response.hosts[$scope.currentHostConfig.host] ? response.hosts[$scope.currentHostConfig.host][$scope.currentHostConfig.pid] : [];
          // isolate the transactions for this pid

          // iterate over the transaction keys
        $scope.tracingCtx.currentTransactionKeys.map(function(transaction) {
          /*
           *
           * Transaction History
           *
           * - TODO expensive so should only do it on demand
           *
           * */

          $scope.tracingCtx.currentProcess.getTransaction(encodeURIComponent(transaction),
            function (err, history) {
              if (err) {
                $log.warn('bad get history: ' + err.message);
              }
              transObj = {
                history: history,
                key: transaction
              };
              $scope.tracingCtx.currentTransactionHistoryCollection.push(transObj);
            });
        });

      });


    };
    /*
     *
     * NAV
     *
     * BACK TO TIMELINE
     *
     *
     * */
    $scope.backToTimeline = function() {
      $scope.tracingCtx.currentPFKey = '';
      $scope.tracingCtx.currentTrace = {};
      $scope.tracingCtx.currentWaterfallKey = '';
    };
    /*
     *
     * BACK TO TRACE
     *
     * */
    $scope.backToTrace = function() {
      $scope.tracingCtx.currentWaterfallKey = '';
    };
    /*
     *
     * CLOSE TRACE VIEW
     *
     * */
    $scope.closeTraceView = function() {
      // need a better way to do this

      $scope.tracingCtx.currentTrace = {};
      $scope.tracingCtx.currentPFKey = '';
      $scope.tracingCtx.currentWaterfallKey = '';
    };



    /*
    * TIMESTAMP FORMAT
    * */
    $scope.tsText = function(ts){
      return moment(ts).fromNow() +' (' + moment(ts).format('ddd, MMM Do YYYY, h:mm:ss a') + ')'
    };


    window.onresize = function() {
      window.setScrollView('.tracing-content-container');
    };

    /*
    *
    * INIT
    *
    * */
    $scope.init();

    /*
     *
     * Feedback
     *
     * */
    var sFeedback = [];
    $scope.systemFeedback = [];
    $scope.closeFeedback = function() {
      $scope.systemFeedback = [];
    };

    var bWriteFeedback = true;
    var writeFeedback = function() {

      if (bWriteFeedback) {
        $scope.$apply(function() {
          $scope.systemFeedback = sFeedback;
        });
      }

    };


    $scope.clearFeedback = function() {
      $scope.systemFeedback = [];
    };
    /*
     *
     * END FEEDBACK
     *
     * */
  }
]);

