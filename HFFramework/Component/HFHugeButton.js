/**
 * Created by shange on 16/8/10. 输入框 左侧label image图片模块
 *
 * 巨大按钮,一般是[下一步][提交]所使用
 *
 * this.props.disabled     : 按钮是否可用 (true|false)
 * this.props.style        : 按钮样式
 * this.props.onPress      : 按钮事件
 * this.props.textStyle    : 按钮文字样式
 * this.props.text         : 按钮文字内容
 */

'use strict';
import React, {Component} from 'react';
import {HFText, HFConfiguration, HFBaseStyle, TouchableOpacity, StyleSheet} from './../Framework';

class HFHugeButton extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.button,HFBaseStyle.button,this.props.disabled && styles.disabled,!(this.props.disabled) && styles.enabled,this.props.style]}
                              disabled={this.props.disabled?this.props.disabled:false}
                              underlayColor='white'
                              activeOpacity={0.4}
                              onPress={this.props.onPress}
            >
                <HFText style={[styles.buttonText,HFBaseStyle.buttonText,this.props.textStyle]} text={this.props.text}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: HFConfiguration.buttonHugeMarginTop,
        marginLeft: HFConfiguration.buttonHugeMarginLeftRight[HFConfiguration.dpiIndex],
        marginRight: HFConfiguration.buttonHugeMarginLeftRight[HFConfiguration.dpiIndex],
        height: HFConfiguration.buttonHugeHeight,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'stretch',
        opacity: 30,
        justifyContent: 'center'
    },
    enabled: {},
    disabled: {
        backgroundColor: '#d9d9d9',
        borderColor: '#d9d9d9',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    }
});

module.exports = HFHugeButton;