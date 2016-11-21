/**
 * Created by shange on 2016/11/11. 拦截器配置
 *
 * 一个页面可以既需要登录,又需要信息完整,还需要认证.此时,只需要配置toCertify即可,前面的两项会自动确认.
 */
var Filter = {
    // 要判断用户登录的页面
    toLogin: [
        //'Information',
        //'Safe',
        //'Good',
        //'AboutMine',
        //'BusinessCard',
        //'Share'
    ],
    // 要判断用户信息完整性的页面
    toPerfectInfo: [],
    // 要判断用户已认证的页面
    toCertification: ['BusinessCard'],
};
module.exports = Filter;