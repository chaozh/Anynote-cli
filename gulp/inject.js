'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();
//TODO: try replace with webpack CommonsChunkPlugin
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'),
    path.join(conf.paths.tmp, '/serve/addons/**/*.css') // hack for wiredep
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/addons/**/*.js'), // hack for wiredep
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    //.pipe($.inject(injectAddons, injectOptions)) //need watch
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
