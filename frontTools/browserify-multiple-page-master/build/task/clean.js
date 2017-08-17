/**
 * Created by Administrator on 2017/6/30.
 */
const gulp = require('gulp');
const del = require('del');
const config = require('../../config');

gulp.task('clean', cb => {
    return del([config.resDir, config.ftlDir], cb);
});