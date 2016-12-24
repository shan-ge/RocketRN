/**
 * Created by shange on 2016/12/06.
 *
 * 图片控件
 */
import {DeviceEventEmitter} from './../Framework';

'use strict';
var PhotoUtil = {
    /**
     * 上传图片
     *
     * @param callback      选中图片后的回调函数
     */
    upload(callback){
        let notification = {
            callback: callback,
        };
        DeviceEventEmitter.emit('HFPage', 'PhotoUtil', notification);
    }
};

module.exports = PhotoUtil;