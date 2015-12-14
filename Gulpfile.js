// Gulpfile

'use strict';

// load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    php = require('gulp-connect-php');

// default
gulp.task('default', ['server']);

// server
gulp.task('server', ['sass'], function() {

	// php server
    php.server({}, function() {
        browserSync({
            proxy: '127.0.0.1:8000'
        });
    });

    // html server
    // browserSync.init({
    //     server: "./"
    // });
	
	// watch files
    gulp.watch('./app/styles/main.scss', ['sass']);
    gulp.watch('./app/styles/main.min.css', ['sass']);
    gulp.watch('./app/scripts/main.min.js').on('change', browserSync.reload);
    gulp.watch('./*').on('change', browserSync.reload);
});

// sass
gulp.task('sass', function() {
    gulp.src('./app/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/styles'))
        .pipe(autoprefixer({
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
        }))
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./app/styles'))
        .pipe(browserSync.stream());
});