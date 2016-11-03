/**
 * Created by shange on 16/11/02.
 *
 * 提示框,确认提示框,弹出层等
 */
import {DeviceEventEmitter} from './../Framework';

'use strict';
var Dialog = {
    // 提示框
    alert(text, title, buttonText, callback) {
        let notification = {
            title: title,
            text: text,
            buttonText: buttonText,
            callback: callback,
        };
        DeviceEventEmitter.emit('HFPage', 'HFAlert', notification);
    },
    alertCancel() {
        DeviceEventEmitter.emit('HFPage', 'HFAlertCancel', null);
    },
    // 确认提示框
    confirm() {
    },
    // 弹出层
    dialog() {
    },
};
module.exports = Dialog;