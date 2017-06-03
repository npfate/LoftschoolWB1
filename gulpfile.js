"use strict";

var gulp = require('gulp'),
var concatCSS = require('gulp-concat-css'),
var cleanCSS = require('gulp-clean-css'),
var rename = require('gulp-rename'),
var notify = require('gulp-notify'),
var prefixer = require('gulp-autoprefixer'),
var connect = require('gulp-connect'),
var sass = require('gulp-sass'),
var uncss = require('gulp-uncss'),
var rev_append = require('gulp-rev-append'),
var livereload = require('gulp-livereload');

// server connect
gulp.task('connect', function(){
  connect.server({
    root: 'app',
    livereload: true
  });
});


// gulp.task('default', function() {
//   return gulp.src('css/common.css')
//     .pipe(uncss({
//       html: ['app/index.html']
//     }))
//     .pipe(gulp.dest('app/css'));
// });

// css
gulp.task('css', function () {
  return gulp.src('css/*.css')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(prefixer('last 2 versions', '> 1%', 'ie 10'))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function (){
  gulp.src('app/index.html')
  .pipe(connect.reload());
})

// watch
gulp.task('watch', function (){
  gulp.watch('css/*.css', ['css'])
  gulp.watch('app/index.html', ['html'])
})

// default
gulp.task('default', ['connect', 'css', 'html', 'watch']);

// rev (against cash)
// gulp.task('rev_append', function() {
//   gulp.src('./www/index.html')
//     .pipe(rev_append())
//     .pipe(gulp.dest('./www/'));
// })
