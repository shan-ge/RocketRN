/**
 * Created by shange on 16/9/2.
 *
 * 打印日志控件
 */

import Api from './Api';
import Service from './../../Application/Common/Service';

'use strict';
var Logger = {
    // debug
    debug(log){
        console.debug('[userId=' + Service.userId + ',doctorId=' + Service.doctorId + ']', log);
    },
    // info
    info(log){
        console.info('[userId=' + Service.userId + ',doctorId=' + Service.doctorId + ']', log);
    },
    // warn
    warn(log){
        console.warn('[userId=' + Service.userId + ',doctorId=' + Service.doctorId + ']', log);
    },
    // error
    error(log){
        console.error('[userId=' + Service.userId + ',doctorId=' + Service.doctorId + ']', log);
    },
    // report(logLevel:debug,info,warn,error,fatal)
    report(logLevel, log){
        //console.error('[userId=' + Service.userId + ',doctorId=' + Service.doctorId + ']', log);
        let param = {
            logLevel: logLevel,
            log: log
        };
    },
};
module.exports = Logger;