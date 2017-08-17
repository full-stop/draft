/**
 * Created by Administrator on 2017/7/1 0001.
 */
const gulp = require('gulp');
const changed = require('gulp-changed');
const rev = require('gulp-rev');
const utils = require('../utils');
const config = require('../../config');
const merge = require('merge-stream');
const debug = require('gulp-debug');

gulp.task('media', () => {
    let entries = utils.getEntries('./src/view/*/index.js');

    let assets = function(){
        return gulp.src(config.srcDir + '/public/media/*.+(mp4|flv|mp3)')
            .pipe(changed(config.resDir + '/public/media'))
            .pipe(debug())
            .pipe(gulp.dest(config.resDir + '/public/media'));
    }();

    let stream = entries.map(src => {
        return gulp.src(utils.getEntrySrc(src) + '/media/*.+(mp4|flv|mp3)')
            .pipe(changed(config.resDir + '/media'))
            .pipe(debug())
            .pipe(gulp.dest(config.resDir + '/media'));
    });
    return merge(stream, assets);
});