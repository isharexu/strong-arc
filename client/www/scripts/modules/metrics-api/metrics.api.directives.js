ApiMetrics.directive('slApiMetricsChart', [
  '$log',
  '$interpolate',
  function ($log, $interpolate) {
    function custom(scope, elem){
      var margin = {top: 30, right: 120, bottom: 0, left: 200},
        width = 960 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

      var x = d3.scale.linear()
        .range([0, width]);

      var tip;

      var barHeight = 20;

      var color = d3.scale.ordinal()
        .range(["steelblue"]);

      var duration = 750,
        delay = 25;

      var partition = d3.layout.partition()
        .value(function(d) { return d.size; });

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

      var svg = d3.select(elem.find('.svg-chart')[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .on("click", up);

      svg.append("g")
        .attr("class", "x axis");

      svg.append("g")
        .attr("class", "y axis")
        .append("line")
        .attr("y1", "100%");


      function toggleTip(e, tip){
        scope.showToolTip = !scope.showToolTip;

        if ( scope.showToolTip ) {
          tip.show(e);
        } else {
          tip.hide(e);
        }
      }

      function processData(d, i) {
        if ( !d.children ) return;
        var end = duration + d.children.length * delay;

        // Mark any currently-displayed bars as exiting.
        var exit = svg.selectAll(".enter")
          .attr("class", "exit");

        // Entering nodes immediately obscure the clicked-on bar, so hide it.
        exit.selectAll("rect").filter(function(p) { return p === d; })
          .style("fill-opacity", 1e-6);

        // Enter the new bars for the clicked-on data.
        // Per above, entering bars are immediately visible.
        var enter = bar(d)
          .attr("transform", stack(i))
          .style("opacity", 1);

        // Have the text fade-in, even though the bars are visible.
        // Color the bars as parents; they will fade to children if appropriate.
        enter.select("text").style("fill-opacity", 1e-6);
        enter.select("rect").style("fill", color(true));

        // Update the x-scale domain.
        x.domain([0, d3.max(d.children, function(d) { return d.value; })]).nice();

        // Update the x-axis.
        svg.selectAll(".x.axis").transition()
          .duration(duration)
          .call(xAxis);

        //show tooltip for chart 3
        if ( scope.chartDepth === 2 ) {
          tip = d3.tip().attr('class', 'd3-tip endpoint').direction('e').html(function(d) {
            var list = '';
            var keys = 'requestMethod statusCode responseDuration responseSize'.split(' ');

            keys.forEach(function(key){
                var tmpl = $interpolate('<li>{{key}}: {{val}}</li>');
                list += tmpl({ key: key, val: d.orig[key]});
            });

            var listTmpl = $interpolate('<h3>{{name}}</h3><ul>{{list}}</ul>');

            return listTmpl({ name: d.name, list: list });
          });

          svg.call(tip);

          svg.selectAll('g.enter text')
            .on('click', function(e){
              toggleTip(e, tip);
            });
        }

        // Transition entering bars to their new position.
        var enterTransition = enter.transition()
          .duration(duration)
          .delay(function(d, i) { return i * delay; })
          .attr("transform", function(d, i) { return "translate(0," + barHeight * i * 1.2 + ")"; });

        // Transition entering text.
        enterTransition.select("text")
          .style("fill-opacity", 1);

        // Transition entering rects to the new x-scale.
        enterTransition.select("rect")
          .attr("width", function(d) { return x(d.value); })
          .style("fill", function(d) { return color(true); });

        // Transition exiting bars to fade out.
        var exitTransition = exit.transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .remove();

        // Transition exiting bars to the new x-scale.
        exitTransition.selectAll("rect")
          .attr("width", function(d) { return x(d.value); });

        // Rebind the current node to the background.
        svg.select(".background")
          .datum(d)
          .transition()
          .duration(end);

        d.index = i;
      }

      scope.$watch('chart', function(newVal, oldVal){
        if ( !newVal || !newVal.data ) {
          scope.crumbs = [{ name: 'Past 24 Hours', orig: null }];
          scope.chartStack = [];
          scope.chartDepth = 0;
          return;
        }
        var root = newVal.data;
        var node = newVal.node;
        var nodeIdx = newVal.nodeIdx;
        partition.nodes(root);
        x.domain([0, root.value]).nice();

        if ( scope.navDirection === 'down' ) {
         if ( Object.keys(oldVal).length ){
           //scope.prevChart = oldVal;
           scope.chartStack.push(oldVal);
           var crumbNode = oldVal.data.children[newVal.nodeIdx];
           scope.crumbs.push({ name: crumbNode.name, orig: crumbNode.orig });
           $log.log('stack', scope.chartStack);
         }
        }

        processData(root, nodeIdx);
      });

      function down(d, i) {
        $log.log('down');
        scope.chartDepth += 1;
        scope.navDirection = 'down';

        //chart only goes three deep
        if (this.__transition__ || scope.chartDepth > 2 ) return;

        if ( scope.chartDepth === 1 ) {
          scope.initialModel = d.name;
        }

        if ( scope.chartDepth > 0 ) {
          scope.getData({ d: d, i: i, depth: scope.chartDepth, initialModel: scope.initialModel })
            .then(function(chart){
              scope.chart = chart;
            });
        }
      }

      function up(d, i, skipCrumb) {
        if ( tip ) {
          scope.showToolTip = false;
          tip.hide();
        }
        if (this.__transition__) return;
        if ( !scope.chartStack.length ) return;

        $log.log('up');
        scope.chartDepth = scope.chartDepth > 0 ? scope.chartDepth - 1 : 0;
        scope.navDirection = 'up';
        scope.chart = scope.chartStack.pop();
        if ( !skipCrumb ) {
          scope.crumbs.pop();
        }
        $log.log(scope.chart);
      }

// Creates a set of bars for the given data node, at the specified index.
      function bar(d) {
        var bar = svg.insert("g", ".y.axis")
          .attr("class", "enter")
          .attr("transform", "translate(0,5)")
          .selectAll("g")
          .data(d.children)
          .enter().append("g")
          .style("cursor", function(d) { return "pointer"; });
          //.on("click", down);

        bar.append("text")
          .attr("x", -6)
          .attr("y", barHeight / 2)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d.name; });

        bar.append("rect")
          .attr("width", function(d) { return x(d.value); })
          .attr("height", barHeight)
          .on('click', down);

        return bar;
      }

// A stateful closure for stacking bars horizontally.
      function stack(i) {
        var x0 = 0;
        return function(d) {
          var tx = "translate(" + x0 + "," + barHeight * i * 1.2 + ")";
          x0 += x(d.value);
          return tx;
        };
      }
    }

    return {
      restrict: "E",
      replace: true,
      scope: {
        chart: '=',
        getData: '&getdata'
      },
      templateUrl: './scripts/modules/metrics-api/templates/metrics.api.chart.html',
      link: function(scope, elem, attrs){
        scope.chartDepth = 0;
        scope.initialModel = null;
        scope.chartStack = [];
        scope.crumbs = [];
        scope.navDirection = 'down';
        scope.showToolTip = false;

        //example(scope, elem);
        custom(scope, elem);

        scope.onClickCrumb = function(i, crumb){
          var len = scope.crumbs.length-1;

          //remove crumbs after clicked crumb
          scope.navDirection = 'up';
          scope.chartDepth = i;
          scope.crumbs.splice(i+1, len);
          scope.chartStack.splice(i+1, len);
          scope.chart = scope.chartStack.pop();
        };
      }
    };
  }
]);
