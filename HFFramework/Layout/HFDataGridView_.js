/**
 * Created by shange on 2016/10/27. 网格视图
 */

'use strict';
import React, {Component} from 'react';
import {HFDataListView, HFBaseStyle, HFConfiguration, View, ScrollView, StyleSheet} from './../Framework';

var TimerIndex, TimerCount = 0;
class HFDataGridView extends Component {

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

    constructor(props) {
        super(props);
        //
        let columnCount = this.props.columnCount;
        let width = HFConfiguration.windowWidth;
        let w = Math.floor(width / columnCount) - 1;
        this.state = {
            gridRowWidth: w,
        }
    }

    componentWillMount() {
        if (TimerIndex) {
            clearInterval(TimerIndex);
        }
        TimerCount = 0;
        TimerIndex = setInterval(() => {
            // 如果不在这个页面了,这个值就是undefined
            if (TimerCount <= 9) {
                TimerCount++;
                if (this.refs.dataGridView) {
                    this.setState({
                        gridRowWidth: this.state.gridRowWidth + (TimerCount % 2 == 0 ? 100 : -100)
                    });
                }
            } else {
                if (TimerIndex) {
                    clearInterval(TimerIndex);
                }
            }
        }, 1000);
    }

    componentWillUnMount() {
        if (TimerIndex) {
            clearInterval(TimerIndex);
        }
    }

    render() {
        return (
            <HFDataListView
                ref="dataGridView"
                flagNoSeparator={true}
                style={[styles.outerView,this.props.style]}
                contentContainerStyle={[styles.listView,this.props.style]}
                dataGridRowStyle={[styles.dataGridRowStyle,{width:this.state.gridRowWidth},this.props.dataGridRowStyle]}
                gridRowWidth={this.state.gridRowWidth}
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    dataGridRowStyle: {
        margin: 0.5,
    }
});

module.exports = HFDataGridView;