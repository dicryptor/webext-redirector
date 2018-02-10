'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['manifest.json', 'background.js', 'icons/*'];
var xpiName = 'redirector.xpi';

gulp.task('default', function () {
  gulp.src('./**')
    .pipe(zip(xpiName))
    .pipe(gulp.dest('.'));
});