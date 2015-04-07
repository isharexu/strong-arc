ApiMetrics.controller('MetricsApiController', [
    '$scope',
    '$state',
    '$log',
    '$interval',
    '$timeout',
    'ChartConfigService',
    function($scope, $state, $log, $interval, $timeout, ChartConfigService) {
        $log.log('api metrics');
        var options = getChartOptions();
        var data = getChartData();

        $scope.apiChart = {
            data: data,
            options: options
        };

        function getChartOptions(){
            return ChartConfigService.getChartOptions();
        }


        function getChartData(){
            var data = [];
            var colors = {
                'GET': '#f00',
                'POST': '#0f0',
                'PUT': '#00f',
                'DELETE': '#ff0'
            };

            var verbs = ['GET', 'POST', 'PUT', 'DELETE'];

            verbs.forEach(function(verb){
                var i = 0;
                var values = [];
                var now = new Date();
                var x;
                var y;

                while ( i < 10 ) {
                    x = i;
                    y = Math.round(Math.random() * 10);

                    values.push({
                        x: x,
                        y: y
                    });

                    i++;
                }

                data.push({
                    values: values,      //values - represents the array of {x,y} data points
                    key: verb, //key  - the name of the series.
                    color: colors[verb]  //color - optional: choose your own line color.
                });
            });

            return data;
        }
    }]);