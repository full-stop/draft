/**
 * Created by Administrator on 2017/6/28.
 */
const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const glob = require('glob');
const rev = require('gulp-rev');
const gutil = require('gulp-util');
const utils = require('../utils');
const config = require('../../config');
const debug = require('gulp-debug');
const merge = require('merge-stream');
const del = require('del');
const browserifyEjs = require('browserify-ejs');

function bundle(type){
    let files = glob.sync('./src/view/*/index.js');
    let stream = files.map(file => {
        let b,action;
        if(type === 'DEV'){
            b = browserify({
                cache: {},
                packageCache: {},
                debug: true,
                entries: [file],
                plugin: [watchify]
            }).transform(browserifyEjs);
            action= function(){
                return b.bundle()
                    .pipe(source(utils.getEntryName(file) +'.js'))
                    .pipe(buffer())
                    .pipe(debug())
                    .pipe(gulp.dest(config.resDir + '/js'))
            };

            b.on('update', action);
            b.on('log', gutil.log);

        }else if(type === 'PRO'){
            b = browserify({
                entries: [file]
            }).transform(browserifyEjs);
            action = function(){
                return b.bundle()
                    .pipe(source(utils.getEntryName(file) +'.js'))
                    .pipe(buffer())
                    .pipe(debug())
                    .pipe(rev())
                    .pipe(gulp.dest(config.resDir + '/js'))
                    .pipe(rev.manifest())
                    .pipe(gulp.dest(config.resDir + '/rev/' + utils.getEntryName(file) + '/js'));
            };
        }
        return action();
    });

    return merge(stream);
}

gulp.task('browserify:dev', function(){
    bundle('DEV');
});

gulp.task('browserify:pro', function(){
    bundle('PRO');
});