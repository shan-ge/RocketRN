/**
 * Created by shange on 2016/11/08.
 *
 * 选择器等
 */
import {DeviceEventEmitter} from './../Framework';

'use strict';
var Picker = {
    /**
     * 打开选择器
     *
     * @param key               唯一标识(如sex,doctorTitle,height,weight)
     * @param title             显示标题
     * @param datas             数据源:[{value:0,text:'男'},{value:1,text:'女'}]
     * @param value             默认选中值
     * @param callback          选中回调函数
     */
    picker(key, title, datas, value, callback) {
        let notification = {
            key: key,
            title: title,
            datas: datas,
            value: value,
            callback: callback
        };
        DeviceEventEmitter.emit('HFPage', 'HFPickerCancel', null);
        DeviceEventEmitter.emit('HFPage', 'HFPicker', notification);
    },
    /**
     * 关闭选择器
     */
    pickerCancel() {
        DeviceEventEmitter.emit('HFPage', 'HFPickerCancel', null);
    },
};
module.exports = Picker;