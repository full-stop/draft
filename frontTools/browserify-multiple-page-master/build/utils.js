/**
 * Created by Administrator on 2017/6/29.
 */
const glob = require('glob');

module.exports = {
    getEntryName(src){
        let exp = /^(\.\/src\/view\/)(.+)(\/index.js)$/;
        if(exp.test(src)){
            return RegExp.$2;
        }
    },
    getEntrySrc(src){
        let exp = /^(\.\/src\/view\/)(.+)(\/index.js)$/;
        if(exp.test(src)){
            return RegExp.$1 + RegExp.$2;
        }
    },
    getEntries(globPath){
        let files = glob.sync(globPath);
        return files;
    }
};