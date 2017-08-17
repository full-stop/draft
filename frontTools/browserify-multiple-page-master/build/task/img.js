/**
 * Created by Administrator on 2017/6/30.
 */
const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rev = require('gulp-rev');
const utils = require('../utils');
const config = require('../../config');
const merge = require('merge-stream');
const debug = require('gulp-debug');

gulp.task('img:dev', () => {
    let entries = utils.getEntries('./src/view/*/index.js');

    let assets = function(){
        return gulp.src(config.srcDir + '/public/img/*.+(jpg|jpeg|png|gif)')
            .pipe(debug())
            .pipe(rev())
            .pipe(changed(config.resDir + '/rev/public/img'))
            .pipe(gulp.dest(config.resDir + '/public/img'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.resDir + '/rev/public/img'))
    }();

    let stream = entries.map(src => {
        return gulp.src(utils.getEntrySrc(src) + '/img/*.+(jpg|jpeg|png|gif)')
            .pipe(debug())
            .pipe(rev())
            .pipe(changed(config.resDir + '/rev/' + utils.getEntryName(src) + '/img'))
            .pipe(gulp.dest(config.resDir + '/img'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.resDir + '/rev/' + utils.getEntryName(src) + '/img'))
    });

    return merge(stream, assets);
});

//image prod,增加imagemin图片压缩
gulp.task('img:pro', () => {
    let entries = utils.getEntries('./src/view/*/index.js');

    let assets = function(){
        return gulp.src(config.srcDir + '/public/img/*.+(jpg|jpeg|png|gif)')
            .pipe(debug())
            .pipe(rev())
            .pipe(gulp.dest(config.resDir + '/public/img'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.resDir + '/rev/public/img'))
    }();

    let stream = entries.map(src => {
        return gulp.src(utils.getEntrySrc(src) + '/img/*.+(jpg|jpeg|png|gif)')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(debug())
            .pipe(rev())
            .pipe(gulp.dest(config.resDir + '/img'))
            .pipe(rev.manifest())
            .pipe(gulp.dest(config.resDir + '/rev/' + utils.getEntryName(src) + '/img'))
    });

    return merge(stream, assets);
});