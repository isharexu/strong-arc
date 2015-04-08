Tracing.directive('expTimeSeries', [
  '$log',
  function($log) {
    return {
      restrict: 'E',
      link: function(scope, el, attrs) {
        scope.$watch('tracingCtx.currentTimeline', function(newTimeline, oldTimeline) {
          if (newTimeline && newTimeline.length) {
            React.renderComponent(TracingTraceList({scope:scope}), el[0]);
          }
        }, true);
      }
    }
  }
]);
Tracing.directive('expAbstractTimeline', [
  '$log',
  function($log) {
    return {
      restrict: 'E',
      link: function(scope, el, attrs) {
        scope.$watch('tracingCtx.currentPFKey', function(newTraceKey, oldTimeline) {
          if (newTraceKey) {
            React.renderComponent(TracingAstractTimeline({scope:scope}), el[0]);
          }
        }, true);
      }
    }
  }
]);
Tracing.directive('slTracingInspectorCosttree', [
  '$log',
  '$timeout',
  function($log, $timeout) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.inspector.costtree.html',
      restrict: 'E',
      link: function(scope, el, attrs) {
        $timeout(function() {
          window.setScrollView('.tracing-content-container');
        }, 300);
      }
    }

  }
]);
Tracing.directive('slTracingInspectorEventloop', [
  '$log',
  function($log) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.inspector.eventloop.html',
      restrict: 'E',
      link: function(scope, el, attrs) {

      }
    }

  }
]);
Tracing.directive('slTracingInspectorFunctions', [
  '$log',
  function($log) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.inspector.function.html',
      restrict: 'E',
      link: function(scope, el, attrs) {

      }
    }

  }
]);
Tracing.directive('slTracingInspectorBase', [
  '$log',
  function($log) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.inspector.base.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {

      }],
      link: function(scope, el, attrs) {


      }
    }

  }
]);
Tracing.directive('slTracingWaterfallEventloop', [
  '$log',
  'EventLoop',
  'FlameGraph',
  'RawTree',
  'Inspector',
  'Color',
  function($log, EventLoop, FlameGraph, RawTree, Inspector, Color) {
    return {
      restrict: 'E',
      controller: ['$scope', function($scope) {

      }],
      link: function(scope, el, attrs) {



      }
    }
  }
]);
Tracing.directive('slTracingWaterfallSummary', [
  '$log',
  function($log) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.waterfall.summary.html',
      restrict: 'E',
      link: function(scope, el, attrs) {


      }
    }
  }
]);
Tracing.directive('slTracingHeader', [
  '$log',
  function($log) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.header.html',
      restrict: 'E',
      controller: [
        '$scope',
        function($scope) {

        }
      ]
    }
  }
]);
Tracing.directive('slTracingWaterfallView', [
  '$log',
  'Sha1',
  'EventLoop',
  'FlameGraph',
  'RawTree',
  'Inspector',
  'Color',
  function($log, Sha1, EventLoop, FlameGraph, RawTree, Inspector, Color) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.waterfall.view.html',
      restrict: 'E',
      controller: [
        '$scope',
        '$log',
        function($scope, $log) {

          $scope.inspectorModel = {};

          $scope.showDetailView = function() {
            return ($scope.tracingCtx.currentWaterfallKey && $scope.tracingCtx.currentWaterfallKey.length > 0);
          };
          $scope.closeDetailView = function() {
            $scope.tracingCtx.currentWaterfallKey = '';
          };
          $scope.previousWaterfall = function() {
            var totalLen = $scope.tracingCtx.currentTrace.waterfalls.length;
            for (var i = 0;i < totalLen; i++) {
              var wf = $scope.tracingCtx.currentTrace.waterfalls[i];
              if ((wf.id === $scope.tracingCtx.currentWaterfallKey) || (Sha1(wf.id) === $scope.tracingCtx.currentWaterfallKey)) {
                if (i > 0) {
                  $scope.tracingCtx.currentWaterfallKey = $scope.tracingCtx.currentTrace.waterfalls[i - 1].id;
                  break;
                }
              }
            }
          };
          $scope.isShowTopCosts = function() {
            if ($scope.tracingCtx.currentFunction.item && $scope.tracingCtx.currentFunction.item.costSummary && $scope.tracingCtx.currentFunction.item.costSummary.topCosts) {
              return true;
            }
            return false;
          };
          $scope.nextWaterfall = function() {
            var totalLen = $scope.tracingCtx.currentTrace.waterfalls.length;
            for (var i = 0;i < totalLen; i++) {
              var wf = $scope.tracingCtx.currentTrace.waterfalls[i];
              if ((wf.id === $scope.tracingCtx.currentWaterfallKey) || (Sha1(wf.id) === $scope.tracingCtx.currentWaterfallKey)) {
                if (i < ($scope.tracingCtx.currentTrace.waterfalls.length - 2)) {
                  $scope.tracingCtx.currentWaterfallKey = $scope.tracingCtx.currentTrace.waterfalls[i + 1].id;
                  break;
                }
              }
            }

          };
          $scope.loadWaterfallById = function(waterfallKey) {
            var waterfall = [];
            $scope.tracingCtx.currentTrace.waterfalls.map(function(w) {
              if ((w.id === waterfallKey) || (Sha1(w.id) === waterfallKey)) {
                waterfall = w;
              }
            });
            return waterfall;
          };
          $scope.showEventloopInspector = function() {
            return false;
          };
          $scope.showCosttreeInspector = function() {
            return true
          };
          $scope.showFunctionsInspector = function() {
            return false;
          };


        }],
      link: function(scope, el, attrs) {
        scope.$watch('tracingCtx.currentWaterfallKey', function(newVal, oldVal) {
          if (newVal && newVal.length > 0) {
            scope.tracingCtx.currentWaterfall = scope.loadWaterfallById(newVal);
            //jQuery('[data-id="TraceDetailView"]').offset().top;
            /*
            *
            * modify the ui to provide good ux for nav
            *
            * get rid of memory chart
            * get rid of transaction history
            * shrink the cpu chart
            * indicate which point in time is selected
            * animate the scroll
            *
            * */
          }
        });
        scope.charts = [];
        scope.selected = {};
        scope.eventloop = new EventLoop();
        scope.flame = new FlameGraph();
        scope.rawtree = new RawTree();
        scope.inspector = new Inspector({
          app: {},
          trace: scope.tracingCtx.currentTrace,
          el: jQuery('[role=inspector]')[0]
        });


        scope.eventloop.init('[data-hook="eventloop"]', { expanded: true, color: Color });
        scope.flame.init('[data-hook="flame"]', {colors: Color, disableZoom: true});
        scope.rawtree.init('[data-hook="rawtree"]', {colors: Color});



        scope.preview = function mouseEnter(d){

          //var self = inspector;
          //scope.tracingCtx.currentFunction = d;
          scope.$apply(function() {
            scope.inspectorModel = d;

          });
          $log.debug('PREVIEW: ' + scope.tracingCtx.currentFunction.type);
          /*
           *
           * need to switch on type
           * - flame
           * - eventLoop
           * - rawTree
           *
           * */

          scope.charts.forEach(function(chart) {
            if (chart.highlight) chart.highlight(scope.tracingCtx.currentFunction.item)
          });
        };
        scope.restore = function mouseLeave(){
          $log.debug('RESTORE');
          // scope.currentFunction = '';

          scope.$apply(function() {
            scope.inspectorModel = scope.tracingCtx.currentFunction || {};

          });


          scope.charts.forEach(function(chart) {
            if (chart.highlight) chart.highlight()
          });
          //scope.inspector.render();
          //self.render(this.selected)
        };
        //
        scope.select = function select(d) {
         // var self = inspector;
          scope.selected = (scope.selected && scope.selected.item == d.item) ? false : d
          // self.render(self.selected)
          scope.charts.forEach(function(chart) {
            if (chart.select){
              chart.select(scope.selected && scope.selected.item);
            }
          });
          scope.tracingCtx.currentFunction = scope.selected;
        };
        //
        scope.deselect = function deselect() {
         // var self = inspector;
          delete scope.selected;
          // self.render()
        };
        var setupListeners = function setupListeners(charts){
        //  var self = inspector;
          scope.charts = charts;
          scope.charts.forEach(function(d){
            d.on('mouseenter', scope.preview.bind(self));
            d.on('mouseleave', scope.restore.bind(self));
            d.on('click', scope.select.bind(self));
          })
        };
        setupListeners([scope.rawtree, scope.eventloop, scope.flame]);

        scope.$watch('tracingCtx.currentWaterfall', function(newWaterfall, oldVal) {
          if (newWaterfall && newWaterfall.id) {
            scope.eventloop.update(newWaterfall, scope.tracingCtx.currentTrace.functions);
            scope.flame.update(newWaterfall, scope.tracingCtx.currentTrace.functions);
            scope.rawtree.update(newWaterfall);
            //scope.inspector.render(newWaterfall);
          }
        });
      }
    }
  }
]);
Tracing.directive('slTracingTraceSummary', [
  '$log',
  'Sha1',
  'EventLoop',
  'PieChart',
  'MSFormat',
  'TracingServices',
  '$timeout',
  'Color',
  'Slug',
  function($log, Sha1, EventLoop, PieChart, msFormat, TracingServices, $timeout, Color, slug) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.trace.summary.html',
      restrict: 'E',
      link: function(scope, el, attrs) {
        scope.mappedTransactions = [];
        scope.format = d3.format('.3s');

        scope.$watch('tracingCtx.currentTraceToggleBool', function(newVal, oldVal) {
          if (scope.tracingCtx.currentTrace && scope.tracingCtx.currentTrace.transactions) {
        //    $log.debug('WAIT FOR IT');
           // $timeout(function() {
              scope.mappedTransactions = TracingServices.getMappedTransactions(scope.tracingCtx.currentTrace.transactions.transactions);
              render();

         //   }, 4000);

          }
        }, true);

        scope.msFormat = function(d){
          return scope.format(d/1000000) + 's';
        };

        scope.tsText = function(ts){
          return moment(ts).fromNow() +' (' + moment(ts).format('ddd, MMM Do YYYY, h:mm:ss a') + ')'
        };


        //$scope.mappedTransactions = $scope.mapTransactions($scope.tracingCtx.currentTrace.transactions.transactions)


        var traceToAsyncPie = function(trace){
          var data = [
            {
              key: "async",
              value: trace.summary_stats.percentAsync,
              fillClass: 'async'
            },
            {
              key: "sync",
              value: trace.summary_stats.percentBlocked,
              fillClass: 'blocked'
            }
          ];
          return data
        };

        var traceToIdlePie = function(trace){
          var data = [
            {
              key: "idle",
              value: trace.summary_stats.percentIdle,
              fillClass: 'idle'
            },
            {
              key: "busy",
              value: trace.summary_stats.percentOperating,
              fillClass: 'operating'
            }
          ];
          return data
        };

        var asyncpie = new PieChart();
        var idlepie = new PieChart();

        asyncpie.init('[role="summary-async-pie"]', {fixedWidth: 200, fixedHeight: 200});
        idlepie.init('[role=summary-idle-pie]', {fixedWidth: 200, fixedHeight: 200});
        function render() {
          $log.debug('|--- render ---|');
          /*
          *
          * Pie Charts
          *
          *
          * */

          asyncpie.update(traceToAsyncPie(scope.tracingCtx.currentTrace));
          idlepie.update(traceToIdlePie(scope.tracingCtx.currentTrace));

          /*
          *
          * Transaction History
          *
          * */
          var trans = d3.select('[role=transactions]').selectAll('li').data(scope.mappedTransactions, function key(d){ return d.id })
          trans.exit().remove()

          // transaction enter
          var transactionEnter = trans.enter()
            .append('li')
            .attr('class', 'list-group-item transaction')
            .classed('expanded', function (d) { return true })
           // .classed('expanded', function (d) { return self.app.expanded[d.id] })

          var transactionTableEnter = transactionEnter.append('table')
            .attr('role', 'toggle')

          var transactionTableRow = transactionTableEnter.append('tr')
          transactionTableRow.append('td').attr('class', 'transaction-badge')
            .attr('class', 'transaction-badge')
            .append('span')
            .attr('class', 'badge')
          transactionTableRow.append('td').attr('class', 'transaction-route').text(function(d){ return d.id })
          transactionTableRow.append('td').attr('class', 'transaction-jsmicros')
          transactionTableRow.append('td').attr('class', 'transaction-totalmicros')
          transactionTableRow.append('td').attr('class', 'transaction-async')
          transactionTableRow.append('td').attr('class', 'transaction-blocked')

          var panelEnter = transactionEnter.append('ul')
            .attr('class', 'waterfalls')

          //update set
          trans.select('span.badge')
            .text(function(d){ return d.waterfalls.length})

          var waterfalls = trans.select('.waterfalls')
            .selectAll('.waterfall')
            .data(function (d) { return d.waterfalls}, function(d){ return d.id})

          var waterfall = waterfalls.enter()
            .append('div')
            .attr('class', 'waterfall panel panel-default')
            .attr('data-id', function(d){ return Sha1(d.id) })

          var waterfallHeadingTableEnter = waterfall.append('div')
            .attr('class', 'panel-heading')
            .append('table');

          var waterfallTableHeaderEnter = waterfallHeadingTableEnter
            .append('thead')
            .append('tr');

          waterfallTableHeaderEnter.append('th').text('Code Path')
          waterfallTableHeaderEnter.append('th').text('JS')
          waterfallTableHeaderEnter.append('th').text('Total')
          waterfallTableHeaderEnter.append('th').text('Async')
          waterfallTableHeaderEnter.append('th').text('Blocked')

          var waterfallTitleEnter = waterfallHeadingTableEnter.append('td')
            .attr('class', 'waterfall-title');

          var waterfallMicroEnter = waterfallHeadingTableEnter.append('td')
            .attr('class', 'waterfall-js');

          var waterfallMicroEnter = waterfallHeadingTableEnter.append('td')
            .attr('class', 'waterfall-total');

          var waterfallAsyncEnter = waterfallHeadingTableEnter.append('td')
            .attr('class', 'waterfall-async');

          var waterfallSyncEnter = waterfallHeadingTableEnter.append('td')
            .attr('class', 'waterfall-sync');

          var waterfallBodyEnter = waterfall
            //.append('button')
            .attr('href', function (d) {
              return '#';
            })
            //.attr('class', 'link-cmd')
            .on('click', function(d) {
              $log.debug('|--- wtf ---|');
              //var projectName = scope.currentApp;
             // var pfKey = encodeURIComponent(scope.tracingCtx.pfKey);
              var waterfallId = Sha1(d.id);
              scope.tracingCtx.currentWaterfallKey = waterfallId;
              // scroll to waterfall / detail view
             // jQuery('html, body').animate({
             //   scrollTop:
           //   }, 1000);

              return false;


            })
            .append('div')
            .attr('class', 'panel-body')
            .each(function (waterfall) {
              this.eventloop = EventLoop().init(this, { expanded: false, color: Color })
              //Color
            });

          //exit set
          waterfalls.exit().remove();

          waterfalls.selectAll('.waterfall-title')
            .text(function(d, i){ return d.costSummary.summaryText });

          waterfalls.selectAll('.waterfall-js')
            .text(function(d, i){ return msFormat(d.timing_stats.jsMicros) });

          waterfalls.selectAll('.waterfall-total')
            .text(function(d, i){ return msFormat(d.timing_stats.totalMicros) });

          waterfalls.selectAll('.waterfall-async')
            .text(function(d, i){ return Math.floor(d.timing_stats.percentAsync) + '%' })

          waterfalls.selectAll('.waterfall-sync')
            .text(function(d, i){ return Math.floor(d.timing_stats.percentBlocked) + '%' })


          // Update
          trans.attr('id', function(d){ return slug(d.id) })

          trans.select('.transaction-route').text(function(d){ return (d.id === 'untagged') ? 'Untagged Waterfalls' : d.id })
          trans.select('.transaction-jsmicros').text(function(d){ return msFormat(d.waterfalls.summary_stats.jsMicros) })
          trans.select('.transaction-async').text(function(d){ return Math.floor(d.waterfalls.summary_stats.percentAsync) + '%' })
          trans.select('.transaction-blocked').text(function(d){ return Math.floor(d.waterfalls.summary_stats.percentBlocked) + '%' })
          trans.select('.transaction-totalmicros').text(function(d){ return msFormat(d.waterfalls.summary_stats.totalMicros) })

          trans.attr('data-id', function(d){ return d.id })

          // only update visible eventloops
          trans.each(function (transaction) {
//            if (self.app.expanded[transaction.id]) {
            if (1 == 1) {
              d3.select(this).selectAll('.waterfall .panel-body')
                .each(function (waterfall) {
                  if (this.eventloop) {
                    this.eventloop.update(waterfall, scope.tracingCtx.currentTrace.functions)

                  }
                  else {
                    $log.debug('|   -----  EVENTLOOP?');
                  }
                })
            }
          });

          //finally, sort the array
          trans.sort(function(a, b){
            return b.waterfalls.summary_stats.totalMicros - a.waterfalls.summary_stats.totalMicros
          });

          // Jump to the proper id after UI is finished rendering
          setTimeout(function () {
            //if (window.location.hash)
            if (true == false) {
              var target = document.getElementById(window.location.hash.slice(1))
              target.classList.add('expanded')
              d3.select(target).selectAll('.waterfall .panel-body')
                .each(function (waterfall) {
                  this.eventloop.update(waterfall, self.trace.functions);
                });
              window.location.href = window.location.hash;
            }
          }, 0)
        }

        if (scope.tracingCtx.currentTrace.summary_stats) {
          scope.asyncpie.update(scope.traceToAsyncPie(trace))
          scope.idlepie.update(scope.traceToIdlePie(trace))
        }


      }
    }
  }
]);
Tracing.directive('slTracingTraceView', [
  '$log',
  'TracingServices',
  function($log, TracingServices) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/tracing/templates/tracing.trace.view.html',
      controller: ['$scope', function($scope) {
        $scope.showTraceView = function() {
          var retVal = $scope.tracingCtx.currentPFKey;
          if (retVal && retVal.length > 0) {
            if ($scope.tracingCtx.currentWaterfallKey && $scope.tracingCtx.currentWaterfallKey.length > 0) {
              return false;
            }
            return true;
          }
          return false;
        };


      }],
      link: function(scope, el, attrs) {

        scope.$watch('tracingCtx.currentPFKey', function(pfKey, oldVal) {
          //jQuery('[data-id="TraceDetailView"]').offset().top;
          /*
           *
           * modify the ui to provide good ux for nav
           *
           * get rid of memory chart
           * get rid of transaction history
           * shrink the cpu chart
           * indicate which point in time is selected
           * animate the scroll
           *
           * */
          if (!pfKey) {
            //
            //d3.select('[data-id="ProcessTraceView"]')
            //  .transition()
            //  .attr("height",7000);
            //$('[data-id="ProcessTraceView"]').show(500);
            //$('[data-id="ProcessTraceView"]').offset().top;
            $('[data-id="TraceHistoryTransactions"]').show(500);
            $('#memory-history-cont').show(500);
            $('#exp-history-cont').hide(500);
            $('#cpu-history-cont').show(500);
          }
          else {


            //$('[data-id="ProcessTraceView"]').offset({top:-175});
            $('#memory-history-cont').hide(500);
            $('#exp-history-cont').show(500);
            $('#cpu-history-cont').hide(500);
            $('[data-id="TraceHistoryTransactions"]').hide(400);

            // load trace view
            $log.debug('re-initialize trace view pfkey[' + pfKey + ']');


          }
        }, true);

      }
    }
  }
]);
Tracing.directive('slTracingTimeSeriesCharts', [
  '$log',
  '$rootScope',
  'TimeSeries',
  function($log, $rootScope, TimeSeries) {
    return {
      restrict: 'E',
      templateUrl: './scripts/modules/tracing/templates/tracing.timeseries.charts.html',
      link: function(scope, el, attrs) {
        //var colormap = {
        //  'Process Heap Total': 'rgba(63,182,24, 1)',
        //  'Process Heap Used': 'rgba(255,117,24, 1)',
        //  'Process RSS': 'rgba(39,128,227, 1)',
        //  'Load Average': 'rgba(39,128,227, 1)',
        //  'Uptime': 'rgba(255,117,24, 1)'
        //};
        var colormap = {
          'Process Heap Total': '#7777ff',
          'Process Heap Used': '#2ca02c',
          'Process RSS': '#ff7f0e',
          'Load Average': '#7777ff',
          'Uptime': '#ff7f0e'
        };

        function color(name){
          return colormap[name] || '#00000'
        }

        scope.cpuGraphOptions = {
          color: color,
          format: {
            'y': 'num',
            'y1': 's'
          },
          keySchema: {
            'Load Average': {
              class: 'cx-monitor-loadavg',
              type: 'line',
              y: 'y'
            },
            'Uptime': {
              class: 'cx-monitor-uptime',
              type: 'line',
              y: 'y1'
            }
          }
        };
        var tts = 0;
        if (scope.tracingCtx && scope.tracingCtx.currentTrace && scope.tracingCtx.currentTrace.metadata && scope.tracingCtx.currentTrace.metadata.timestamp) {
          tts = scope.tracingCtx.currentTrace.metadata.timestamp;
        }
        scope.expGraphOptions = {
          height: 100,
          showY1Axis: false,
          selectedTime: tts,

          color: color,
          format: {
            'y': 'num',
            'y1': 's'
          },
          keySchema: {
            'Load Average': {
              class: 'cx-monitor-loadavg',
              type: 'line',
              y: 'y'
            },
            'Uptime': {
              class: 'cx-monitor-uptime',
              type: 'line',
              y: 'y1'
            }
          }
        };

        scope.memGraphOptions = {
          yMin: 0,
          color: color,
          formatter: {}
        };

        function getTimestampForPFKey(pfKey) {
          if (scope.tracingCtx && scope.tracingCtx.currentTimeline.length) {
            for (var i = 0;i < scope.tracingCtx.currentTimeline.length;i++) {
              var instance = scope.tracingCtx.currentTimeline[i];
              if (instance.__data && (instance.__data.pfkey === pfKey)) {
                $log.debug('|--- check me ---|');
                return instance._t;
              }
            }
            return 0;
          }
          return 0;
        }
        $log.debug('Chart Name:  ' + scope.chartName);
        function updateCurrentPFKey(data) {
          scope.setCurrentPFKey(data.pfkey);
        }
        scope.cpugraph = TimeSeries('#cpu-history-cont', scope.cpuGraphOptions)
          .on('click', updateCurrentPFKey);
        scope.expgraph = TimeSeries('#exp-history-cont', scope.expGraphOptions)
          .on('click', updateCurrentPFKey);

        //scope.memgraph = TimeSeries('#memory-history-cont', scope.memGraphOptions)
        //  .on('click', updateCurrentPFKey);
        //scope.$watch('tracingCtx.currentPFKey', function(pfKey, oldVal) {
        //  if (pfKey) {
        //    scope.expgraph.setSelection(getTimestampForPFKey(pfKey));
        //
        //  }
        //});
        scope.$watch('tracingCtx.currentPFKey', function(newKey, oldVal) {
          var pfKeyTime = getTimestampForPFKey(newKey);
          if (pfKeyTime > 0) {
            scope.expgraph.setSelection(pfKeyTime);
          }

        });
        scope.$watch('tracingCtx.currentTimeline', function(tl, oldVal) {
          if (tl) {
            if( tl.length && (tl !== oldVal)){
              var exp = [];
              var tmp = tl;
              tmp.map(function(item) {
                exp.push({
                  __data: {
                    lm_a: item.lm_a,
                    p_ut: item.p_ut
                  },
                  load: item['Load Average'],
                  pfkey: item.pfkey,
                  timestamp: item._t
                });

              });
              scope.cpugraph.draw(tl);
              scope.expgraph.draw(tl);
              if (scope.tracingCtx && scope.tracingCtx.currentPFKey) {
                var pfKeyTime = getTimestampForPFKey(scope.tracingCtx.currentPFKey);
                scope.expgraph.setSelection(pfKeyTime);
              }
            }
            if( tl && (tl !== oldVal)){
              //scope.memgraph.draw(tl);
            }
          }

          //if((scope.chartName === 'mem') && timeline.mem){
          //  scope.memgraph.draw(timeline.mem);
          //}
        }, true);


      }

    }
  }
]);
//  new experimental transaction history

