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
        numberOfLines: 1,
    };

    static propTypes = {
        disabled: React.PropTypes.bool,
        flagLeftText: React.PropTypes.bool,
        flagRightText: React.PropTypes.bool,
        leftText: React.PropTypes.string,
        rightText: React.PropTypes.string,
        fontSizeDiff: React.PropTypes.number,
        numberOfLines: React.PropTypes.number,
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            source: newProps.source,
            uri: newProps.uri,
            disabled: newProps.disabled,
            flagLeftText: newProps.flagLeftText,
            flagRightText: newProps.flagRightText,
            leftText: newProps.leftText,
            rightText: newProps.rightText,
            fontSizeDiff: newProps.fontSizeDiff,
            numberOfLines: newProps.numberOfLines,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            numberOfLines: this.props.numberOfLines,
            source: this.props.source,
            uri: this.props.uri,
            disabled: this.props.disabled,
            fontSizeDiff: this.props.fontSizeDiff,
            flagLeftText: this.props.flagLeftText,
            flagRightText: this.props.flagRightText,
            leftText: this.props.leftText,
            rightText: this.props.rightText,
            onPress: this.props.onPress,
        };
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.button,HFBaseStyle.button,this.state.disabled && styles.disabled,!(this.state.disabled) && styles.enabled,this.props.style]}
                underlayColor='white'
                activeOpacity={0.4}
                disabled={this.state.disabled}
                onPress={this.state.onPress}
            >
                {RenderIf(this.state.flagLeftText)(
                    <HFText fontSizeDiff={this.state.fontSizeDiff}
                            text={this.state.leftText}
                            numberOfLines={this.state.numberOfLines}
                            style={[styles.leftText,HFBaseStyle.buttonText,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.state.fontSizeDiff},this.props.leftTextStyle]}
                    />
                )}
                <HFImage
                    style={[styles.image, this.props.imageStyle]}
                    source={this.state.source}
                    uri={this.state.uri}
                />
                {RenderIf(this.state.flagRightText)(
                    <HFText fontSizeDiff={this.state.fontSizeDiff}
                            text={this.state.rightText}
                            numberOfLines={this.state.numberOfLines}
                            style={[styles.rightText,HFBaseStyle.buttonText,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.state.fontSizeDiff},this.props.rightTextStyle]}
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
    enabled: {},
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