var express = require('express');
var app = module.exports = express();
app.set('legacyExplorer', false);

var path = require('path');
var workspace = require('loopback-workspace');
// export the workspace object, useful e.g. in tests
app.workspace = workspace;

var buildDeploy = require('../build-deploy/server/server');
var devtools = require('../devtools/server/devtools');
var pm = require('../process-manager/server');
var meshProxy = require('strong-mesh-client/proxy/server')(
  path.join(process.cwd(), process.env.MANAGER_CONFIG || 'arc-manager.json')
);
app.meshProxy = meshProxy;

var arcApi = require('../arc-api/server/server');

// REST APIs
app.use('/workspace', workspace);
app.use('/devtools', devtools);
app.use('/build-deploy', buildDeploy);
app.use('/process-manager', pm);
app.use('/api', arcApi);
app.use('/manager', meshProxy);

app.enableFeatures = function(features) {
  // prefix is to namespace features in express config table
  features = features.map(function(f) {
    return 'feature:' + f;
  });
  features.forEach(function(f) {
    app.enable(f);
  });
  // expose features list via REST so they can be checked by frontend
  app.get('/feature-flags', function(req, res) {
    res.json(features);
  });

  // example feature, "--feature crash" enables a /crash handler
  if (app.enabled('feature:crash')) {
    app.use('/crash', function(_req, _res) {
      process.exit(1);
    });
  }
};

try {
  // API explorer
  var explorer = require('loopback-explorer');
  app.use('/explorer/workspace', explorer(workspace,
    { basePath: '/workspace/api' }));
  app.use('/explorer/arc-api', explorer(arcApi, { basePath: '/api' }));
} catch(err) {
  // silently ignore the error, the explorer is not available in "production"
}

// static files
app.use(require('express-jsxtransform')())
   .use(express.static(path.join(__dirname, '../client/www')));

var listen = app.listen;
app.listen = function() {
  var server = process.server = listen.apply(app, arguments);
  meshProxy.setupPrimus(server);
  devtools.setupWebSocketServer(server);
  pm.start();
  return server;
};
