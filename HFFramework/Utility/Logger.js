/**
 * Created by shange on 16/9/2.
 *
 * 打印日志控件
 */

import Api from './Api';
import Service from './Service';

'use strict';
var Logger = {
    // debug
    debug(log){
        console.debug('[userId=' + Service.userId + ',patientId=' + Service.patientId + ']', log);
    },
    // info
    info(log){
        console.info('[userId=' + Service.userId + ',patientId=' + Service.patientId + ']', log);
    },
    // warn
    warn(log){
        console.warn('[userId=' + Service.userId + ',patientId=' + Service.patientId + ']', log);
    },
    // error
    error(log){
        console.error('[userId=' + Service.userId + ',patientId=' + Service.patientId + ']', log);
    },
    // report(logLevel:debug,info,warn,error,fatal)
    report(logLevel, log){
        //console.error('[userId=' + Service.userId + ',patientId=' + Service.patientId + ']', log);
        // 向huyu汇报
        let param = {
            logLevel: logLevel,
            log: log
        };
        Api.post(Service.reportAppMessage, param)
            .then(res => {
            }).catch(e => {
        })
    },
};
module.exports = Logger;