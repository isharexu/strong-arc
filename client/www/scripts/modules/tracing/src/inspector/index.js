'use strict';

var base       = require('./base.html')
var costTree   = require('./costtree.html')
var eventloop  = require('./eventloop.html')
var fn         = require('./function.html')
var format     = require('../format')
var costMapper = require('cxviz-rawtree').costMapper
var delegate   = require('component-delegate')

var templates = {
  "base": base,
  "rawTree": costTree,
  "flame": costTree,
  "eventLoop": eventloop
}

function Inspector (options) {
  var opts = this.opts = options || {}
  this.el = opts.el || document.createElement('div')
  if (opts.trace) this.trace = opts.trace
  if (opts.class) this.el.classList.add(opts.class)
  this.el.innerHTML = templates.base()

  delegate.bind(this.el, '.eventloop .top-costs .function .header', 'click', this.toggleFunction)

  this.opts.app.on('inspect', this.render)

  return this
}

Inspector.prototype.render = function render(d, trace) {
  var trace = this.trace = trace || this.trace
  var item = d || { type: 'base' }
  var topCosts = (item.costSummary && item.costSummary.topCosts) ? item.costSummary.topCosts : undefined
  this.el.innerHTML = templates[item.type]({
    item: item.item,
    trace: trace,
    fn: fn,
    format: format
  })
}

Inspector.prototype.remove = function remove() {
  if (this.opts.el) this.el.innerHTML = ''
  this.opts.app.off('inspect', this.render)
}

Inspector.prototype.setupListeners = function setupListeners(charts){
  var self = this
  this.charts = charts
  charts.forEach(function(d){
    d.on('mouseenter', self.preview.bind(self))
    d.on('mouseleave', self.restore.bind(self))
    d.on('click', self.select.bind(self))
  })
}

Inspector.prototype.preview = function mouseEnter(d){
  var self = this
  this.render(d)
  this.charts.forEach(function(chart) {
    if (chart.highlight) chart.highlight(d.item)
  })
}

Inspector.prototype.restore = function mouseLeave(){
  var self = this
  this.charts.forEach(function(chart) {
    if (chart.highlight) chart.highlight()
  })
  this.render(this.selected)
}

Inspector.prototype.select = function select(d) {
  var self = this
  this.selected = (this.selected && this.selected.item == d.item) ? false : d
  this.render(this.selected)
  this.charts.forEach(function(chart) {
    if (chart.select) chart.select(self.selected && self.selected.item)
  })
}

Inspector.prototype.deselect = function deselect() {
  delete this.selected
  this.render()
}

Inspector.prototype.toggleFunction = function (e) {
  var functions = this.querySelectorAll('.top-costs .function')
  Array.prototype.forEach.call(functions, function (item) {
    var target = item.querySelector('.header')
    if (target === e.delegateTarget) return item.classList.toggle('expanded')
    item.classList.toggle('expanded', false)
  })
}

module.exports = Inspector
