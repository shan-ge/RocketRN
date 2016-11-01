/**
 * Created by shange on 16/8/10. 常量
 */
var Constants = {
    platform_ios: 10,
    platform_android: 11,
    android_version:'1.0.0',
    ios_version:'1.0.0',
    /////////缓存的基础数据
    //融云
    storageKeyRongCloudToken: 'rongCloudToken',//融云的用户token
    storageKeyUnreadMessageCount: 'unreadMessageCount',//存在未读消息
    //其他
    storageKeyIsLogin: 'isLogin',
    storageKeyUserToken: 'loginUserToken',
    storageKeyPushAllowed: 'pushAllowed',
    storageKeyHasShownGuide: 'hasShownGuide',
    storageKeyHasShownPEFAlert: 'hasShownPEFAlert',
    storageKeyMdicineImageUrlPrefix: 'medicineImageUrlPrefix',
    storageKeyMedicineList: 'medicineList',
    storageKeyEmergencyMedicineList:'emergencyMedicineList',
    storageKeyCauseReason: 'causeReason',
    storageKeyMedicalRecordHospital: 'medicalRecordHospital',
    storageKeyMedicalRecordDoctor: 'medicalRecordDoctor',
    storageKeyMedicalRecordTreatmentTime: 'medicalRecordTreatmentTime',
    storageKeyAreaData: 'areaData',//服务-家庭医生列表-地区数据
    homeRefreshDate:'homeRefreshDate' //首页数据获取日期
};
module.exports = Constants;