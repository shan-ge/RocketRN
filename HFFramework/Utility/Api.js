/**
 * Created by chengzhencai on 16/8/8.http请求数据
 * Updated by shange on 2016/10/25 新增方法
 *
 * 在后台交互时,会先查询缓存,然后查询后台.总共返回1~2次结果.
 */
import React from 'react'
import {
    Platform,
    Alert,
    DeviceEventEmitter
} from 'react-native';
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
    let result = obj ? Object.keys(obj).sort().map(function(key) {
        var val = obj[key];
        if (typeof val === 'undefined') {
            return null;
        }
        if (Array.isArray(val)) {
            return val.sort().map(function(val2) {
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
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject)
    })
}

var Api = {
    getParam(param) {
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
    /**
     * post 请求后台
     * 
     * @param  {string}         请求链接后缀
     * @param  {object}         请求的参数
     * @param  {Function}       回调函数
     * @param  {boolean}        是否不读取缓存
     */
    post(url, param, callback, flagNoCache) {
        if (!callback) {
            return false;
        }
        let self = this;
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: toQueryString(self.getParam(param))
        };
        url = Config.host + url;
        if (flagNoCache) {
            fetch(url, fetchOptions).then((res) => res.json()).then(res => {
                if (res && res.status === 1) {
                    Handler.save(key, res);
                }
                Dialog.alertApiResponse(res);
                // 2、查询成功，第二次调用回调方法
                callback(data);
            }).catch(e => {
                console.log(e);
                callback({
                    status: 100,
                    message: '网络连接失败'
                });
            })
        } else {
            let key = url + JSON.stringify(param);
            Handler.load(key)
                .then(data => {
                    if (data != null) {
                        // 1、如果缓存中有数据，第一次调用回调方法
                        callback(data);
                    }
                    fetch(url, fetchOptions).then((res) => res.json()).then(res => {
                        if (res && res.status === 1) {
                            Handler.save(key, res);
                        }
                        Dialog.alertApiResponse(res);
                        // 2、查询成功，第二次调用回调方法
                        callback(data);
                    }).catch(e => {
                        console.log(e);
                        callback({
                            status: 100,
                            message: '网络连接失败'
                        });
                    })
                });
        }
    },
    /**
     * get 请求后台
     * 
     * @param  {string}         请求链接后缀
     * @param  {object}         请求的参数
     * @param  {Function}       回调函数
     * @param  {boolean}        是否不读取缓存
     */
    get(url, param, callback, flagNoCache) {
        if (!callback) {
            return false;
        }
        let self = this;
        url = Config.host + url + '?' + toQueryString(self.getParam(param));
        if (flagNoCache) {
            fetch(url)
                .then((res) => res.json())
                .then(res => {
                    if (res && res.status === 1) {
                        Handler.save(url, res);
                    }
                    Dialog.alertApiResponse(res);
                    callback(data);
                })
                .catch((e) => {
                    console.log(e);
                    callback({
                        status: 100,
                        message: '网络连接失败'
                    });
                })
        } else {
            Handler.load(url)
                .then(data => {
                    if (data != null) {
                        callback(data);
                    }
                    fetch(url)
                        .then((res) => res.json())
                        .then(res => {
                            if (res && res.status === 1) {
                                Handler.save(url, res);
                            }
                            Dialog.alertApiResponse(res);
                            callback(data);
                        })
                        .catch((e) => {
                            console.log(e);
                            callback({
                                status: 100,
                                message: '网络连接失败'
                            });
                        })
                })
        }
    },
    upload(images, isAnnex) {
        return new Promise(function(resolve, reject) {
            let files = images.map((item, index) => {
                return {
                    name: index + '',
                    filename: index + '.png',
                    data: rnfb.wrap(item.uri)
                }
            });
            let userId = Service.userId;
            files.push({
                name: 'drUserId',
                data: userId + ''
            });
            let option = {
                'Content-Type': 'multipart/form-data'
            };
            let param = Config.host + Service.uploadApp + '?drUserId=' + userId + '&id=' + Service.doctorId;
            if (isAnnex) {
                param += '&drHeadImage=1'
            }
            console.log('url', param);
            rnfb.fetch('POST', param, option, files).then(res => {
                resolve(res.json());
            }).catch(e => {
                console.log(e);
                resolve({
                    status: 100,
                    message: '网络连接失败'
                })
            })
        })
    },
    getNowDate() {
        return new Promise(function(resolve, reject) {
            fetchTimeout(2000, fetch(Config.host + Service.getNowDate)).then(function(res) {
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
            }).catch(function(e) {
                resolve(new Date());
            })
        })
    },
    key: ''
};
module.exports = Api;