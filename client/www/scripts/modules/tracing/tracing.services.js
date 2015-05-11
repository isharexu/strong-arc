Tracing.service('TracingServices', [
  '$log',
  'LicensesService',
  '$location',
  function($log, LicensesService, $location) {
    var svc = this;
    var currTraceHosts = [];
    var currentTimelineTimestamp;

    svc.getCurrentTimelineTimestamp = function() {
      return currentTimelineTimestamp;
    };

    svc.getFirstPMInstance = function(pmHost, cb) {
      var PMClient = require('strong-mesh-models').Client;
      var pm = new PMClient('http://' + pmHost.host + ':' + pmHost.port );

      pm.instanceFind('1', function(err, instance) {
        if (err) {
          $log.warn('trace: error finding pm instance: ' + err.message);
          return;
        }
        if (!instance){
          $log.warn('trace: no instance returned: ');
          return;
        }

        cb(instance);

      });
    };
    svc.getManagerHosts = function(cb) {
      var meshManager = require('strong-mesh-client')('http://' + $location.host() + ':' + $location.port() + '/manager');
      meshManager.models.ManagerHost.find(function(err, hosts) {
        if (err) {
          $log.warn('exception requesting manager hosts');
          return;
        }
        if (hosts && hosts.map) {
          cb(hosts);
        }
      });
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
          'Memory Used': d['p_mu'],
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
          if (key === 'strongtrace.send') return false
          if (key === 'strongtrace.assemble') return false
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

    svc.validateLicense = function() {
      return LicensesService.validateModuleLicense('Tracing', 'agent')
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          $log.warn('exception validating tracing license');
          return false;
        });
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
