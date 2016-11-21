/**
 * Created by shange on 2016/11/07.
 *
 * 数组控件
 */

'use strict';
var ArrayUtil = {
    // 复制
    clone(array){
        if (array == null) {
            return null;
        }
        let arr = [];
        for (let i = 0; i < array.length; i++) {
            arr.push(array[i]);
        }
        return arr;
    }
};
module.exports = ArrayUtil;