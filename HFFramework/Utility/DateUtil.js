/**
 * Created by shange on 16/8/20.
 *
 * 时间控件
 */

'use strict';
var DateUtil = {
    // yyyy-MM-dd
    getDateString(date){
        if (!date || date == null) {
            return null;
        }
        let dateStr = date.getFullYear() + '-' + ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
        return dateStr;
    },
    // MM.dd
    getDateString2(date){
        if (!date || date == null) {
            return null;
        }
        let dateStr = ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
        return dateStr;
    },
    // yyyy-MM-dd HH:mm:ss
    getDateTimeString(date){
        if (!date || date == null) {
            return null;
        }
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let timeStr = date.getFullYear() + '-' + ((date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()) + ' ' + (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute) + ':' + (second <= 9 ? '0' + second : second);
        return timeStr;
    },
    // yyyy-MM-dd => Date
    getDateByDateString(dateStr){
        if (dateStr != null && dateStr.length == 10) {
            dateStr = dateStr.replace('-', '/').replace('-', '/');
            return new Date(dateStr + ' 00:00:00');
        }
        return null;
    },
    // yyyy-MM-dd HH:mm:ss => Date
    getDateByDateTimeString(dateTimeStr){
        if (dateTimeStr != null && dateTimeStr.length == 19) {
            dateTimeStr = dateTimeStr.replace('-', '/').replace('-', '/');
            return new Date(dateTimeStr);
        }
        return null;
    },
    // HH:mm
    getTimeString(date){
        if (!date || date == null) {
            return null;
        }
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeStr = (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute);
        return timeStr;
    },
    // yyyy-MM-dd => yyyy年M月d日
    getDateChineseString(dateStr){
        if (!dateStr || dateStr == null) {
            return null;
        }
        let yyyy = dateStr.substring(0, 4);
        let mm = dateStr.substring(5, 7);
        let dd = dateStr.substring(8, 10);
        return yyyy + '年' + parseInt(mm) + '月' + parseInt(dd) + '日';
    },
    // yyyy-MM-dd => M月d日
    getDateChineseDayString(dateStr){
        if (!dateStr || dateStr == null) {
            return null;
        }
        let mm = dateStr.substring(5, 7);
        let dd = dateStr.substring(8, 10);
        return parseInt(mm) + '月' + parseInt(dd) + '日';
    },
    // 上午 HH:mm
    getTimeChineseString(date){
        if (!date || date == null) {
            return null;
        }
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let timeStr = (hour <= 4 ? '凌晨 ' : (hour <= 8 ? '早上 ' : (hour <= 11 ? '上午 ' : (hour <= 14 ? '中午 ' : (hour <= 17 ? '下午 ' : '晚上 '))))) + (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute);
        return timeStr;
    },
    // 上午 h:m => HH:mm
    getTimeStringFromChineseString(timeStr){
        if (!timeStr || timeStr == null) {
            return null;
        }
        let times = timeStr.substring(3).split(':');
        let hour = parseInt(times[0], 10);
        let minute = parseInt(times[1], 10);
        if (timeStr.indexOf('下午') >= 0) {
            hour += 12;
        }
        return (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute);
    },
    // h:m => HH:mm
    getTimeStringFromString(timeStr){
        if (!timeStr || timeStr == null) {
            return null;
        }
        let times = timeStr.split(':');
        let hour = parseInt(times[0], 10);
        let minute = parseInt(times[1], 10);
        return (hour <= 9 ? '0' + hour : hour) + ':' + (minute <= 9 ? '0' + minute : minute);
    },
    // yyyy-M-d => yyyy-MM-dd
    convertDateString(dateStr){
        if (dateStr == null || dateStr == '') {
            return null;
        }
        let dateStrs = dateStr.split('-');
        let m = parseInt(dateStrs[1]);
        let d = parseInt(dateStrs[2]);
        return dateStrs[0] + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    },
    // 获取星期几
    getWeekFrequency(numStr){
        if (numStr == undefined || numStr == '') {
            return '';
        }
        let frequency = '';
        if (numStr.indexOf('1') >= 0 && numStr.indexOf('2') >= 0 && numStr.indexOf('3') >= 0 && numStr.indexOf('4') >= 0 && numStr.indexOf('5') >= 0 && numStr.indexOf('6') >= 0 && numStr.indexOf('7') >= 0) {
            frequency = '每天';
        } else {
            if (numStr.indexOf('1') >= 0) {
                frequency += ',一';
            }
            if (numStr.indexOf('2') >= 0) {
                frequency += ',二';
            }
            if (numStr.indexOf('3') >= 0) {
                frequency += ',三';
            }
            if (numStr.indexOf('4') >= 0) {
                frequency += ',四';
            }
            if (numStr.indexOf('5') >= 0) {
                frequency += ',五';
            }
            if (numStr.indexOf('6') >= 0) {
                frequency += ',六';
            }
            if (numStr.indexOf('7') >= 0) {
                frequency += ',日';
            }
            frequency = frequency.length > 0 ? frequency.substring(1, frequency.length) : '无频率';
        }
        return frequency;
    },
    // 判断时间是否已经到达当前的时间范围.HH:mm => null/'error message' (eg.当前时间18:00,属于晚上,如果传入时间在晚上以后则返回Y)
    verifyTimeArrived(timeStr){
        if (timeStr == null || timeStr.length != 5) {
            return '时间格式不正确';
        }
        let hour = parseInt(timeStr.substring(0, 2), 10);
        let nowHour = (new Date()).getHours();
        if (hour >= 18 && hour <= 23) {
            if (nowHour < 18) {
                return '还没到晚上';
            }
        } else if (hour >= 15 && hour <= 17) {
            if (nowHour < 15) {
                return '还没到下午';
            }
        } else if (hour >= 12 && hour <= 14) {
            if (nowHour < 12) {
                return '还没到中午';
            }
        } else if (hour >= 9 && hour <= 11) {
            if (nowHour < 9) {
                return '还没到上午';
            }
        } else if (hour >= 5 && hour <= 8) {
            if (nowHour < 5) {
                return '还没到早上';
            }
        } else if (hour >= 0 && hour <= 4) {
            // 凌晨肯定到了
            //return '还没到凌晨';
        }
        return null;
    }
};
module.exports = DateUtil;