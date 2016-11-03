/**
 * Created by shange on 16/11/02.
 *
 * 提示框,确认提示框,弹出层等
 */
import {DeviceEventEmitter} from './../Framework';

'use strict';
var Dialog = {
    /**
     * 提示框
     *
     * @param text          内容
     * @param buttonText    按钮文字
     * @param title         标题
     * @param callback      回调方法
     */
    alert(text, buttonText, title, callback) {
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
    /**
     * 确认提示框
     *
     * @param text          内容
     * @param callback      点确定按钮后的回调方法
     * @param buttonText    确定按钮显示文字
     * @param cancelText    取消按钮显示文字
     * @param title         标题
     */
    confirm(text, callback, buttonText, cancelText, title) {
        let notification = {
            title: title,
            text: text,
            buttonText: buttonText,
            cancelText: cancelText,
            callback: callback,
        };
        DeviceEventEmitter.emit('HFPage', 'HFConfirm', notification);
    },
    confirmCancel() {
        DeviceEventEmitter.emit('HFPage', 'HFConfirmCancel', null);
    },
    // 弹出层
    dialog() {
    },
    dialogCancel() {
    },
};
module.exports = Dialog;