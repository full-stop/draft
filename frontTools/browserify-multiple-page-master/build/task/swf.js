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

gulp.task('swf', () => {
    let entries = utils.getEntries('./src/view/*/index.js');

    let assets = function(){
        return gulp.src(config.srcDir + '/public/swf/*.swf')
            .pipe(changed(config.resDir + '/public/swf'))
            .pipe(debug())
            .pipe(gulp.dest(config.resDir + '/public/swf'))
    }();

    let stream = entries.map(src => {
        return gulp.src(utils.getEntrySrc(src) + '/swf/*.swf')
            .pipe(changed(config.resDir + '/swf'))
            .pipe(debug())
            .pipe(gulp.dest(config.resDir + '/swf'))
    });
    return merge(stream ,assets);
});
