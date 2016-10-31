/**
 * Created by shange on 2016/10/24. 文本
 *
 * fontSizeDiff:
 * 按照配置的字体大小的偏移量.比如配置的字体大小等于14.
 * 例如,在HFParagraph中,比常规字体再小2号.即:fontSizeDiff={-2}
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, Text, StyleSheet} from './../Framework';

class HFText extends Component {
    static defaultProps = {
        fontSizeDiff: 0,
        numberOfLines: 0,
    };

    static propTypes = {
        fontSizeDiff: React.PropTypes.number,
        numberOfLines: React.PropTypes.number,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Text ref={this.props.ref}
                  allowFontScaling={HFConfiguration.textAllowFontScaling}
                  numberOfLines={this.props.numberOfLines}
                  style={[HFBaseStyle.text, {fontSize:HFConfiguration.mainFontSize + this.props.fontSizeDiff}, this.props.style]}>
                {this.props.text}
            </Text>
        );
    }
}

const styles = StyleSheet.create({});

module.exports = HFText;