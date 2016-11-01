/**
 * Created by shange on 2016/10/27. 网格视图
 */

'use strict';
import React, {Component} from 'react';
import {HFDataListView, HFBaseStyle, HFConfiguration, View, ScrollView, StyleSheet} from './../Framework';

class HFGridView extends Component {

    static defaultProps = {
        flagReadCache: false,// 是否读取缓存
        columnCount: 3,// 每行要显示的列数
        emptyImageSource: require('./../Image/no_history.png'),
        emptyImageWidthHeightRatio: 1080 / 551,// 空视图的宽高比,宽度由框架来控制,开发者只给出比例即可
    };

    static propTypes = {
        flagReadCache: React.PropTypes.bool,// 是否读取缓存
        fetchUrl: React.PropTypes.string.isRequired,// 请求的链接(必须)
        columnCount: React.PropTypes.number.isRequired,// 每行要显示的列数
        emptyImageWidthHeightRatio: React.PropTypes.number,// 空视图图片的宽高比
        // 视图
        renderRowView: React.PropTypes.func.isRequired,// 行视图(必须)
        renderEmptyView: React.PropTypes.func,// 空视图
    };

    render() {
        return (
            <HFDataListView
                flagNoSeparator={true}
                style={[styles.outerView,this.props.style]}
                contentContainerStyle={[styles.listView,this.props.style]}
                fetchUrl={this.props.fetchUrl}
                flagReadCache={this.props.flagReadCache}
                emptyImageSource={this.props.emptyImageSource}
                emptyImageWidthHeightRatio={this.props.emptyImageWidthHeightRatio}
                renderRowView={this.props.renderRowView}
                renderEmptyView={this.props.renderEmptyView}
            />
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    listView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

module.exports = HFGridView;