var async = require('async');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var install = require('gulp-install');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var mocha = require('gulp-spawn-mocha');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var spawn = require('child_process').spawn;
var pullDevTools = require('./build-tasks/pull-devtools');
var setupMysql = require('./build-tasks/setup-mysql');
var downloadHelpAssets = require('./build-tasks/download-help-assets');
var _ = require('lodash');
var browserify = require('browserify');

gulp.task('default', ['build', 'test', 'watch']);

gulp.task('build', [
    'build-less',
    'build-less-devtools',
    'build-devtools-autoprefixer',
    'build-version',
    'build-workspace-services',
    'build-build-and-deploy-services',
    'build-help-assets',
    'build-arc-services',
    'build-tracing-bundle',
    'install-example-modules',
], function() {
  // Remove the env var
  process.env.GULP_ANGULAR_CODEGEN = undefined;
});

gulp.task('build-less', function(done) {
  return gulp.src('client/less/style.less')
    .pipe(less()).on('error', function(err){
      //catch error so we don't crash the watcher
      console.error(err);
      done();
    })
    .pipe(gulp.dest('client/www/style/'));
});

gulp.task('build-less-devtools', function() {
  return gulp.src('devtools/custom/less/strongloop.less')
    .pipe(less())
    .pipe(gulp.dest('devtools/custom/'));
});

gulp.task('build-devtools-autoprefixer', function() {
  return gulp.src('devtools/frontend/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('devtools/prefixed'));
});

gulp.task('watch', ['build'], function() {
  // Watch all the .less files, then run the less tasks
  gulp.watch('client/less/**/*.less', ['build-less']);
  gulp.watch('devtools/custom/less/**/*.less', ['build-less-devtools']);
});

gulp.task('build-version', function(callback) {
  var pkg = require('./package.json');
  var title = 'StrongLoop Arc';
  var titleAndVersion = title + ' ' + pkg.version;
  var content =
    '// This file is generated by `gulp build`. Do not edit manually!' +
    '\ndocument.title = ' + JSON.stringify(title) +
    '\ndocument.querySelector(".header-version").innerHTML = ' +
    JSON.stringify(titleAndVersion) + ';' +
    '\n';

  var filepath = path.resolve(__dirname,
    'client', 'www', 'scripts', 'version.js');

  fs.writeFile(filepath, content, 'utf-8', callback);
});

gulp.task('build-workspace-services', function() {
  return gulp.src('./node_modules/loopback-workspace/app.js')
    .pipe(loopbackAngular({ apiUrl: '/workspace/api' }))
    .pipe(rename('workspace.services.js'))
    .pipe(gulp.dest('./client/www/scripts/modules/common'));
});

gulp.task('build-arc-services', function() {
  process.env.GULP_ANGULAR_CODEGEN = 'YES';
  return gulp.src('./arc-api/server/server.js')
    .pipe(loopbackAngular({
      apiUrl: '/api',
      ngModuleName: 'ArcServices'
    }))
    .pipe(rename('arc-services.js'))
    .pipe(gulp.dest('./client/www/scripts/modules/common'));
});

gulp.task('build-build-and-deploy-services', function() {
  return gulp.src('./build-deploy/server/server.js')
    .pipe(loopbackAngular({
      apiUrl: '/build-deploy',
      ngModuleName: 'BuildDeployAPI'
    }))
    .pipe(rename('lb-build.js'))
    .pipe(gulp.dest('./client/www/scripts/modules/common'));
});

gulp.task('build-help-assets', function(callback) {
  var helpData = fs.readJsonFileSync(
    path.resolve(__dirname, 'client/help.json'));

  var names = helpData.names;

  downloadHelpAssets(
    names,
    path.resolve(__dirname, 'client/www/help'),
    callback);
});

gulp.task('build-tracing-bundle', function() {
  var bSource = './client/www/scripts/modules/tracing/src/tracing.viz.module.js';
  return browserify(bSource, {standalone: 'TracingViz'})
    .bundle()
    .pipe(fs.createWriteStream('./client/www/scripts/modules/tracing/tracing.viz.module.js'));
});

gulp.task('install-example-modules', function() {
  return gulp.src('examples/*/package.json')
    .pipe(install({ production: true }));
});

// alias for sl-ci-run and `npm test`
gulp.task('mocha-and-karma', ['test']);

gulp.task('test', ['build'], function(callback) {
  runSequence(
    'jshint',
    'test-server',
    'test-pm',
    'setup-mysql',
    'test-client-integration',
    callback);
});

gulp.task('jshint', function() {
  return gulp.src([
    'gulpfile.js',
    'build-tasks/**/*.js',
    'server/**/*.js',
    'client/test/e2e/**/*.js',
    'client/test/integration/**/*.js',
    'devtools/server/**/*.js',
    // TODO(bajtos) add more files once they pass the linter
    '!client/test/{sandbox/,sandbox/**}',
    '!client/test/integration/{sandbox/,sandbox/**}'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('test-server', function() {
  return gulp.src('server/test/*.js', { read: false })
    .pipe(mocha());
});

gulp.task('test-pm', function() {
  return gulp.src('process-manager/test/*.js', { read: false })
    .pipe(mocha());
});

gulp.task('test-client-integration', function(callback) {
  var child = spawn(
    process.execPath,
    [
      'client/test/test-server',
      'node_modules/.bin/karma',
      'start',
      '--single-run',
      '--browsers',
      'PhantomJS',
      'client/test/integration/karma.integration.js'
    ],
    {
      cwd: __dirname,
      stdio: 'inherit'
    });

  child.on('error', function(err) {
    callback(err);
  });
  child.on('exit', function(code) {
    if (code)
      callback(new Error('Failed with exit code ' + code));
    else
      callback();
  });
});

gulp.task('setup-mysql', function(callback) {
  var ROOT_PASSWORD = process.env.MYSQL_ROOT_PWD || '';
  setupMysql(ROOT_PASSWORD, function(err) {
    if (err) logMysqlErrorDescription(err);
    // Don't fail the build so that more tests will be run
    callback(null);
  });

  function logMysqlErrorDescription(err) {
    switch (err.code) {
      case 'ECONNREFUSED':
        logRed('Cannot connect to the MySQL server.');
        logRed('Ensure you have a MySQL server running at your machine.');
        break;
      case 'ER_ACCESS_DENIED_ERROR':
        logRed('Cannot login as MySQL `root` user.');
        logRed('Provide the password via the env var MYSQL_ROOT_PWD.');
        break;
    }
  }

  function logRed() {
    gutil.log(gutil.colors.red.apply(gutil.colors, arguments));
  }
});

gulp.task('pull-devtools', function(callback) {
  var DEVTOOLS_DIR = path.resolve(__dirname, 'devtools');
  pullDevTools(DEVTOOLS_DIR, callback);
});
