/**
 * Created by shange on 2016/10/27. 列表视图
 * 关键词:普通列表,下拉刷新,一次完全加载
 */

'use strict';
import React, {Component} from 'react';
import {HFSeparator,
    HFBaseStyle,
    HFConfiguration,
    HFImage,
    HFImageButton,
    HFDataEmptyView,
    View,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity,
    StyleSheet} from './../Framework';

import Toast from '@remobile/react-native-toast';

import Api from './../Utility/Api';
import RenderIf from './../Utility/RenderIf';

var TimerIndex, TimerCount = 0;
class HFDataListView extends Component {

    static defaultProps = {
        emptyImageSource: require('./../Image/no_history.png'),
        emptyImageWidthHeightRatio: 1080 / 551,// 空视图的宽高比,宽度由框架来控制,开发者只给出比例即可
    };

    static propTypes = {
        // 下面两者必有其一
        fetchUrl: React.PropTypes.string,// 请求的链接
        fetchData: React.PropTypes.array,// 请求的数据
        //
        emptyImageWidthHeightRatio: React.PropTypes.number,// 空视图图片的宽高比
        // 视图
        renderRowView: React.PropTypes.func.isRequired,// 行视图(必须)
        renderEmptyView: React.PropTypes.func,// 空视图
    };

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let allDatas = [];
        this.state = {
            refreshing: false,
            hasMoreData: false,
            dataGridRowStyle: this.props.dataGridRowStyle,
            ds: ds,
            allDatas: allDatas,
            dataSource: ds.cloneWithRows(allDatas),
        };
    }

    componentWillMount() {
        // 请求数据
        this.fetchData();
        // 网格视图经测试经常无法正常渲染,由下面方法解决
        if (TimerIndex) {
            clearInterval(TimerIndex);
        }
        TimerCount = 0;
        TimerIndex = setInterval(() => {
            // 如果不在这个页面了,这个值就是undefined
            if (TimerCount < 9) {
                TimerCount++;
                if (this.refs.dataListView) {
                    this.refs.dataListView.scrollTo({
                        x: 0,
                        y: (TimerCount % 2 == 0 ? 0.5 : 0),
                        animated: true
                    });
                }
            } else {
                if (TimerIndex) {
                    clearInterval(TimerIndex);
                }
            }
        }, 10);
    }

    componentWillUnMount() {
        if (imerIndex) {
            clearInterval(TimerIndex);
        }
    }

    fetchData() {
        if (this.props.fetchUrl != null && this.props.fetchUrl != '') {
            var self = this;
            return new Promise(function (resolve, reject) {
                var fetchUrl = self.props.fetchUrl;
                Api.get(fetchUrl, self.props.fetchParam, function (res) {
                    alert(JSON.stringify(res))
                    if (res && res['status'] == 1) {
                        let allDatas = res['data'];
                        if (allDatas) {
                            let ds = self.state.ds;
                            self.setState({
                                allDatas: allDatas,
                                dataSource: ds.cloneWithRows(allDatas),
                            });
                        }
                    } else if (res && res['status'] == 0) {
                        Toast.showShortCenter('列表为空!');
                    } else {
                        Toast.showShortCenter('未能加载列表,' + res['message']);
                    }
                    if (self.refs.dataListView) {
                        self.refs.dataListView.scrollTo({
                            x: 0,
                            y: 0,
                            animated: true
                        });
                    }
                    resolve();
                }).catch(e => {
                    Toast.showShortCenter('加载列表失败!');
                    resolve();
                });
            });
        } else if (this.props.fetchData != null && this.props.fetchData.length > 0) {
            let ds = this.state.ds;
            let allDatas = this.props.fetchData;
            var self = this;
            return new Promise(function (resolve, reject) {
                self.setState({
                    allDatas: allDatas,
                    dataSource: ds.cloneWithRows(allDatas),
                });
                if (self.refs.dataListView) {
                    self.refs.dataListView.scrollTo({
                        x: 0,
                        y: 0,
                        animated: true
                    });
                }
                resolve();
            });
        } else {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    }

    renderRowView(event, dataRow, sectionID, rowID, key) {
        if (dataRow == null) {
            return <View key={key} style={[styles.innerView,this.state.dataGridRowStyle,{height:100}]}/>;
        }
        if (this.props.renderRowView) {
            return (
                <View key={key} style={[styles.innerView,this.state.dataGridRowStyle]}>
                    {this.props.renderRowView(event, dataRow, sectionID, rowID, key)}
                </View>
            );
        } else {
            return <View key={key} style={[styles.innerView,this.state.dataGridRowStyle,{height:100}]}/>;
        }
    }

    // 列表分割线
    renderDataRowSeparator(event, key) {
        if (this.props.flagNoSeparator) {
            return null;
        } else {
            return (
                <HFSeparator key={key} style={this.props.separatorStyle}/>
            )
        }
    }

    render() {
        return (
            <View style={[styles.outerView,this.props.style]}>
                {RenderIf(this.state.allDatas == null || this.state.allDatas.length == 0)(
                    <HFDataEmptyView
                        onRefresh={this.fetchData.bind(this)}
                        renderEmptyView={this.props.renderEmptyView}
                        emptyImageSource={this.props.emptyImageSource}
                        emptyImageWidthHeightRatio={this.props.emptyImageWidthHeightRatio}/>
                )}
                {RenderIf(this.state.allDatas != null && this.state.allDatas.length > 0)(
                    <ListView
                        ref="dataListView"
                        showsVerticalScrollIndicator={false}
                        style={styles.outerView}
                        contentContainerStyle={this.props.contentContainerStyle}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(dataRow, sectionID, rowID)=>this.renderRowView(this, dataRow, sectionID, rowID, 'dataRow_' + rowID)}
                        renderSeparator={(sectionID, rowID)=>this.renderDataRowSeparator(this,'separator_'+rowID)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.fetchData.bind(this)}
                                title="重新加载"
                                titleColor={'#cccccc'}
                                tintColor={'#cccccc'}
                                colors={['#cccccc']}
                            />
                        }
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    innerView: {}
});

module.exports = HFDataListView;