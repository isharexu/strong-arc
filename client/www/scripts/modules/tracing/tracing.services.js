Tracing.service('TracingServices', [
  '$http',
  '$log',
  'Trace',
  'TraceHost',
  'TraceEnhance',
  'TraceTimeline',
  'TraceTransactionKey',
  'TraceTransactionHistory',
  function($http, $log, Trace, TraceHost, TraceEnhance, TraceTimeline, TraceTransactionKey, TraceTransactionHistory) {
    var svc = this;
    var currTraceHosts = [];
    var currentTimelineTimestamp;

    'use strict';

    //var ajax = require('component-ajax')
   // var enhance = require('concurix-waterfalltransform').enhanceWaterfall

    //
    //function API(options) {
    //  var opts = options || {}
    //  this.base = opts.base || '/'
    //  this.project = opts.project || ''
    //  return this
    //}

    svc.getCurrentTimelineTimestamp = function() {
      return currentTimelineTimestamp;
    };
    svc.convertTimeseries = function(t){
      var ret = {};
      ret.mem = t.map(function(d){
        var item = {
          _t: moment(d.ts).unix()*1000,
          'Process Heap Total': d.p_mt,
          'Process Heap Used': d.p_mu,
          'Process RSS': d.p_mr,
          __data: d
        };
        return item;
      });
      ret.mem = ret.mem.sort(function(a,b){ return a._t - b._t;});

      ret.cpu = t.map(function(d){
        var item = {
          _t: moment(d.ts).unix()*1000,
          'Load Average': d['s_la'],
          'Uptime': d['p_mu'],
          __data: d
        };
        return item;
      });
      ret.cpu = ret.cpu.sort(function(a,b){ return a._t - b._t;});
      return ret;
    };


    svc.getMappedTransactions = function(transactions) {
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
    };

    svc.getTimeline = function(config) {
      return svc.fetchTimeline({reqparams:config})
        .then(function(timelineRaw) {
          var tHost = timelineRaw.hosts[config.host];
          currentTimelineTimestamp = timelineRaw.timestamp;
          var dataArray = tHost[config.pid];
          if (dataArray) {
            return svc.convertTimeseries(dataArray);
          }
        });
    };

    svc.fetchTrace = function(pfkey, cb) {
      return Trace.fetchTrace(pfkey)
        .$promise
        .then(function(trace) {
          var rData = JSON.parse(trace.data);
         // $log.debug('TRACE DATA: ' + rData);
          return TraceEnhance(rData);
        })
        .catch(function(error) {
          $log.warn('bad get trace: ' + error.message);
        });
    };

    svc.fetchHosts = function(options) {

      return TraceHost.fetchHosts()
        .$promise
        .then(function(response) {
          if (JSON.parse(response.data).hosts) {
            currTraceHosts  = JSON.parse(response.data).hosts;
          }
          return currTraceHosts;
        })
        .catch(function(error) {
          $log.warn('error fetching hosts: ' + error.message);
        });
    };

    // get first index for prototype
    svc.getFirstHost = function() {
      return currTraceHosts[0];
    };

    svc.fetchTimeline = function(serverConfig) {

      return TraceTimeline.fetchTimeLine(serverConfig)
        .$promise
        .then(function(response) {
          return JSON.parse(response.data);
        })
        .catch(function(error) {
          $log.warn('error getting timeline: ' + error.message);
        });

    };

    svc.getTransactionKeys = function getTransactionKeys(reqparams){

      return TraceTransactionKey.transactionKeys(reqparams)
        .$promise
        .then(function(response) {
          return JSON.parse(response.data);
        })
        .catch(function(error) {
          $log.warn('error getting transactionKeys: ' + error.message);
        });
    };

    svc.transactionHistory = function transactionHistory(transaction, host, pid) {

      var reqparams = {
        project: 'wfp:helloworld',
        transaction: transaction,
        host: host,
        pid: pid
      };

      //var url = this.base + path.join('get_transaction', this.project, transaction, ('' + host || '0'), ('' + pid || '0'))

      return TraceTransactionHistory.transactionHistory({reqparams: reqparams})
        .$promise
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          $log.warn('bad get transaction history: ' + error.message);
        });
    };
    return svc;
  }
]);
Tracing.service('TracingFormat', [
  function() {
    var svc = this;

    svc.format = function(string) {
      return string;
    };

    svc.mb = function mb(val){
      return numeral(val).format('0.0 b')
    };

    svc.ms = function millisecond(ms){
      return prettyms(ms)
    };

    svc.s = function second(s){
      return prettyms(s*1000)
    };

    svc.num = function num(val){
      return numeral(val).format('0.0 a')
    };

    svc.truncate = function truncate(str, front, back, options) {
      var opts = options || (typeof back === 'object') ? back : {}
      var ret = ''
      if (!str || (str.length <= front + back)) return str
      ret += str.slice(0, front)
      ret += opts.seperator || '...'
      if (typeof back == 'number') ret += str.slice(-back)
      return ret
    };



    return svc;
  }

]);
