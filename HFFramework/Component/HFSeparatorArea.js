/**
 * Created by shange on 16/8/10. 高分隔区
 */

'use strict';
import React, {Component} from 'react';
import {HFView, HFConfiguration, StyleSheet} from './../Framework';

class HFSeparatorArea extends Component {
    render() {
        return (
            <HFView style={[styles.hr, this.props.style]}/>
        );
    }
}

const styles = StyleSheet.create({
    hr: {
        height: 10,
        alignSelf: 'stretch',
        backgroundColor: HFConfiguration.pageBackground,
    }
});

module.exports = HFSeparatorArea;