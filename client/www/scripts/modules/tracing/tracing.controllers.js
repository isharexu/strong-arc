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
    var PMClient = require('strong-mesh-models').Client;
    $scope.pm = {};

    $scope.managerHosts = [];    // $location.host()
    $scope.selectedPMHost = {};

   // var hostName = 'ec2-54-67-79-53.us-west-1.compute.amazonaws.com';


    $scope.resetTracingCtx = function() {
      $scope.tracingCtx = {
        currentPFKey: '',
        currentPMHost: {},
        currentTraceToggleBool: false,
        currentTimelineTimestamp: '',
        currentTimelineDuration: 0,
        currentTimelineKeyCollection: [],
        currentTrace: {},
        currentWaterfallKey: '',
        currentWaterfall: {},
        currentFunction: {},
        currentProcesses: [],
        currentProcess: {},
        currentPids: [],
        currentTimeline: {},
        currentTransactionKeys: [],
        currentTransactionHistoryCollection: [],
        currentApp: {name: 'wfp:helloworld'}
      };
    };
    $scope.selectedProcess = {};
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
    var qFeedback = function(message) {

      $scope.systemFeedback.push(message);


    };

    $scope.mesh = require('strong-mesh-client')('http://' + $location.host() + ':' + $location.port() + '/manager');
    qFeedback('trace: check for available pm hosts');

    $scope.init = function() {
      $scope.resetTracingCtx();
      $scope.mesh.models.ManagerHost.find(function(err, hosts) {
        qFeedback('trace: found at least one');

        if (hosts && hosts.map) {
          // qFeedback('[experiement] init available PM host instances (may or may not be running): ' +  hosts.length);
          $scope.managerHosts = hosts;


          /*
           *
           * We have a list of hosts
           *
           *
           * set default selected
           *
           * */


          if (!$scope.tracingCtx.currentPMHost.host) {
            $scope.tracingCtx.currentPMHost = $scope.selectedPMHost = $scope.managerHosts[0];
          }

          $scope.main();
        }
      });
    };





    $scope.main = function() {

      qFeedback('trace: init');


      var hostName = $scope.tracingCtx.currentPMHost.host;
      var hostPort = $scope.tracingCtx.currentPMHost.port;
      qFeedback('trace: get pm instance');
      $scope.pm = new PMClient('http://' + hostName + ':' + hostPort );


      qFeedback('trace: pm.instanceFind id=1');
      $scope.pm.instanceFind('1', function(err, instance) {
        if (err) {
          $log.warn('trace: error finding pm instance: ' + err.message);
          qFeedback('trace: error finding pm instance: ' + err.message);
          return;
        }
        if (!instance){
          $log.warn('trace: no instance returned: ');
          qFeedback('trace: no instance returned: ');
          return;
        }
        qFeedback('trace: assign pm instance to currentInstance');
        qFeedback('trace: check for running processes');
        $scope.tracingCtx.currentPMInstance = instance;
        $scope.tracingCtx.currentPMInstance.processes(function(err, processes) {
          if (err) {
            $log.warn('bad get processes: ' + err.message);
            return;
          }
          if (!processes) {
            $log.warn('no processes');

          }
          /*
          *
          * we have processes but they need to be filtered
          *
          * */

          var filteredProcesses = [];

          // get rid of the supervisor
          processes.map(function(proc) {
            if (proc.workerId !== 0) {
              filteredProcesses.push(proc);
            }
          });

          qFeedback('trace: running processes: ' + filteredProcesses.length);
          $scope.tracingCtx.currentProcesses = filteredProcesses;
          qFeedback('trace: assign first process as default');
          $scope.tracingCtx.currentProcess = filteredProcesses[1];  //default
          $scope.selectedProcess = filteredProcesses[1];
          qFeedback('trace: trigger timeline initialization');
          $scope.refreshTimelineProcess();

        });
      });
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


    $scope.closeTraceView = function() {
      // need a better way to do this

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


    $scope.clearFeedback = function() {
      $scope.systemFeedback = [];
    };
    $scope.changePMHost = function() {
      if ($scope.selectedPMHost.host) {
        $scope.resetTracingCtx();
        $scope.tracingCtx.currentPMHost = $scope.selectedPMHost;
        $scope.main();
      }
    };


    $scope.changePid = function() {
      $scope.tracingCtx.currentProcess = $scope.selectedProcess;
      if ($scope.tracingCtx.currentProcess) {
        $scope.refreshTimelineProcess();
      }
    };

    $scope.refreshTimelineProcess = function() {
      $scope.tracingCtx.currentProcess.getTimeline(function(err, rawResponse) {

        if (err) {
          $log.warn('bad get timeline: ' + err.message);
          return;
        }


        var seconds  = 0;

        if (rawResponse.length && rawResponse.length > 0) {
          var seconds = rawResponse[rawResponse.length - 1].p_ut;

        }

        var message = '';
        if (seconds > 604800) {
          message = 'more than a week';
        }
        if (seconds > 86400) {
          message = 'more than a day';
        }
        if (seconds > 3600) {
          message = 'more than an hour';
        }
        if (seconds > 59) {
          message = 'more than a minute';
        }
        else {
          message = seconds + ' seconds';
        }



        $scope.tracingCtx.timelineDuration =  message;
       // $scope.tracingCtx.timelineStart = rawResponse[0].ts;
        $scope.tracingCtx.timelineStart = 0;
        if (seconds > 0) {
          $scope.tracingCtx.timelineStart = rawResponse[0].ts;
        }

        /*
         *
         *  process the response
         *
         * */
        var trueResponse = TracingServices.convertTimeseries(rawResponse);

        updateTimelineData(trueResponse.cpu);
      });
    };
    $scope.changeProcess = function(process) {
      if (process) {
        $scope.tracingCtx.currentProcess = process;
        $scope.refreshTimelineProcess();
      }
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
        if (err) {
          $log.warn('bad get meta transactions: ' + err.message);
          return;
        }
       // $scope.$apply(function() {
        $scope.tracingCtx.currentTransactionKeys = response;

        //});


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
           * - TODO expensive so only do it on demand
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
    $scope.setCurrentPFKey = function(key) {
      $scope.tracingCtx.currentPFKey = key;
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

    $scope.init();
  }
]);

Tracing.controller('TracingMonitorController', [
  '$scope',
  '$log',
  function($scope, $log) {

  }
]);
