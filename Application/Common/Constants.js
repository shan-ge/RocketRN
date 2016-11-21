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
    storageKeyUserToken: 'loginUserToken',
    storageKeyUserInfo: 'loginUserInfo',
};
module.exports = Constants;