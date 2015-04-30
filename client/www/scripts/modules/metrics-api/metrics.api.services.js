ApiMetrics.service('MetricsApiService', [
  '$http',
  '$log',
  '$q',
  function($http, $log, $q) {
    var svc = this;
    var Client = require('strong-mesh-models').Client;
    var client;

    svc.getClient = function(host, port){
      if ( client ) return client;

      client = new Client('http://' + host + ':' + port);

      return client;
    };

    svc.getDailySummary = function(d, i, depth, server, initialModel){
      var def = $q.defer();
      var client = svc.getClient(server.host, server.port);

      client.dailyExpressMetricsSummary(function(err, res){
        if ( err ) return def.reject(err);

        var chartData = {
          name: "flare",
          children: []
        };

        //convert data to d3 chart data
        Object.keys(res.data).map(function(item){
          chartData.children.push({
            name: item,
            size: res.data[item],
            orig: item
          });
        });

        def.resolve(chartData);
      });


      return def.promise;
    };

    svc.getHourlySummary = function(d, i, depth, server, initialModel){
      var def = $q.defer();
      var client = svc.getClient(server.host, server.port);
      var modelName = d.name;

      client.hourlyExpressMetricsSummary(modelName, function(err, res){
        if ( err ) return def.reject(err);

        var hourly = res.data;
        var chartData = {
          name: "flare",
          children: []
        };

        hourly.map(function(item){
          var total = item.GET + item.POST + item.PUT + item.DELETE;
          var obj = {
            name: moment(item.timeStamp).format('ha'),
            size: total,
            orig: item
          };

          chartData.children.push(obj);
        });

        def.resolve(chartData);
      });

      return def.promise;
    };

    svc.getEndpointDetail = function(d, i, depth, server, initialModel){
      var def = $q.defer();
      var client = svc.getClient(server.host, server.port);
      var modelName = initialModel;
      var timeStamp = d.orig.timeStamp;

      client.expressMetricsEndpointDetail(modelName, timeStamp, function(err, res) {
        if (err) return def.reject(err);

        var endpoints = res.data;
        var chartData = {
          name: "flare",
          children: []
        };

        endpoints.map(function(item){
          var obj = {
            name: item.requestUrl,
            size: item.responseDuration,
            orig: item
          };

          chartData.children.push(obj);
        });

        def.resolve(chartData);
      });

      return def.promise;
    };

    svc.getMetricsApiChartDataByNode = function(d, i, depth, server, initialModel) {
      if ( depth === 0 ) {
        return svc.getDailySummary(d, i, depth, server, initialModel);
      } else if ( depth === 1 ) {
        return svc.getHourlySummary(d, i, depth, server, initialModel);
      } else if ( depth === 2 ) {
        return svc.getEndpointDetail(d, i, depth, server, initialModel);
      }
    };

    svc.getMetricsApiChartDataByNodeOld = function(d, i, depth, server, initialModel){
      var api = 'http://'+server.host + ':' + server.port + '/api';
      var endpoint;

      switch(depth){
        case 0:
              endpoint = '/ExpressUsageRecords/dailySummary';
              break;
        case 1:
              var modelName = d.name;
              endpoint = '/ExpressUsageRecords/hourlySummary?modelOrUri='+modelName;
              break;
        case 2:
              var modelName = initialModel;
              var timeStamp = d.orig.timeStamp;
              endpoint = '/ExpressUsageRecords/endpointDetail?modelOrUri='+modelName+'&windowStartTime='+timeStamp;
              break;
      }

      var url = api+endpoint;

      return $http.get(url)
        .then(function(res){
          $log.log(res);
          var chartData = {
            name: "flare",
            children: []
          };

          if ( depth === 0 ) {
            //convert data to d3 chart data
            Object.keys(res.data).map(function(item){
              chartData.children.push({
                name: item,
                size: res.data[item],
                orig: item
              });
            });
          } else if ( depth === 1 ) {
            var hourly = res.data;

            hourly.map(function(item){
              var total = item.GET + item.POST + item.PUT + item.DELETE;
              var obj = {
                name: moment(item.timeStamp).format(' ha'),
                size: total,
                orig: item
              };

              chartData.children.push(obj);
            });

          } else if ( depth === 2 ) {
            $log.log(res.data);
            var endpoints = res.data;

            endpoints.map(function(item){
              var obj = {
                name: item.requestUrl,
                size: item.responseDuration,
                orig: item
              };

              chartData.children.push(obj);
            })
          }

          return chartData;
        });
    };

    return svc;
  }]);
