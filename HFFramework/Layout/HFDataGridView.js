/**
 * Created by shange on 2016/10/27. 格子视图
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, View, ScrollView, StyleSheet} from './../Framework';

class HFGridView extends Component {
    render() {
        return (
            <View ref={this.props.ref||'gridView'} style={[styles.outerView,this.props.style]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
    },
});

module.exports = HFGridView;