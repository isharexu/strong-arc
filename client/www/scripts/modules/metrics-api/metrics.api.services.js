ApiMetrics.service('MetricsApiService', [
  '$http',
  '$log',
  function($http, $log) {
    var svc = this;

    svc.getMetricsApiChartData = function(){
      return $http.get('/scripts/modules/metrics-api/data2.json');
    };

    svc.getMetricsApiChartDataByNode = function(d, i, depth, server, initialModel){
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
