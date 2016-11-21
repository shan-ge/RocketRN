/**
 * Created by chengzhencai on 16/8/8.http请求数据
 *
 */
import React from 'react'
import {Platform, Alert, DeviceEventEmitter} from 'react-native';
import rnfb from 'react-native-fetch-blob';
import Toast from '@remobile/react-native-toast';

import Config from './../../Application/Common/Config';
import Service from './../../Application/Common/Service';
import Constants from './../../Application/Common/Constants';
import Handler from './Handler';
import Dialog from './Dialog';

var Linking = require("Linking");
var AppUpdateShowing = false;

function toQueryString(obj) {
    let result = obj ? Object.keys(obj).sort().map(function (key) {
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
    while (result.indexOf('&&') >= 0) {
        result = result.replace('&&', '&');
    }
    return result;
}
// 超时封装
function fetchTimeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject)
    })
}

var Api = {
    getParam(param){
        if (param == undefined || param == null) {
            param = {};
        }
        param.platform = Service.platform;
        param.userId = Service.userId;
        param.doctorId = Service.doctorId;
        param.token = Service.token;
        param.clientVersion = Constants.version;
        return param;
    },
    post(url, param, flagCache, expires){
        let self = this;
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: toQueryString(self.getParam(param))
        };
        if (flagCache) {
            return new Promise(function (resolve, reject) {
                let key = url + JSON.stringify(param);
                Handler.load(key)
                    .then(data=> {
                        if (data != null) {
                            resolve(data)
                        } else {
                            url = Config.host + url;
                            fetch(url, fetchOptions).then((res)=>res.json()).then(res=> {
                                if (res && res.status === 1) {
                                    Handler.save(key, res, expires || 1000 * 60 * 10);
                                }
                                Dialog.alertApiResponse(res);
                                resolve(res);
                            }).catch(e=> {
                                console.log(e);
                                resolve({status: 100, message: '网络连接失败'})
                            })
                        }
                    });
            });
        } else {
            url = Config.host + url;
            return fetch(url, fetchOptions).then((res)=>res.json()).then(res=> {
                Dialog.alertApiResponse(res);
                return res;
            }).catch(e=> {
                console.log(e);
                return {status: 100, message: '网络连接失败'}
            })
        }
    },
    get(url, param, flagCache, expires){
        let self = this;
        url = Config.host + url + '?' + toQueryString(self.getParam(param));
        if (flagCache) {
            return new Promise(function (resolve, reject) {
                Handler.load(url)
                    .then(data=> {
                        if (data != null) {
                            resolve(data)
                        } else {
                            fetch(url)
                                .then((res)=>res.json())
                                .then(res=> {
                                    if (res && res.status === 1) {
                                        Handler.save(url, res, expires || 1000 * 60 * 10);
                                    }
                                    Dialog.alertApiResponse(res);
                                    resolve(res);
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
                    Dialog.alertApiResponse(res);
                    return res;
                })
                .catch((e)=> {
                    console.log(e);
                    return {status: 100, message: '网络连接失败'}
                })
        }
    },
    upload(images, isAnnex){
        return new Promise(function (resolve, reject) {
            let files = images.map((item, index)=> {
                return {name: index + '', filename: index + '.png', data: rnfb.wrap(item.uri)}
            });
            let userId = Service.userId;
            files.push({name: 'drUserId', data: userId + ''});
            let option = {
                'Content-Type': 'multipart/form-data'
            };
            let param = Config.host + Service.uploadApp + '?drUserId=' + userId + '&id=' + Service.doctorId;
            if (isAnnex) {
                param += '&drHeadImage=1'
            }
            console.log('url', param);
            rnfb.fetch('POST', param, option, files).then(res=> {
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
};
module.exports = Api;