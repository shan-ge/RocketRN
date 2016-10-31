/**
 * Created by shange on 2016/10/24. 视图
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, View, StyleSheet} from './../Framework';

class HFView extends Component {
    render() {
        return (
            <View ref={this.props.ref} style={[styles.outerView,HFBaseStyle.view,this.props.style]}>
                {this.props.innerView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        alignSelf: 'stretch',
    },
});

module.exports = HFView;