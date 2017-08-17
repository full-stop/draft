/**
 * Created by Administrator on 2017/6/30.
 */
const gulp = require('gulp');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const minifycss = require('gulp-clean-css');
const rev = require('gulp-rev');
const utils = require('../utils');
const config = require('../../config');
const merge = require('merge-stream');
const debug = require('gulp-debug');

gulp.task('css:dev', () => {
    let entries = utils.getEntries('./src/view/*/index.js');

    let assets = function(){
        return gulp.src(config.srcDir + '/public/css/*.css')
            .pipe(concat('base.css'))
            .pipe(changed(config.resDir + '/public/css'))
            .pipe(debug())
            .pipe(gulp.dest(config.resDir + '/public/css'))
    }();

    let stream = entries.map(src => {
        return gulp.src(utils.getEntrySrc(src) + '/css/*.css')
            .pipe(concat(utils.getEntryName(src) + '.css'))
            .pipe(changed(config.resDir + '/css'))
            .pipe(debug())
            .pipe(gulp.dest(config.resDir + '/css'))
    });
    return merge(stream, assets);
});

gulp.task('css:pro', () => {
    let entries = utils.getEntries('./src/view/*/index.js');

    let assets = function(){
        return gulp.src(config.srcDir + '/public/css/*.css')
            .pipe(concat('base.css'))
            .pipe(minifycss({
                compatibility: 'ie7'
            }))
            .pipe(debug())
            .pipe(rev())
            .pipe(gulp.dest(config.resDir + '/public/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.resDir + '/rev/public/css'))
    }();

    let stream = entries.map(src => {
        return gulp.src(utils.getEntrySrc(src) + '/css/*.css')
            .pipe(concat(utils.getEntryName(src) + '.css'))
            .pipe(minifycss())
            .pipe(debug())
            .pipe(rev())
            .pipe(gulp.dest(config.resDir + '/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.resDir + '/rev/' + utils.getEntryName(src) + '/css'))
    });
    return merge(stream, assets);
});