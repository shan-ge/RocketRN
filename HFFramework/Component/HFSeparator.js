/**
 * Created by shange on 16/8/10. 分隔线
 *
 * 行元素,相当于<hr/>
 */

'use strict';
import React, {Component} from 'react';
import {HFView, HFConfiguration, StyleSheet} from './../Framework';

class HFSeparator extends Component {
    render() {
        return (
            <HFView style={[styles.hr, this.props.style]}/>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 0.7,
        alignSelf: 'stretch',
        backgroundColor: HFConfiguration.separatorLineColor,
    }
});

module.exports = HFSeparator;