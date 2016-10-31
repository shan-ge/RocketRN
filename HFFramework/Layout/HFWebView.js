/**
 * Created by shange on 2016/10/27. 网页视图
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, View, ListView, StyleSheet} from './../Framework';

class HFWebView extends Component {
    render() {
        return (
            <View ref={this.props.ref||'list'} style={[styles.outerView,this.props.style]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
    },
});

module.exports = HFWebView;