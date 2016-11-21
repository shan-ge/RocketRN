/**
 * Created by chengzhencai on 16/8/8. 服务器请求地址
 */

var Service = {
    userId: '',//todo 登录后替换
    doctorId: '',//todo 登录后替换
    platform: '',
    token: '3e7b6d6db987492d8bc2e17c90ca8890',
    //公共
    uploadApp: '/uploadApp',//上传文件
    // 系统相关
    getNowDate: '/system/getNowDate',//获取系统时间,无需登录
    captcha: '/login/captcha',//获取图形验证码
    verifyCode: '/login/verifyCode',//发送验证码短信
    register: '/register/validateUsername',//注册
    login: '/login/passwordValidateLogin',//登录
    smsValidateForgetPassword: '/login/smsValidateForgetPassword',//忘记密码-校验短信验证码
    updatePassword: '/login/updatePassword',//忘记密码-更新密码
    changePassword: '/user/changePassword',// 更改密码
    agreement: '/system/doctorAgreement', // 用户协议
    //
    getAreaData: '/system/getAreaData',//区域
    syscodeList: '/system/syscodeList',//数据字典
    getVersionInfo: '/system/getVersionInfo',//检测版本号
    getHospitalList: '/hospital/listByCity',//区域->医院
    getHospitalDepartmentList: '/hospital/departmentListByHospital',//医院->科室
    // 医生相关
    saveInfo: '/doctor/perfectInfo', //完善信息
    certification: '/doctor/certification',//认证
    doctorMine: '/doctor/mine',//医生-》我的
    doctorHome: '/doctor/home',//医生-》首页
    getQRCode: '/doctor/getQRCode',//医生二维码
    updateSpecial:'/doctor/updateSpecial',//医生-》我的-》修改擅长
    updateInfo:'/doctor/updateInformation',//更新医生信息
    //患者相关
    patientList: '/patient/list',//患者列表
    patientInfo: '/patient/info',//患者基本信息
    insuranceOrderList: '/order/insuranceOrderList',//控喘服务患者列表
    //统计相关
    statMonthlyEvaluation: '/stat/monthlyEvaluation', //查询本月统计数据
    thisMonthlyEvaluationChart: '/stat/thisMonthlyEvaluationChart.hf', //请求本月统计柱形图
    monthlyEvaluationChart: '/stat/monthlyEvaluationChart.hf',//根据id请求月统计柱形图
    statMonthlyEvaluationList: '/stat/monthlyEvaluationList', //查询历史月评估列表
    statMonthlyEvaluationById: '/stat/monthlyEvaluationById', //根据id查询月统计柱形图页面
    /**
     * 电话咨询订单列表
     */
    orderList: '/order/phoneCallOrderList',//订单列表 传入参数：doctorId:医生id、productCategory:商品类型


};
module.exports = Service;
