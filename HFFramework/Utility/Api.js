/**
 * Created by chengzhencai on 16/8/8.http请求数据
 *
 */
import React from 'react'
import {Platform, Alert} from 'react-native';
import rnfb from 'react-native-fetch-blob';
import Toast from '@remobile/react-native-toast';

import Config from './Config';
import Service from './Service';
import Constants from './Constants';
import Handler from './Handler';
import DateUtil from './DateUtil';

var Linking = require("Linking");
var AppUpdateShowing = false;

function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (typeof val === 'undefined') {
            return null;
        }
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
// 超时封装
function fetchTimeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

var Api = {
        getParam(param){
            if (!param)
                param = {};
            param.platform = Service.platform;
            param.userId = Service.userId;
            param.patientId = Service.patientId;
            param.token = Service.token;
            param.clientVersion = Platform.ios === 'ios' ? Constants.android_version : Constants.ios_version;
            return param;
        },
        post(url, data, flagCache, expires){
            let self = this;
            var fetchOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: toQueryString(self.getParam(data))
            };
            if (flagCache != undefined && flagCache != null && flagCache) {
                return new Promise(function (resolve, reject) {
                    let key = url + JSON.stringify(data);
                    Handler.load(key)
                        .then(data=> {
                            if (data) {
                                resolve(data)
                            } else {
                                url = Config.host + url;
                                fetch(url, fetchOptions).then((res)=>res.json()).then(res=> {
                                    if (res && res.status === 1) {
                                        Handler.save(key, res, expires || 1000 * 60 * 10);
                                    }
                                    if (res.status >= 1000) {
                                        Handler.removeAll();
                                        Handler.save('isLogin', false);
                                        //Toast.showShortCenter(res['message']);
                                        if (res.status >= 1000 && res.status <= 1003) {
                                            this.checkAppUpdate(res['message']);
                                        }
                                    }
                                    resolve(res)
                                }).catch(e=> {
                                    console.log(e);
                                    resolve({status: 100, message: '网络连接失败'})
                                })
                            }
                        });
                });
            } else {
                url = Config.host + url;
                return fetch(url, fetchOptions).then(res=> {
                    return res;
                }).then((res)=>res.json()).then(res=> {
                    if (res.status >= 1000) {
                        Handler.removeAll();
                        Handler.save('isLogin', false);
                        if (res.status >= 1000 && res.status <= 1003) {
                            this.checkAppUpdate(res['message']);
                        }
                    }
                    return res;
                }).catch(e=> {
                    console.log(e);
                    return {status: 100, message: '网络连接失败'}
                })
            }
        },
        get(url, data, flagCache, expires){
            let self = this;
            url = Config.host + url + '?' + toQueryString(self.getParam(data));
            if (flagCache != undefined && flagCache != null && flagCache) {
                return new Promise(function (resolve, reject) {
                    Handler.load(url)
                        .then(data=> {
                            if (data) {
                                resolve(data)
                            } else {
                                fetch(url)
                                    .then((res)=>res.json())
                                    .then(res=> {
                                        if (res && res.status === 1) {
                                            Handler.save(url, res, expires || 1000 * 60 * 10);
                                        }
                                        if (res.status >= 1000) {
                                            Handler.removeAll();
                                            Handler.save('isLogin', false);
                                            //Toast.showShortCenter(res['message']);
                                            if (res.status >= 1000 && res.status <= 1003) {
                                                this.checkAppUpdate(res['message']);
                                            }
                                        }
                                        resolve(res)
                                    })
                                    .catch((e)=> {
                                        console.log(e);
                                        resolve({status: 100, message: '网络连接失败'})
                                    })
                            }
                        })
                })
            } else {
                return fetch(url).then((res)=>res.json())
                    .then(res=> {
                        if (res.status >= 1000) {
                            Handler.removeAll();
                            Handler.save('isLogin', false);
                            //Toast.showShortCenter(res['message']);
                            if (res.status >= 1000 && res.status <= 1003) {
                                this.checkAppUpdate(res['message']);
                            }
                        }
                        return res;
                    })
                    .catch((e)=> {
                        console.log(e);
                        return {status: 100, message: '网络连接失败'}
                    })
            }
        },
        upload(images){
            return new Promise(function (resolve, reject) {
                let files = images.map((item, index)=> {
                    return {name: index + '', filename: index + '.png', data: rnfb.wrap(item.uri)}
                });
                let userId = Service.userId;
                files.push({name: 'userId', data: userId + ''});
                let option = {
                    'Content-Type': 'multipart/form-data'
                };
                rnfb.fetch('POST', Config.host + Service.uploadApp + '?userId=' + userId, option, files).then(res=> {
                    resolve(res.json());
                }).catch(e=> {
                    console.log(e);
                    resolve({status: 100, message: '网络连接失败'})
                })
            })
        },
        getNowDate(){
            return new Promise(function (resolve, reject) {
                fetchTimeout(2000, fetch(Config.host + Service.getNowDate)).then(function (res) {
                    if (res != null && res['status'] == 200 && res['_bodyText'] != null) {
                        let bodyText = res['_bodyText'];
                        let r = JSON.parse(bodyText);
                        if (r != null && r['status'] == 1) {
                            resolve(new Date(r['data'].replace('-', '/').replace('-', '/')));
                        } else {
                            resolve(new Date());
                        }
                    } else {
                        resolve(new Date());
                    }
                }).catch(function (e) {
                    resolve(new Date());
                })
            })
        },
        checkAppUpdate(message){
            if (!AppUpdateShowing) {
                AppUpdateShowing = true;
                Alert.alert('提示', message || '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {
                        text: '确定', onPress: ()=> {
                        AppUpdateShowing = false;
                        if (Platform.OS === 'ios') {
                            let url = 'itmss://itunes.apple.com/app/id1146391680?mt=8';
                            Linking.canOpenURL(url).then(supported => {
                                if (!supported) {
                                    return Linking.openURL('http://static.houfadoc.com/share/');
                                } else {
                                    return Linking.openURL(url);
                                }
                            }).catch(err => console.error('An error occurred', err));
                        } else {
                            let url = 'market://search?q=呼遇';
                            Linking.canOpenURL(url).then(supported => {
                                if (!supported) {
                                    return Linking.openURL('http://static.houfadoc.com/share/');
                                } else {
                                    return Linking.openURL(url);
                                }
                            }).catch(err => console.error('An error occurred', err));
                        }
                    }
                    },
                ]);
            }
        },
        key: ''
    }
    ;
module.exports = Api;