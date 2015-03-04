'use strict';


var sha1       = require('sha1');
var Timeseries = require('cxviz-timeseries');
var format     = require('cxviz-format');
var path       = require('path');
var page       = require('page');
var slug       = require('slug');


var colormap = {
  'Process Heap Total': '#379f15',
  'Process Heap Used': '#fe6600',
  'Process RSS': '#1862b5',
  'stddev': '#1862b5',
  'min\/max': '#636363',
  'mean': '#1862b5',
  'number of calls': '#379f15'
};

function color(name){
  return colormap[name] || '#ff0000'
}

module.exports = TransactionList;

function TransactionList(el, app) {
  if (!(this instanceof TransactionList)) {
    return new TransactionList(el, app);
  }
  this.el  = el;
  this.app = app;
  this.history = {};
  this.transactions = [];

  // hide table header for edison: projects
  if (window.location.pathname.slice(0,13) == '/dash/edison:') {
    this.el.querySelector('header').classList.add('hidden');
  }
}
function togglePanel(event) {
  var target = event.delegateTarget.parentElement
  var id = target.dataset.id
  this.app.expanded[id] = !this.app.expanded[id]
  target.classList.toggle('expanded', this.app.expanded[id])
}

TransactionList.prototype.renderList = function renderList(keys){
  var self = this;
  keys = keys || [];
  var sel = d3.select(this.el).selectAll('.transaction').data(keys);

  sel.enter().append('li')
    .attr('id', function(d){ return 'cx-mv-transaction-' + sha1(d)})
    .attr('data-id', function (d) { return d })
    .attr('class', 'list-group-item transaction expanded')
    .each(function(){

      enterTransactionStats(this);
      this.timeseriesGraph = setupTimeseries(this);
      this.timeseriesGraph.on('click',function (e) {
        console.log('|');
        console.log('|');
        console.log('|  ----  : clicked it');
        console.log('|');
        console.log('|');
        self.app.expanded[e.transaction] = true;
        page(path.join(history.state.basePath, history.state.project, 'trace', encodeURIComponent(e.pfkey), '#' + slug(e.transaction)))
      });
    })
    .select('svg')
      .attr('class', 'viz');
  sel.exit().remove();
};

TransactionList.prototype.renderItem = function renderItem(key, history){
  var isEdison = false;
  var data = toTimeseries(history, isEdison);
  var reduced = history.reduce(function(prev, curr){
    return prev + curr.mean
  }, 0);
  var averageMean = reduced / history.length;
  this.history[key] = history;
  d3.select('#cx-mv-transaction-'+ sha1(key))
    .each(function() {
      d3.select(this).select('.transaction-average-mean ').text( isEdison ? format.num(averageMean):format.ms(averageMean))
      return this.timeseriesGraph.draw(data);
    });
};

TransactionList.prototype.render = function (transactions, hostConfig) {
  var self = this;
  var host = hostConfig.host;
  var pid = hostConfig.pid;
  this.transactions = transactions || this.transactions; // new transaction structure
  var keys = [];
  this.transactions.map(function(transaction) {
    keys.push(transaction.key);
  });
  self.renderList(keys);
  this.transactions.forEach(function (transaction) {
    if (transaction.history) {
      self.renderItem(transaction.key, transaction.history);
    }
  });
};

function toTimeseries(history, isEdison){

  var ret = history.map(function(d){
    var item = {
      __data: d,
      _t: moment(d.ts).unix()*1000,
      'stddev': {
        min: d.mean - d.sd,
        max: d.mean + d.sd
      },
      'min/max': {
        min: d.min,
        max: d.max
      },
      'mean': d.mean,
      'number of calls': d.n
    };

    return item;
  });
  return ret.sort(function(a,b){ return a._t - b._t;});
}

function setupTimeseries(el){
  var isEdison = false;
  var options = {
    yMin: 0,
    color: color,
    format: {
      'y': isEdison ? 'num':'ms',
      'y1': 'num'
    },
    keySchema: {
      'stddev': {
        class: 'cx-monitor-stddev',
        type: 'rect'
      },
      'min/max': {
        class: 'cx-monitor-minmax',
        type: 'range'
      },
      'number of calls': {
        y: 'y1',
        class: 'cx-monitor-numcalls'
      },
      'mean': {
        class: 'cx-monitor-mean',
        'y': 'y',
        type: 'line'
      }
    }
  };

  return Timeseries(el, options);
}

function isEdisonAccount(el){
  return false;
}

function enterTransactionStats(el) {
  var transactionStatsEnter = d3.select(el);
  var transactionStatsTableEnter = transactionStatsEnter.append('table')
    .on('click', function(d,i) {
        console.log('got the click');
      });
    //.attr('role', 'toggle');

  var transactionStatsRowEnter = transactionStatsTableEnter.append('tr');
  transactionStatsRowEnter.append('td').attr('class', 'transaction-route').text(function(d){ return d });
  transactionStatsRowEnter.append('td').attr('class', 'transaction-average-mean');
}
