/**
 * Created by chengzhencai on 16/8/8. 导航栏配置
 */
import React from 'react'
import {Navigator} from 'react-native'
const NavigatorConfig = {
    configureScene(route) {
        var conf = Navigator.SceneConfigs.PushFromRight;
        /*
        conf.gestures = {
            'jumpBack': {
                'isDetachable': false,
                'gestureDetectMovement': 2,
                'notMoving': 0.3,
                'directionRatio': 0.66,
                'snapVelocity': 2,
                'edgeHitWidth': 30,
                'stillCompletionRatio': 0.6,
                'fullDistance': 414,
                'direction': 'left-to-right'
            }
        };
        */
        return conf;
    },
    renderScene(route, navigator) {
        return <route.component navigator={navigator}  {...route.passProps}/>;
    },
};
module.exports = NavigatorConfig;