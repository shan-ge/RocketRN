/**
 * Created by shange on 2016/11/02.
 *
 * 提示框,确认提示框,弹出层等
 */
import {DeviceEventEmitter, Platform, Linking} from './../Framework';

import Toast from '@remobile/react-native-toast';

import Bridge from './Bridge';
import Handler from './Handler';

import Constants from './../../Application/Common/Constants';

'use strict';
var Dialog = {
    /**
     * 提示框
     *
     * @param text              内容
     * @param buttonText        按钮文字
     * @param title             标题
     * @param callback          回调方法
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
     * @param text              内容
     * @param callback          点确定按钮后的回调方法
     * @param buttonText        确定按钮显示文字
     * @param cancelText        取消按钮显示文字
     * @param title             标题
     * @param cancelCallback    点取消按钮后的回调方法
     */
    confirm(text, callback, buttonText, cancelText, title, cancelCallback) {
        let notification = {
            title: title,
            text: text,
            buttonText: buttonText,
            cancelText: cancelText,
            callback: callback,
            cancelCallback: cancelCallback,
        };
        DeviceEventEmitter.emit('HFPage', 'HFConfirm', notification);
    },
    confirmCancel() {
        DeviceEventEmitter.emit('HFPage', 'HFConfirmCancel', null);
    },
    /**
     * 弹出层
     * 下面一个按钮,右上角有关闭的[x]号
     *
     * @param buttonText
     * @param title
     * @param callback
     * @param innerView
     */
    dialog(buttonText, title, callback) {
        let notification = {
            title: title,
            buttonText: buttonText,
            callback: callback,
        };
        DeviceEventEmitter.emit('HFPage', 'HFDialog', notification);
    },
    dialogCancel() {
        DeviceEventEmitter.emit('HFPage', 'HFDialogCancel', null);
    },
    /**
     * 根据后台返回值来判断要弹出的样式,以及回调函数
     *
     * @param fetchResponse     消息内容{status:1~1999,}
     * @param callback          弹框之后/点击alert确定之后/点击confirm的确定之后,要执行的回调方法
     */
    alertApiResponse(fetchResponse, callback){
        if (fetchResponse != null && fetchResponse['status'] != null && fetchResponse['message'] != null) {
            let status = parseInt(fetchResponse['status']);
            let message = fetchResponse['message'];
            let clientAlterType = parseInt(fetchResponse['clientAlterType']);
            let url = fetchResponse['url'];
            if (status >= 0 && status < 100) {
                if (callback) {
                    callback();
                }
            } else if (status >= 100 && status < 200) {
                Toast.showShortCenter(message);
                if (callback) {
                    callback();
                }
            } else if (status >= 200 && status < 300) {
                if (status >= 200 && status < 210) {
                    this.confirm(message, callback, '确定', '取消', '提示');
                } else {
                    Toast.showShortCenter(message);
                    if (callback) {
                        callback();
                    }
                }
            } else if (status >= 300 && status < 400) {
                if (status >= 300 && status < 330) {
                    Handler.removeAll();
                    Handler.save(Constants.storageKeyIsLogin, false);
                    DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toLogin');
                } else if (status >= 330 && status < 340) {
                    DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toPerfectInfo');
                } else if (status >= 340 && status < 350) {
                    DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toCertification');
                }
            } else if (status >= 400 && status < 500) {
                Toast.showShortCenter(message);
                if (callback) {
                    callback();
                }
            } else if (status >= 500 && status < 600) {
                Toast.showShortCenter(message);
                if (callback) {
                    callback();
                }
            } else if (status >= 800 && status < 900) {
                Toast.showLongCenter(message);
                if (callback) {
                    callback();
                }
            } else if (status >= 900 && status < 1000) {
                this.alert(message, '确定', '提示', callback);
            } else if (status >= 1000 && status < 1100) {
                if (clientAlterType == 1) {
                    Toast.showShortCenter(message);
                } else if (clientAlterType == 2) {
                    this.alert(message, '这就去更新', '系统更新提示', function () {
                        Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                return Linking.openURL('http://www.houfadoc.com/download.html');
                            } else {
                                return Linking.openURL(url);
                            }
                        }).catch(err => console.error('An error occurred', err));
                    });
                } else if (clientAlterType == 3) {
                    let self = this;
                    Bridge.readFile(Constants.fileHasShownUpdateAppConfirm, function (result) {
                        if (result == null || result['message'] == null || result['message'] == '' || result['message'] != Constants.version) {
                            Bridge.writeFile(Constants.fileHasShownUpdateAppConfirm, Constants.version, 0);
                            self.confirm(message, function () {
                                Linking.canOpenURL(url).then(supported => {
                                    if (!supported) {
                                        return Linking.openURL('http://www.houfadoc.com/download.html');
                                    } else {
                                        return Linking.openURL(url);
                                    }
                                }).catch(err => console.error('An error occurred', err));
                            }, '确定', '忽略此版', '系统更新提示', function () {
                                if (callback) {
                                    callback();
                                }
                            });
                        } else {
                            if (callback) {
                                callback();
                            }
                        }
                    });
                }
            } else {
                if (callback) {
                    callback();
                }
            }
        }
    },
};
module.exports = Dialog;