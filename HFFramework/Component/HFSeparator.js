/**
 * Created by shange on 16/8/10. 输入框 左侧label image图片模块
 *
 * 行元素,相当于<hr/>
 */

'use strict';
import React, {Component} from 'react';
import {HFView, HFConfiguration, StyleSheet} from './../Framework';

class HFSeparator extends Component {
    render() {
        return (
            <HFView ref={this.props.ref} style={[styles.hr, this.props.style]}/>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 0.7,
        alignSelf: 'stretch',
        backgroundColor: HFConfiguration.viewHorizontalRowColor,
    }
});

module.exports = HFSeparator;