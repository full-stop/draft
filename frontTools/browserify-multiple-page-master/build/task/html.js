/**
 * Created by Administrator on 2017/6/30.
 */
const gulp = require('gulp');
const rename = require('gulp-rename');
const glob = require('glob');
const changed = require('gulp-changed');
const revCollector = require('gulp-rev-collector');
const minifyHTML = require('gulp-minify-html');
const utils = require('../utils');
const config = require('../../config');
const merge = require('merge-stream');
const debug = require('gulp-debug');

gulp.task('html:dev', () => {
    let entries = utils.getEntries('./src/view/*/index.js');
    let stream = entries.map(src => {
        return gulp.src([config.resDir + '/rev/public/**/*.json', config.resDir + '/rev/'+ utils.getEntryName(src) +'/**/*.json', utils.getEntrySrc(src) +'/index.html'])
            .pipe(revCollector({
                replaceReved: true,
                dirReplacements: {
                    'css': 'css',
                    'js': 'js',
                    'img': 'img'
                }
            }))
            .pipe(rename('t_' + utils.getEntryName(src) + '.' + config.ftlext))
            .pipe(changed(config.ftlDir))
            .pipe(debug())
            .pipe(gulp.dest(config.ftlDir))
    });

    return merge(stream);
});

gulp.task('html:pro', () => {
    let entries = utils.getEntries('./src/view/*/index.js');
    let stream = entries.map(src => {
        return gulp.src([config.resDir + '/rev/'+ utils.getEntryName(src) +'/**/*.json', config.resDir + '/rev/public/**/*.json', utils.getEntrySrc(src) +'/index.html'])
            .pipe(revCollector({
                replaceReved: true,
                dirReplacements: {
                    'css': 'css',
                    'js': 'js',
                    'img': 'img'
                }
            }))
            .pipe(rename('t_' + utils.getEntryName(src) + '.' + config.ftlext))
            .pipe(minifyHTML({
                empty:true,
                spare:true
            }))
            .pipe(debug())
            .pipe(gulp.dest(config.ftlDir))
    });

    return merge(stream);
});