Tracing.directive('slTracingTransactionHistory2', [
  '$log',
  '$timeout',
  'TransactionList',
  function($log, $timeout, TransactionList) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.transaction.history.2.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.updatePFKeyFromTransactionHistory = function(pfkey) {
          $scope.tracingCtx.currentPFKey = pfkey;
        }
      }],
      link: function(scope, el, attrs) {

        scope.transactionListView = TransactionList('[data-hook="transaction-list-cont"]', {});

        scope.$watch('tracingCtx.currentTransactionKeys', function(transactions, oldVal) {

        }, true);

      }
    }
  }

]);




//
Tracing.directive('slTracingTransactionHistory', [
  '$log',
  '$timeout',
  'TransactionList',
  function($log, $timeout, TransactionList) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.transaction.history.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.updatePFKeyFromTransactionHistory = function(pfkey) {
          $scope.tracingCtx.currentPFKey = pfkey;
        }
      }],
      link: function(scope, el, attrs) {

        scope.transactionListView = TransactionList('[data-hook="transaction-list-cont"]', {});

        scope.$watch('tracingCtx.currentTransactionHistoryCollection', function(historyCollection, oldVal) {
          if (historyCollection && historyCollection.length) {
            scope.transactionListView.render(historyCollection);
            //
            $timeout(function() {
              window.setScrollView('.tracing-content-container');
            }, 200);

          }
        }, true);

      }
    }
  }

]);
Tracing.directive('slTracingTimelineView', [
  '$log',
  '$timeout',
  'TransactionList',
  function($log, $timeout, TransactionList) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.timeline.view.html',
      restrict: 'E',
      link: function(scope, el, attrs) {
        window.onresize = function() {
          window.setScrollView('.tracing-content-container');
        };
      }
    }
  }

]);
