/**
 * Created by shange on 2016/08/10. 常量
 */
var Constants = {
    platform_ios: 2,
    platform_android: 1,
    version: '1.0.0',
    /////////
    navigator: null,
    /////////文件名
    fileHasShownGuide: 'hasShownGuide.txt',
    fileHasShownUpdateAppConfirm: 'hasShownUpdateAppConfirm.txt',
    /////////缓存的基础数据
    storageKeyPageId: 'pageId',// 当前正在显示中的HFPage的唯一编号
    storageKeyIsLogin: 'isLogin',// 是否已经登录
    storageKeyIsPerfectInfo: 'isPerfectInfo',// 是否已经完善信息
    storageKeyIsCertification: 'isCertification',// 是否已经认证
    storageKeyIsCertifying: 'isCertifying',// 是否在认证中
    storageKeyUserToken: 'loginUserToken',
    storageKeyUserInfo: 'loginUserInfo',
    storageKeyDoctorInfo: 'loginDoctorInfo',
    storageKeyDoctorCertify: 'loginDoctorCertify',
};
module.exports = Constants;