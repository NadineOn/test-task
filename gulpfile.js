'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    changed = require('gulp-changed'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    symlink = require('gulp-symlink'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        vendor: 'build/vendor/',
        vendor_symlink: 'src/vendor',
        jade: 'build/templates'

    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/scss/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'bower_components/**/*',
        vendor_symlink: 'bower_components',
        jade: 'src/jade/*.jade'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'bower_components/**/*',
        vendor_symlink: 'bower_components',
        jade: 'src/jade/*.jade'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    open: false,
    tunnel: true,
    host: "test-task",
    port: 9000,
    logPrefix: "Test task"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('symlink', function (cb) {
    gulp.src(path.src.vendor_symlink)
        .pipe(symlink(path.build.vendor_symlink, {force: true}));
});

gulp.task('templates:build', function() {
    var htmlOutput = {
        name: 'Forbes Lindesay',
        twitter: '@ForbesLindesay',
        blog: 'forbeslindesay.co.uk'
    };

    gulp.src(path.src.jade)
        .pipe(jade({
            locals: htmlOutput
        }))
        .pipe(gulp.dest(path.build.jade))
});

gulp.task('vendor:build', function() {
    gulp.src(path.src.vendor)
        .pipe(changed(path.build.vendor, {hasChanged: changed.compareSha1Digest}))
        .pipe(gulp.dest(path.build.vendor));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(changed(path.build.js, {hasChanged: changed.compareSha1Digest}))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/scss/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(changed(path.build.css, {hasChanged: changed.compareSha1Digest}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(changed(path.build.img, {hasChanged: changed.compareSha1Digest}))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(changed(path.build.fonts, {hasChanged: changed.compareSha1Digest}))
});

gulp.task('build', [
    //'symlink',
    'vendor:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'templates:build'
]);


gulp.task('watch', function(){
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['image:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
    gulp.watch(path.watch.jade, ['templates:build']);
});


gulp.task('default', ['build', 'webserver', 'watch']);