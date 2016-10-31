/**
 * Created by shange on 2016/10/24. 页眉
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, View, ScrollView, StyleSheet} from './../Framework';

class HFPageHeader extends Component {
    render() {
        return (
            <View ref='header' style={[styles.outerView, this.props.style]}>
                {this.props.innerView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
    },
});

module.exports = HFPageHeader;