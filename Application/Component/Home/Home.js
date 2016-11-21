/**
 * Created by 陈登辉 on 2016/11/7. 首页
 *
 * 使用时,将本页面复制出去
 */

import React, {Component} from 'react';
import {View} from '../../../HFFramework/Framework';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import HFTabBar from './../../../HFFramework/Component/HFTabBar';
import Demo from './../../../HFFramework/Demo/Demo';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['工作站', '患者', '我的'],// 选项卡名
            tabIconSize: 25,
            tabIcons: [require('./../../Image/Icon/workstation1.png'), require('./../../Image/Icon/patient1.png'), require('./../../Image/Icon/mine1.png')],// 图标(未激活)
            tabActiveIcons: [require('./../../Image/Icon/workstation2.png'), require('./../../Image/Icon/patient2.png'), require('./../../Image/Icon/mine2.png')],// 图标(激活)
        };
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconSize = this.state.tabIconSize;
        let tabIcons = this.state.tabIcons;
        let tabActiveIcons = this.state.tabActiveIcons;

        const {navigator} = this.props;
        return (
            <View style={{flex:1, alignSelf:'stretch'}}>
                <ScrollableTabView
                    renderTabBar={() => <HFTabBar tabNames={tabNames} tabIconSize={tabIconSize} tabIcons={tabIcons} tabActiveIcons={tabActiveIcons}/>}
                    tabBarPosition='bottom'
                >
                    <Demo navigator={navigator}/>
                    <Demo navigator={navigator}/>
                    <Demo navigator={navigator}/>
                </ScrollableTabView>
            </View>
        );
    }
}
;

module.exports = Home;