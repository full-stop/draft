/**
 * Created by Administrator on 2017/6/28.
 */
require('./task/browserify');
require('./task/img');
require('./task/css');
require('./task/html');
require('./task/swf');
require('./task/media');
require('./task/rev');
require('./task/clean');

const gulp = require('gulp');
const runSequence = require('run-sequence');
const config = require('../config');

gulp.task('dev', ['clean'], done => {
    runSequence(
        ['browserify:dev', 'css:dev', 'img:dev', 'media', 'swf'],
        'html:dev',
        'revcss:dev',
        done
    )
});

gulp.task('build', done => {
    runSequence(
        'clean',
        ['browserify:pro', 'css:pro', 'img:pro', 'media', 'swf'],
        'html:pro',
        'revcss:pro',
        done
    )
});

gulp.task('watch', ['dev'], () => {
    // css
    gulp.watch(config.srcDir + '/view/**/css/*.css', ['revcss:dev']);
    // img
    gulp.watch(config.srcDir + '/view/**/img/*.*', ['revcss:dev']);
    // html
    gulp.watch(config.srcDir + '/view/**/index.html', ['html:dev']);
    // media
    gulp.watch(config.srcDir + '/view/**/*.*', ['media']);
    // swf
    gulp.watch(config.srcDir + '/view/**/*.*', ['swf']);
    // public:css
    gulp.watch(config.srcDir + '/public/css/*.css', ['css:dev']);
});
