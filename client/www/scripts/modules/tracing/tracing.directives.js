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
Tracing.directive('slTracingDetailView', [
  '$log',
  'Sha1',
  function($log, Sha1) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.waterfall.detail.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.showDetailView = function() {
          return ($scope.currentWaterfallKey && $scope.currentWaterfallKey.length > 0);
        };
        $scope.closeDetailView = function() {
          $scope.currentWaterfallKey = '';
        };
        $scope.previousWaterfall = function() {
          var totalLen = $scope.currentTrace.waterfalls.length;
          for (var i = 0;i < totalLen; i++) {
            var wf = $scope.currentTrace.waterfalls[i];
            if ((wf.id === $scope.currentWaterfallKey) || (Sha1(wf.id) === $scope.currentWaterfallKey)) {
              if (i > 0) {
                $scope.currentWaterfallKey = $scope.currentTrace.waterfalls[i - 1].id;
                break;
              }
            }
          }
        };
        $scope.nextWaterfall = function() {
          var totalLen = $scope.currentTrace.waterfalls.length;
          for (var i = 0;i < totalLen; i++) {
            var wf = $scope.currentTrace.waterfalls[i];
            if ((wf.id === $scope.currentWaterfallKey) || (Sha1(wf.id) === $scope.currentWaterfallKey)) {
              if (i < ($scope.currentTrace.waterfalls.length - 2)) {
                 $scope.currentWaterfallKey = $scope.currentTrace.waterfalls[i + 1].id;
                break;
              }
            }
          }

        };
        $scope.loadWaterfallById = function(waterfallKey) {
          var waterfall = [];
          $scope.currentTrace.waterfalls.map(function(w) {
            if ((w.id === waterfallKey) || (Sha1(w.id) === waterfallKey)) {
              waterfall = w;
            }
          });
          return waterfall;
        }
      }],
      link: function(scope, el, attrs) {



        scope.$watch('currentWaterfallKey', function(newVal, oldVal) {

          if (newVal && newVal.length > 0) {
            scope.currentWaterfall = scope.loadWaterfallById(newVal);
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
  'MSFormat',
  'Color',
  'Slug',
  function($log, Sha1, EventLoop, msFormat, color, slug) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.trace.summary.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {
        $scope.mapTransactions = function(transactions) {
          var collectionData = Object.keys(transactions)
            .filter(function (key) {
              if (key === 'concurix.send') return false
              if (key === 'concurix.assemble') return false
              return transactions.hasOwnProperty(key)
            })
            .map(function (key) {
              return {
                id: key,
                stats: transactions[key].stats,
                waterfalls: transactions[key].waterfalls
              }
            })
            .filter(function(d){
              return d.waterfalls
            })
            .sort(function (a, b) {
              //waterfalls can be null if they did not happen in this trace file
              if( a.waterfalls && b.waterfalls ){
                return b.waterfalls.summary_stats.totalMicros - a.waterfalls.summary_stats.totalMicros
              } else if( a.waterfalls ){
                return -1
              } else if( b.waterfalls ){
                return 1
              } else if( a.stats && b.stats ){
                return b.stats.mean - a.stats.mean
              } else {
                return a.id.localeCompare(b.id)
              }
            });
          return collectionData;
        }
        //$scope.mappedTransactions = $scope.mapTransactions($scope.currentTrace.transactions.transactions)
        $scope.mappedTransactions = [];
      }],
      link: function(scope, el, attrs) {


        function render() {
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
            .append('table')

          var waterfallTableHeaderEnter = waterfallHeadingTableEnter
            .append('thead')
            .append('tr')

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

          var waterfallBodyEnter = waterfall.append('button')
            //.attr('href', function (d) { return path.join(history.state.basePath, history.state.project, 'trace', encodeURIComponent(history.state.pfkey), sha1(d.id)) })
            .attr('class', 'link-cmd')
            .on('click', function(d) {
              var projectName = scope.currentProject;
             // var pfKey = encodeURIComponent(scope.currentPFKey);
              var waterfallId = Sha1(d.id);
              scope.currentWaterfallKey = waterfallId;
              return false;


            })
            .append('div')
            .attr('class', 'panel-body')
            .each(function (waterfall) {
              this.eventloop = EventLoop().init(this, { expanded: false, color: '#aa00aa' })
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
                  this.eventloop.update(waterfall, scope.currentTrace.functions)
                })
            }
          })

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

        scope.$watch('currentTrace', function(newVal, oldVal) {
          if (newVal.transactions) {
            scope.mappedTransactions = scope.mapTransactions(newVal.transactions.transactions)
            render();

          }
        });
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
          return ($scope.currentPFKey && $scope.currentPFKey.length > 0);
        };
        $scope.closeTraceView = function() {
          $scope.currentPFKey = '';
        };
      }],
      link: function(scope, el, attrs) {

        scope.$watch('currentPFKey', function(newVal, oldVal) {
          if (newVal && (newVal.length > 0)) {

            // load trace view
            $log.debug('re-initialize trace view pfkey[' + newVal + ']');

            scope.currentTrace = TracingServices.fetchTrace({pfkey: newVal})
              .then(function(trace) {
                scope.currentTrace = trace;
                $log.debug('trace update: ' + trace.metadata.account_key);
                //$log.debug('new trace: ' + JSON.stringify(trace));

              });

          }
        }, true);

      }
    }
  }
]);
Tracing.directive('slTracingTimeSeriesChart', [
  '$log',
  '$rootScope',
  'TimeSeries',
  function($log, $rootScope, TimeSeries) {
    return {
      scope: {
        chartName: '@',
        loadTraceView: '&',
        currentTimeline: '='
      },
      restrict: 'E',
      templateUrl: './scripts/modules/tracing/templates/tracing.time-series.viz.html',
      link: function(scope, el, attrs) {
        var colormap = {
          'Process Heap Total': 'rgba(63,182,24, 1)',
          'Process Heap Used': 'rgba(255,117,24, 1)',
          'Process RSS': 'rgba(39,128,227, 1)',
          'Load Average': 'rgba(39,128,227, 1)',
          'Uptime': 'rgba(255,117,24, 1)'
        };
        function detail(event) {
          page('/' + this.app.socket.project + '/' + event.delegateTarget.dataset.id)
          this.app.content.set(new DetailView(this.app, event.delegateTarget.dataset.id))
          this.app.content.current.render()
        }
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
        scope.memGraphOptions = {
          yMin: 0,
          color: color,
          formatter: {}
        };
        $log.debug('Chart Name:  ' + scope.chartName);
        function updateCurrentPFKey(data) {
          scope.$parent.currentPFKey = data.pfkey;
        }
        scope.cpugraph = TimeSeries('#cpu-history-cont', scope.cpuGraphOptions)
          .on('click', updateCurrentPFKey);
        scope.memgraph = TimeSeries('#memory-history-cont', scope.memGraphOptions)
          .on('click', updateCurrentPFKey);

        scope.$watch('currentTimeline', function(timeline, oldVal) {
          if( timeline.cpu){
            scope.cpugraph.draw(timeline.cpu);
          }
          if( timeline.mem){
            scope.memgraph.draw(timeline.mem);
          }
          //if((scope.chartName === 'mem') && timeline.mem){
          //  scope.memgraph.draw(timeline.mem);
          //}
        }, true);


      }

    }
  }
]);
Tracing.directive('slTracingTransactionHistory', [
  '$log',
  '$timeout',
  'TransactionList',
  function($log, $timeout, TransactionList) {
    return {
      templateUrl: './scripts/modules/tracing/templates/tracing.transaction.history.html',
      restrict: 'E',
      link: function(scope, el, attrs) {

        scope.transactionListView = TransactionList('[data-hook="transaction-list-cont"]', {});

        scope.$watch('transactionHistoryCollection', function(newVal, oldVal) {
          if (newVal && newVal.length) {
            scope.transactionListView.render(newVal, scope.currentHost);
            //
            $timeout(function() {
              window.setScrollView('.monitor-view');
            }, 200);

          }
        }, true);
        window.onresize = function() {
          window.setScrollView('.monitor-view');
        };
      }
    }
  }

]);
