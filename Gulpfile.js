/*
    Gulp tasks.
*/

'use strict';

// load plugins

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

// less

gulp.task('sass', function() {
    gulp.src('./app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/styles'));
});

// css

gulp.task('css', function() {
    gulp.src('./app/styles/main.css')
        .pipe(minifyCSS())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest('./app/styles'))
});

// watch

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./app/styles/main.scss', ['sass']);
    gulp.watch('./app/styles/main.css', ['css']);
    gulp.watch('*').on('change', livereload.changed);
    gulp.watch('./app/styles/main.min.css').on('change', livereload.changed);
});