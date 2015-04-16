Tracing.service('TracingServices', [
  function() {
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

      // note: item values are displayed in chart legend
      ret.cpu = t.map(function(d){
        var item = {
          _t: moment(d.ts).unix()*1000,
          'Load Average': d['s_la'],
          'Uptime': d['p_mu'],
          '__data': d
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


    // get first index for prototype
    svc.getFirstHost = function() {
      return currTraceHosts[0];
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
