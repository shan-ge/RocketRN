/**
 * Created by shange on 2016/11/04. RN与原生的桥接器
 *
 */

import {Platform, NativeModules} from "react-native";
import Toast from '@remobile/react-native-toast';

// 桥接器
var IOS_BridgeModule = NativeModules.BridgeModule;
var ANDROID_BridgeModule = NativeModules.BridgeModule;

'use strict';
var Bridge = {
    /**
     * 写入文件
     *
     * @param fileName      :   文件名
     * @param content       :   内容
     * @param writeType     :   0=覆盖 1=追加
     * @param callback      :   回调方法
     *
     * @return {code,message}
     */
    writeFile(fileName, content, writeType, callback) {
        try {
            let param = {
                'fileName': fileName + '',
                'content': content + '',
                'writeType': writeType
            };
            if (Platform.OS == 'ios') {
                IOS_BridgeModule.writeFile(
                    param,
                    (error, message)=> {
                        if (callback) {
                            if (error) {
                                callback({
                                    code: -1,
                                    message: error
                                });
                            } else {
                                callback({
                                    code: 1,
                                    message: message
                                });
                            }
                        }
                    });
            } else {
                ANDROID_BridgeModule.writeFile(fileName, content, writeType,
                    (error) => {
                        if (callback) {
                            callback({
                                code: -1,
                                message: error
                            });
                        }
                    },
                    (message) => {
                        if (callback) {
                            callback({
                                code: 1,
                                message: message
                            });
                        }
                    });
            }
        } catch (e) {
            Toast.showShortCenter("写入文件失败");
        }
    },
    /**
     * 读取文件
     *
     * @param fileName      :   文件名
     * @param callback      :   回调方法
     *
     * @return {code,message}
     */
    readFile(fileName, callback) {
        try {
            let param = {
                'fileName': fileName + ''
            };
            if (Platform.OS == 'ios') {
                IOS_BridgeModule.readFile(
                    param,
                    (error, message)=> {
                        if (callback) {
                            if (error) {
                                callback({
                                    code: -1,
                                    message: error
                                });
                            } else {
                                callback({
                                    code: 1,
                                    message: message
                                });
                            }
                        }
                    });
            } else {
                ANDROID_BridgeModule.readFile(fileName,
                    (error) => {
                        if (callback) {
                            callback({
                                code: -1,
                                message: error
                            });
                        }
                    },
                    (message) => {
                        if (callback) {
                            callback({
                                code: 1,
                                message: message
                            });
                        }
                    });
            }
        } catch (e) {
            Toast.showShortCenter("读取文件失败");
        }
    },

};

module.exports = Bridge;