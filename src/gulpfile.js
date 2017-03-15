var gulp = require('gulp');
var shell = require('gulp-shell');
var ghPages = require('gulp-gh-pages');

gulp.task('session', shell.task([
    'node ejemplo.js'
]));
gulp.task('cookie', shell.task([
  'node cookieModule.js'
]))
