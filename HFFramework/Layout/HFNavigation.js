/**
 * Created by shange on 2016/10/24. 导航
 *
 * title                :   ''              标题
 *
 * flagLeft             :   {true|false}    是否显示左侧按钮
 * leftText             :   ''              左侧按钮文字
 * leftImageSource      :   {require()}     左侧按钮显示图片
 * onLeftButtonPress    :   {()=>{}}        左侧按钮点击事件
 * leftDisabled         :   {true|false}    左侧按钮是否可用
 *
 * flagRight            :   {true|false}    是否显示右侧按钮
 * rightText            :   ''              右侧按钮文字
 * rightImageSource     :   {require()}     右侧按钮显示图片
 * onRightButtonPress   :   {()=>{}}        右侧按钮点击事件
 * rightDisabled        :   {true|false}    右侧按钮是否可用
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, HFText, HFImage, View, TouchableOpacity, StyleSheet} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFNavigation extends Component {

    static defaultProps = {
        flagLeft: false,
        flagRight: false,
    };

    static propTypes = {
        flagLeft: React.PropTypes.bool,
        leftDisabled: React.PropTypes.bool,
        flagRight: React.PropTypes.bool,
        rightDisabled: React.PropTypes.bool,
        leftText: React.PropTypes.string,
        rightText: React.PropTypes.string,
        onLeftButtonPress: React.PropTypes.func,
        onRightButtonPress: React.PropTypes.func
    };

    onLeftButtonPress() {
        if (this.props.onLeftButtonPress) {
            this.props.onLeftButtonPress();
        } else {
            if (this.props.navigator) {
                // 没用pop,是为了防止setState时报警
                // NavigatorConfig.js
                this.props.navigator.jumpBack();
            }
        }
    }

    render() {
        return (
            <View ref='navigation' style={[styles.content,HFBaseStyle.navigation]}>
                {RenderIf(this.props.flagLeft)(
                    <TouchableOpacity
                        style={styles.left}
                        disabled={this.props.leftDisabled}
                        onPress={this.onLeftButtonPress.bind(this)}
                    >
                        {RenderIf(this.props.leftImageSource == null && this.props.leftText == null)(
                            <HFImage source={require('./../Image/Icon/left.png')}
                                     style={[styles.image,HFBaseStyle.navigationImage]}/>
                        )}
                        {RenderIf(this.props.leftImageSource != null)(
                            <HFImage source={this.props.leftImageSource}
                                     style={[styles.image,HFBaseStyle.navigationImage]}/>
                        )}
                        {RenderIf(this.props.leftText != null)(
                            <HFText style={[styles.text,HFBaseStyle.navigationText]} text={this.props.leftText}/>
                        )}
                    </TouchableOpacity>
                )}
                {RenderIf(!this.props.flagLeft)(
                    <View style={styles.left}></View>
                )}
                <View style={styles.title}>
                    <HFText style={[styles.text,HFBaseStyle.navigationText]} text={this.props.title}/>
                </View>
                {RenderIf(this.props.flagRight)(
                    <TouchableOpacity
                        style={styles.right}
                        disabled={this.props.rightDisabled}
                        onPress={this.props.onRightButtonPress!=null?this.props.onRightButtonPress.bind(this):()=>{}}
                    >
                        {RenderIf(this.props.rightImageSource != null)(
                            <HFImage source={this.props.rightImageSource}
                                     style={[styles.image,HFBaseStyle.navigationImage]}/>
                        )}
                        {RenderIf(this.props.rightText != null)(
                            <HFText style={[styles.text,HFBaseStyle.navigationText]} text={this.props.rightText}/>
                        )}
                    </TouchableOpacity>
                )}
                {RenderIf(!this.props.flagRight)(
                    <View style={styles.right}></View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 16,
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 10,
    },
    title: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#ffffff',
    },
    image: {
        width: 25,
        height: 25,
        alignSelf: 'flex-start',
        marginRight: 5,
    }
});

module.exports = HFNavigation;