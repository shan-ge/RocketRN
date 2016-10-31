/**
 * Created by shange on 16/8/10. 输入框 左侧label image图片模块
 *
 * 中型按钮,一般是[倒计时60s][重新发送]所使用
 *
 * this.props.disabled     : 按钮是否可用(true|false)
 * this.props.style        : 按钮样式
 * this.props.onPress      : 按钮事件
 * this.props.textStyle    : 按钮文字样式
 * this.props.text         : 按钮文字内容
 */

'use strict';
import React, {Component} from 'react';
import {HFText, HFConfiguration, HFBaseStyle, TouchableOpacity, StyleSheet} from './../Framework';

class HFMediumButton extends Component {

    static defaultProps = {
        fontSizeDiff: -3,
    };

    static propTypes = {
        fontSizeDiff: React.PropTypes.number,
    };

    render() {
        return (
            <TouchableOpacity ref={this.props.ref}
                              style={[styles.button,HFBaseStyle.button,this.props.disabled && styles.disabled,!(this.props.disabled) && styles.enabled,this.props.style]}
                              disabled={this.props.disabled?this.props.disabled:false}
                              underlayColor='white'
                              activeOpacity={0.4}
                              onPress={this.props.onPress}
            >
                <HFText text={this.props.text}
                        style={[styles.buttonText,HFBaseStyle.buttonText,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.props.fontSizeDiff},this.props.textStyle]}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: HFConfiguration.buttonMediumMarginTop,
        width: HFConfiguration.buttonMediumWidth,
        height: HFConfiguration.buttonMediumHeight,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        alignSelf: 'stretch',
        opacity: 30,
        justifyContent: 'center'
    },
    enabled: {
    },
    disabled: {
        backgroundColor: '#d9d9d9',
        borderColor: '#d9d9d9',
    },
    buttonText: {
        color: 'white',
        alignSelf: 'center'
    }
});

module.exports = HFMediumButton;