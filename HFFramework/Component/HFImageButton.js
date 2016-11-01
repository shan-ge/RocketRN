/**
 * Created by shange on 16/8/10. 图片按钮 左侧label image图片模块
 *
 * 图标按钮,一般是点击切换按钮图片所使用
 */

'use strict';
import React, {Component} from 'react';
import {HFImage, HFText, HFConfiguration, HFBaseStyle, TouchableOpacity, StyleSheet} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFImageButton extends Component {

    static defaultProps = {
        disabled: false,
        flagLeftText: false,
        flagRightText: false,
        fontSizeDiff: -3,
    };

    static propTypes = {
        disabled: React.PropTypes.bool,
        flagLeftText: React.PropTypes.bool,
        flagRightText: React.PropTypes.bool,
        leftText: React.PropTypes.string,
        rightText: React.PropTypes.string,
        fontSizeDiff: React.PropTypes.number,
    };

    render() {
        return (
            <TouchableOpacity ref={this.props.ref}
                              style={[styles.button,HFBaseStyle.button,this.props.disabled && styles.disabled,!(this.props.disabled) && styles.enabled,this.props.style]}
                              underlayColor='white'
                              activeOpacity={0.4}
                              disabled={this.props.disabled}
                              onPress={this.props.onPress}
            >
                {RenderIf(this.props.flagLeftText)(
                    <HFText fontSizeDiff={this.props.fontSizeDiff}
                            text={this.props.leftText}
                            style={[styles.leftText,HFBaseStyle.buttonText,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.props.fontSizeDiff},this.props.leftTextStyle]}
                    />
                )}
                <HFImage
                    style={[styles.image, this.props.imageStyle]}
                    source={this.props.source}
                />
                {RenderIf(this.props.flagRightText)(
                    <HFText fontSizeDiff={this.props.fontSizeDiff}
                            text={this.props.rightText}
                            style={[styles.rightText,HFBaseStyle.buttonText,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.props.fontSizeDiff},this.props.rightTextStyle]}
                    />
                )}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: HFConfiguration.buttonImageMarginTop,
        width: HFConfiguration.buttonImageWidth,
        height: HFConfiguration.buttonImageHeight,
        flexDirection: 'row',
        opacity: 30,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    enabled: {
    },
    disabled: {
        backgroundColor: '#d9d9d9',
        borderColor: '#d9d9d9',
    },
    image: {
        width: HFConfiguration.buttonImageHeight - 10,
        height: HFConfiguration.buttonImageHeight - 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftText: {
        alignSelf: 'center',
        marginRight: 5,
    },
    rightText: {
        alignSelf: 'center',
        marginLeft: 5,
    },
});

module.exports = HFImageButton;