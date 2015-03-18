/** @jsx React.DOM */
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
