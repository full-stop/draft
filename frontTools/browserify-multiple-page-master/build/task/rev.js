/**
 * Created by Administrator on 2017/6/30.
 */
const gulp = require('gulp');
const changed = require('gulp-changed');
const rev = require('gulp-rev');
const revCollector  = require('gulp-rev-collector');
const glob = require('glob');
const utils = require('../utils');
const config = require('../../config');
const merge = require('merge-stream');

gulp.task('revcss:dev', ['img:dev', 'css:dev'], () => {
    let entries = utils.getEntries('./src/view/*/index.js');
    let stream = entries.map(src => {
        console.log(utils.getEntryName(src))
        return gulp.src([config.resDir + '/rev/'+ utils.getEntryName(src) +'/img/*.json', config.resDir + '/css/'+ utils.getEntryName(src) +'.css'])
            .pipe(revCollector())
            .pipe(gulp.dest(config.resDir + '/css'));
    });

    let assets = function(){
        return gulp.src([config.resDir + '/rev/public/img/*.json', config.resDir + '/public/css/*.css'])
            .pipe(revCollector())
            .pipe(gulp.dest(config.resDir + '/public/css'));
    }();

    return merge(stream,assets);
});

gulp.task('revcss:pro', () => {
    let entries = utils.getEntries('./src/view/*/index.js');
    let resName = glob.sync(config.resDir + '/css/*.css');
    let stream = entries.map(src => {
        let exp = new RegExp('\/css\/('+ utils.getEntryName(src) +'.+)\.css$');
        let name;

        for(let i in resName){
            if(exp.test(resName[i])){
                name = RegExp.$1;
                break;
            }
        }
        return gulp.src([config.resDir + '/rev/'+ utils.getEntryName(src) +'/img/*.json', config.resDir + '/css/'+ name +'.css'])
            .pipe(revCollector())
            .pipe(gulp.dest(config.resDir + '/css'));
    });

    let assets = function(){
        return gulp.src([config.resDir + '/rev/public/img/*.json', config.resDir + '/public/css/*.css'])
            .pipe(revCollector())
            .pipe(gulp.dest(config.resDir + '/public/css'));
    }();

    return merge(stream,assets);
});
