/**
 * Created by chengzhencai on 16/8/8. 服务器请求地址
 */
var Service = {
    userId: '38862',//todo 登录后替换
    patientId: '957',//todo 登录后替换
    token: '',
    static: 'http://static.hf.com',
    getNowDate: '/system/getNowDate',//获取系统时间,无需登录
};
module.exports = Service;
