'use strict';

const gulp = require('gulp');
const { dest, series, watch } = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const allSrc = 'src/**/*.js';

function cleanDist() {
  return gulp.src('dist/', { allowEmpty: true, read: false }).pipe(clean());
}

function uglifyJs() {
  return gulp
    .src('src/*.js', { allowEmpty: true })
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('src/'));
}

function moveJsFiles() {
  return gulp.src('src/*.js').pipe(gulp.dest('dist/'));
}

function cleanSrc() {
  return gulp.src('src/*.js', { allowEmpty: true, read: false }).pipe(clean());
}

/*  ---------------------------------------------------------------------------------------------------------------   */

exports.default = function () {
  watch(allSrc, series(cleanDist, uglifyJs, moveJsFiles, cleanSrc));
};

exports.dist = series(cleanDist, uglifyJs, moveJsFiles, cleanSrc);
