/**
 * Created by chengzhencai on 16/8/8. 导航栏配置
 */
import React from 'react'
import {Navigator} from 'react-native'
const NavigatorConfig = {
    configureScene(route) {
        return Navigator.SceneConfigs.PushFromRight;
    },
    renderScene(route, navigator) {
        return <route.component navigator={navigator}  {...route.passProps} />;
    },
};
module.exports = NavigatorConfig;