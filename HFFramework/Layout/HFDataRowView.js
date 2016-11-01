/**
 * Created by shange on 2016/11/01. 行视图
 */

'use strict';
import React, {Component} from 'react';
import {HFBaseStyle, HFConfiguration, HFImage, HFText, View, ScrollView, StyleSheet} from './../Framework';

class HFDataRowView extends Component {

    static defaultProps = {
        flexDirection: 'row',// row,column
        innerViewList: [],// 要显示的视图
    };

    static propTypes = {
        flexDirection: React.PropTypes.string,// 元素排列方式
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.outerView,{flexDirection:this.props.flexDirection},this.props.style]}>
                {
                    this.props.innerViewList.map((item, index) => {
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

module.exports = HFDataRowView;