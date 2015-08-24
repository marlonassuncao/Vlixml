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
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer');

// sass

gulp.task('sass', function() {
    gulp.src('./app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/styles'))
        .pipe(autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./app/styles'))
        livereload.listen();
});

// default
gulp.task('default', ['sass']);


// watch

gulp.task('watch', function() {
    gulp.watch('./app/styles/main.scss', ['sass']);
    gulp.watch('*').on('change', livereload.changed);
    gulp.watch('./app/styles/main.min.css').on('change', livereload.changed);
    livereload.listen();
});