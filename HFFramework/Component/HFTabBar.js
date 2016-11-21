/**
 * Created by zhang on 2016/8/19.
 */

'use strict';
import React, {Component} from 'react';
import {
    HFConfiguration,
    HFImage,
    HFText,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    StyleSheet,
} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFTabBar extends Component {

    static defaultProps = {
        tabIconSize: 30,
    };

    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合
        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            IconStyle: [
                {width: this.props.tabIconSize, height: this.props.tabIconSize},
                {width: this.props.tabIconSize, height: this.props.tabIconSize},
                {width: this.props.tabIconSize, height: this.props.tabIconSize},
                {width: this.props.tabIconSize, height: 30}],
            tabIconSource: this.props.tabIcons,
            activeTabIconSource: this.props.tabActiveIcons
        }
    }

    componentWillMount() {
        // 一级页面绝对禁止有输入,否则会导致KeyboardSpacer的样式出错.下面的方法可以避免,但是可能导致TabBar无法被唤醒
        /*
         var self = this;
        this.hfHomeListener = DeviceEventEmitter.addListener('HFTabBar', function (type, value) {
            if (self.refs.hfTabBar && type == 'HFKeyboardSpacer') {
                self.setState({visible: value});
            }
        })
        */
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    componentWillUnMount() {
        /*
        if (this.hfHomeListener) {
            this.hfHomeListener.remove();
        }
        */
    }

    setAnimationValue({value}) {

    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? HFConfiguration.mainColor : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity
                ref="hfTabBar"
                key={'tabBar_' + i}
                onPress={()=>this.props.goToPage(i)}
                style={styles.tab}
                activeOpacity={1}
            >
                <View style={styles.tabItem}>
                    <HFImage
                        flagNoLoading={true}
                        style={[this.state.IconStyle[i],{marginTop:1}]}
                        source={this.props.activeTab == i ? this.state.activeTabIconSource[i]: this.state.tabIconSource[i] }
                    />
                    <HFText fontSizeDiff={-4} style={{color:color,marginTop:4}} text={this.props.tabNames[i]}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                {RenderIf(this.state.visible)(
                    <View style={styles.tabs}>
                        {this.props.tabNames.map((tab, i) => this.renderTabOption(tab, i))}
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: HFConfiguration.bottomTabHeight[HFConfiguration.dpiIndex],
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});

module.exports = HFTabBar;