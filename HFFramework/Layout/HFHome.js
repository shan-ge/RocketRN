/**
 * Created by shange on 2016/11/04. 首页
 *
 * 使用时,将本页面复制出去
 */

import React, {Component} from 'react';
import {View} from './../Framework';

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import HFTabBar from './../Component/HFTabBar';

import Demo from './../Demo/Demo';

class HFHome extends Component {

    static defaultProps = {
        tabNames: ['首页', '我的'],// 选项卡名
        tabIconSize: 30,
        tabIcons: [require('./../Demo/Image/class1.png'), require('./../Demo/Image/mine1.png')],// 图标(未激活)
        tabActiveIcons: [require('./../Demo/Image/class2.png'), require('./../Demo/Image/mine2.png')],// 图标(激活)
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let tabNames = this.props.tabNames;
        let tabIconSize = this.props.tabIconSize;
        let tabIcons = this.props.tabIcons;
        let tabActiveIcons = this.props.tabActiveIcons;

        let {navigator} = this.props;
        return (
            <View style={{flex:1,alignSelf:'stretch'}}>
                <ScrollableTabView
                    renderTabBar={() => <HFTabBar tabNames={tabNames} tabIconSize={tabIconSize} tabIcons={tabIcons} tabActiveIcons={tabActiveIcons}/>}
                    tabBarPosition='bottom'
                >
                    <Demo navigator={navigator}/>
                    <Demo navigator={navigator}/>
                </ScrollableTabView>
            </View>
        );
    }
}
;

module.exports = HFHome;