/**
 * Created by shange on 2016/10/24. 标题H1,H2,H3,H4,H5,H6
 *
 * H4和默认字体一样大.
 */

'use strict';
import React, {Component} from 'react';
import {HFText, HFBaseStyle, HFConfiguration, StyleSheet} from './../Framework';

class HFHeading extends Component {

    static propTypes = {
        level: React.PropTypes.number,
    };

    static defaultProps = {
        level: 3,
        text: '标题',
    };

    constructor(props) {
        super(props);
    }

    render() {
        let headingFontSize = HFConfiguration.textFontSize[HFConfiguration.dpiIndex] + (8 - this.props.level * 2);
        return (
            <HFText numberOfLines={this.props.numberOfLines} style={[styles.heading,this.props.style,{fontSize:headingFontSize}]} text={this.props.text}/>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontWeight: '600',
        color: HFConfiguration.mainColor,
    },
});

module.exports = HFHeading;