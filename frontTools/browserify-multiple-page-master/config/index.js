/**
 *
 * Created by Administrator on 2017/6/29.
 */
const path = require('path');

function getDir(src){
    return path.resolve(__dirname, '../', src);
}

module.exports = {
    srcDir: getDir('src'),
    resDir: getDir('res/qcfh'),
    ftlDir: getDir('WEB-INF/ftl/'),
    ftlext: 'html'
};