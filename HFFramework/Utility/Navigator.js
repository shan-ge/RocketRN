/**
 * Created by shange on 2016/11/10.
 *
 * 拦截器
 */

import {DeviceEventEmitter} from './../Framework';

import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import Handler from './../Utility/Handler';
import Filter from './../../Application/Common/Filter';

import Constants from './../../Application/Common/Constants';

'use strict';
var FilterMap = null;
var Navigator = {
        pop(nav){
            // 关闭键盘
            dismissKeyboard();
            // 路由
            let navigator = nav ? nav : Constants.navigator;
            if (navigator) {
                navigator.pop();
            }
        },
        jumpBack(nav){
            // 关闭键盘
            dismissKeyboard();
            // 路由
            let navigator = nav ? nav : Constants.navigator;
            if (navigator) {
                navigator.jumpBack();
            }
        },
        resetTo(param, nav){
            // 关闭键盘
            dismissKeyboard();
            // 路由
            let navigator = nav ? nav : Constants.navigator;
            if (navigator) {
                let component = param['component'];
                param['passProps'] = param['passProps'] != null ? param['passProps'] : {};
                param['passProps']['navigator'] = navigator;
                navigator.resetTo({
                    component: component
                })
            }
        },
        push(param, nav) {
            // 关闭键盘
            dismissKeyboard();
            // 拦截器
            let navigator = nav ? nav : Constants.navigator;
            if (navigator && param && param['component'] && param['componentName']) {
                let component = param['component'];
                let componentName = param['componentName'];
                param['passProps'] = param['passProps'] != null ? param['passProps'] : {};
                param['passProps']['navigator'] = navigator;
                let result = this.verifyComponentTarget(componentName);
                if (result == 1) {
                    Handler.load(Constants.storageKeyIsLogin)
                        .then(isLogin=> {
                            if (isLogin) {
                                navigator.push({
                                    component: component,
                                    title: param['title'],
                                    passProps: param['passProps'],
                                    callback: param['callback'],
                                });
                            } else {
                                DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toLogin');
                            }
                        });
                } else if (result == 2) {
                    Handler.load(Constants.storageKeyIsLogin)
                        .then(isLogin=> {
                            if (isLogin) {
                                Handler.load(Constants.storageKeyIsPerfectInfo)
                                    .then(isPerfectInfo=> {
                                        if (isPerfectInfo) {
                                            navigator.push({
                                                component: component,
                                                title: param['title'],
                                                passProps: param['passProps'],
                                                callback: param['callback'],
                                            });
                                        } else {
                                            DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toPerfectInfo');
                                        }
                                    });
                            } else {
                                DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toLogin');
                            }
                        });
                } else if (result == 3) {
                    Handler.load(Constants.storageKeyIsLogin)
                        .then(isLogin=> {
                            if (isLogin) {
                                Handler.load(Constants.storageKeyIsPerfectInfo)
                                    .then(isPerfectInfo=> {
                                        if (isPerfectInfo) {
                                            Handler.load(Constants.storageKeyIsCertification)
                                                .then(isCertification=> {
                                                    if (isCertification) {
                                                        navigator.push({
                                                            component: component,
                                                            title: param['title'],
                                                            passProps: param['passProps'],
                                                            callback: param['callback'],
                                                        });
                                                    } else {
                                                        // 未提交认证的要跳转过去,已提交认证的,不能再去那个页面
                                                        Handler.load(Constants.storageKeyIsCertifying)
                                                            .then(isCertifying=> {
                                                                if (!isCertifying) {
                                                                    DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toCertification');
                                                                } else {
                                                                    DeviceEventEmitter.emit('HFPage', 'UserFilter', 'Certifying');
                                                                }
                                                            });
                                                    }
                                                });
                                        } else {
                                            DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toPerfectInfo');
                                        }
                                    });
                            } else {
                                DeviceEventEmitter.emit('HFPage', 'UserFilter', 'toLogin');
                            }
                        });
                } else {
                    navigator.push({
                        component: component,
                        title: param['title'],
                        passProps: param['passProps'],
                        callback: param['callback'],
                    });
                }
            } else {
                DeviceEventEmitter.emit('HFPage', 'UserFilter', 'Component');
            }
        },
        verifyComponentTarget(componentName) {
            if (FilterMap == null) {
                FilterMap = new Map();
                let list1 = Filter.toLogin;
                let list2 = Filter.toPerfectInfo;
                let list3 = Filter.toCertification;
                for (let i = 0; i < list1.length; i++) {
                    FilterMap.set(list1[i], 1);
                }
                for (let i = 0; i < list2.length; i++) {
                    FilterMap.set(list2[i], 2);
                }
                for (let i = 0; i < list3.length; i++) {
                    FilterMap.set(list3[i], 3);
                }
                return this.verifyComponentTarget(componentName);
            } else {
                let r = FilterMap.get(componentName);
                if (r != null) {
                    return r;
                }
            }
            return 0;
        }
    }
    ;
module.exports = Navigator;