/** @jsx React.DOM */

var TracingAstractTimeline = (TracingAstractTimeline = React).createClass({
  getInitialState: function () {
    return {
      scope: this.props.scope
    }
  },
  setPFKey: function(event) {
    var component = this;
    var scope = component.props.scope;
    //var pfKeyVal = encodeURIComponent(event.target.attributes['data-pfkey'].value);
    var pfKeyVal = event.target.attributes['data-pfkey'].value;
    if (pfKeyVal) {
      console.log(pfKeyVal);
      scope.$apply(function() {
        scope.setCurrentPFKey(pfKeyVal);
      });
    }
  },
  componentDidMount: function() {

  },
  //componentDidMount: function() {
  //  var component = this;
  //  var dataPointCount = component.props.scope.tracingCtx.currentTimeline.cpu.length;
  //  var totalUptime = component.props.scope.tracingCtx.currentTimeline.cpu[dataPointCount - 1].Uptime;
  //
  //  var pfKey = component.props.scope.tracingCtx.currentPFKey;
  //
  //  var currentUptime = totalUptime;
  //
  //
  //  // determine currentPFKey.Uptime
  //  for (var i = 0;i < dataPointCount;i++) {
  //    var point = component.props.scope.tracingCtx.currentTimeline.cpu[i];
  //    if (point.__data.pfkey === pfKey) {
  //      currentUptime = point.Uptime;
  //      break;
  //    }
  //  }
  //
  //  //totalUptime = ((totalUptime / 60) / 60);
  //  var selectPercent = Math.floor((currentUptime / totalUptime) * 100);
  //
  //  var items = '';
  //
  //  var dataSet = [];
  //  var className = 'k-hot';
  //  for (var k = 0;k < 100;k++) {
  //    className = 'k-hot';
  //
  //    if (k === (selectPercent - 1)) {
  //      className = 'k-selected';
  //    }
  //    if (k > (selectPercent - 1)) {
  //      className = 'k-cold';
  //    }
  //    dataSet.push(className);
  //
  //
  //  }
  //
  //
  //  component.setState({
  //    dataSet: dataSet,
  //    dataPointCount:dataPointCount,
  //    totalUptime: totalUptime,
  //    pfKey:pfKey,
  //    currentUptime: currentUptime
  //  });
  //},
  render: function() {

    var component = this;
    var dataPointCount = 0;
    var totalUptime = 0;
    var pfKey = '';
    var currentUptime = 0;
    var selectPercent = 0;
    var dataSet = [];
    if (component.props.scope.tracingCtx.currentTimeline && component.props.scope.tracingCtx.currentTimeline.cpu) {
      dataPointCount = component.props.scope.tracingCtx.currentTimeline.cpu.length;
      totalUptime = component.props.scope.tracingCtx.currentTimeline.cpu[dataPointCount - 1].Uptime;

      pfKey = component.props.scope.tracingCtx.currentPFKey;

      currentUptime = totalUptime;


      // determine currentPFKey.Uptime
      for (var i = 0;i < dataPointCount;i++) {
        var point = component.props.scope.tracingCtx.currentTimeline.cpu[i];
        if (point.__data.pfkey === pfKey) {
          currentUptime = point.Uptime;
          break;
        }
      }

      //totalUptime = ((totalUptime / 60) / 60);
      selectPercent = Math.floor((currentUptime / totalUptime) * 100);

      //var items = '';

      var className = 'k-hot';

      for (var k = 0;k < 100;k++) {
        className = 'k-hot';

        if (k === (selectPercent - 1)) {
          className = 'k-selected';
        }
        if (k > (selectPercent - 1)) {
          className = 'k-cold';
        }
        dataSet.push(className);


      }

    }


    //component.setState({
    //  dataSet: dataSet,
    //  dataPointCount:dataPointCount,
    //  totalUptime: totalUptime,
    //  pfKey:pfKey,
    //  currentUptime: currentUptime
    //});

    var dataSetTwo = dataSet;

    var items = dataSetTwo.map(function(item) {
      return (<li className={item}>&nbsp;</li>);
    });


    return (
      <div>
        <div id="Velo"></div>
        <ul id="AbstractTimelineList">
          {items}
        </ul>
        <span>uptime: {component.props.scope.tracingCtx.currentTimelineDuration}</span>
      </div>
    );
  }
});

var TracingTraceList = (TracingTraceList = React).createClass({
  getInitialState: function () {
    return {
      scope: this.props.scope
    }
  },
  setPFKey: function(event) {
    var component = this;
    var scope = component.props.scope;
    //var pfKeyVal = encodeURIComponent(event.target.attributes['data-pfkey'].value);
    var pfKeyVal = event.target.attributes['data-pfkey'].value;
    if (pfKeyVal) {
      console.log(pfKeyVal);
      scope.$apply(function() {
        scope.setCurrentPFKey(pfKeyVal);
      });
    }
  },
  render: function() {

    var component = this;

    var items = component.props.scope.tracingCtx.currentTimeline.cpu.map(function(point) {
      //var uptime = ((point.Uptime / 60) / 60);
      return (<div data-ui-type="table">
        <div data-ui-type="row">
          <div data-ui-type="cell">
            rss
          </div>
          <div data-ui-type="cell">
            {point.__data.p_mr}
          </div>
          <div data-ui-type="cell">
            rss
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            lm_a:
          </div>
          <div data-ui-type="cell">
            {point.__data.lm_a}
          </div>
          <div data-ui-type="cell">
            // latent model a value (if 2, orange triangle is shown.  usually 0)
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            p_mr:
          </div>
          <div data-ui-type="cell">
            {point.__data.p_mr}
          </div>
          <div data-ui-type="cell">
            // process.memory.rss
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            p_mt:
          </div>
          <div data-ui-type="cell">
            {point.__data.p_mt}
          </div>
          <div data-ui-type="cell">
            // process.memory.total
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            p_mu:
          </div>
          <div data-ui-type="cell">
            {point.__data.p_mu}
          </div>
          <div data-ui-type="cell">
            // process.memory.used heap
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            p_ut:
          </div>
          <div data-ui-type="cell">
            {point.__data.p_ut}
          </div>
          <div data-ui-type="cell">
            // process.uptime
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            pfkey:
          </div>
          <div data-ui-type="cell">
            [key]
          </div>
          <div data-ui-type="cell">

          </div>
        </div>
        <div data-ui-type="row">
           <div data-ui-type="cell">
            s_la:
          </div>
          <div data-ui-type="cell">
            {point.__data.s_la}
          </div>
          <div data-ui-type="cell">
            // load average
          </div>
        </div>
        <div data-ui-type="row">
          <div data-ui-type="cell">
            timestamp:
          </div>
          <div data-ui-type="cell">
            <button className="cmd-link" data-pfkey={point.__data.pfkey} onClick={component.setPFKey}>
              {point._t}
            </button>
          </div>
          <div data-ui-type="cell">

          </div>
        </div>
      </div>);
    });
    var dataPointCount = component.props.scope.tracingCtx.currentTimeline.cpu.length;
    var totalUptime = component.props.scope.tracingCtx.currentTimeline.cpu[dataPointCount - 1].Uptime;
    totalUptime = ((totalUptime / 60) / 60);
    var upHours = totalUptime.toFixed(1);


    return (
      <div  className="tracing-content-container">
        uptime: {upHours} hours
        <ul>
        {items}
        </ul>
      </div>
    );
  }
});
