/**
 * Created by shange on 16/8/10. 文字按钮,没有任何样式,看起来和普通文字一样
 */

'use strict';
import React, {Component} from 'react';
import {HFText, HFConfiguration, HFBaseStyle, TouchableOpacity, StyleSheet} from './../Framework';

import RenderIf from './../Utility/RenderIf';

class HFTextButton extends Component {

    static defaultProps = {
        disabled: false,
        fontSizeDiff: -3,
    };

    static propTypes = {
        disabled: React.PropTypes.bool,
        fontSizeDiff: React.PropTypes.number,
    };

    render() {
        return (
            <TouchableOpacity ref={this.props.ref}
                              style={[styles.button,this.props.style]}
                              underlayColor='white'
                              activeOpacity={0.4}
                              disabled={this.props.disabled}
                              onPress={this.props.onPress}
            >
                <HFText fontSizeDiff={this.props.fontSizeDiff}
                        text={this.props.text}
                        style={[styles.text,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.props.fontSizeDiff},this.props.disabled && styles.disabled,!(this.props.disabled) && styles.enabled,this.props.textStyle]}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        opacity: 30,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
    },
    enabled: {},
    disabled: {
        color: '#d9d9d9',
    },
    text: {
        alignSelf: 'center',
        color: HFConfiguration.textFontColor,
    },
});

module.exports = HFTextButton;