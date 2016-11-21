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
        numberOfLines: 1,
    };

    static propTypes = {
        disabled: React.PropTypes.bool,
        fontSizeDiff: React.PropTypes.number,
        numberOfLines: React.PropTypes.number,
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            disabled: newProps.disabled,
            fontSizeDiff: newProps.fontSizeDiff,
            text: newProps.text,
            numberOfLines: newProps.numberOfLines,
            onPress: newProps.onPress,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled,
            fontSizeDiff: this.props.fontSizeDiff,
            text: this.props.text,
            numberOfLines: this.props.numberOfLines,
            onPress: this.props.onPress,
        };
    }

    render() {
        return (
            <TouchableOpacity style={[styles.button,this.props.style]}
                              underlayColor='white'
                              activeOpacity={0.4}
                              disabled={this.state.disabled}
                              onPress={this.state.onPress}
            >
                <HFText fontSizeDiff={this.state.fontSizeDiff}
                        text={this.state.text}
                        numberOfLines={this.state.numberOfLines}
                        style={[styles.text,{fontSize:HFConfiguration.buttonFontSize[HFConfiguration.dpiIndex] + this.state.fontSizeDiff},this.state.disabled && styles.disabled,!(this.state.disabled) && styles.enabled,this.props.textStyle]}
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