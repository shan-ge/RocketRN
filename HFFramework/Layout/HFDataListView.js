/**
 * Created by shange on 2016/10/27. 列表视图
 * 关键词:普通列表,下拉刷新,一次完全加载
 */

'use strict';
import React, {Component} from 'react';
import {HFSeparator, HFBaseStyle, HFConfiguration, HFImage, HFImageButton, HFDataEmptyView, View, ListView, ScrollView, RefreshControl, DeviceEventEmitter, TouchableOpacity, StyleSheet} from './../Framework';

import Toast from '@remobile/react-native-toast';

import Api from './../Utility/Api';
import RenderIf from './../Utility/RenderIf';

class HFDataListView extends Component {

    static defaultProps = {
        flagReadCache: false,// 是否读取缓存
        emptyImageSource: require('./../Image/no_history.png'),
        emptyImageWidthHeightRatio: 1080 / 551,// 空视图的宽高比,宽度由框架来控制,开发者只给出比例即可
    };

    static propTypes = {
        flagReadCache: React.PropTypes.bool,// 是否读取缓存
        fetchUrl: React.PropTypes.string.isRequired,// 请求的链接(必须)
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
            ds: ds,
            allDatas: allDatas,
            dataSource: ds.cloneWithRows(allDatas),
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        var self = this;
        return new Promise(function (resolve, reject) {
            var fetchUrl = self.props.fetchUrl;
            Api.get(fetchUrl, self.props.fetchParam, self.props.flagReadCache)
                .then(res => {
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
                    resolve();
                }).catch(e => {
                Toast.showShortCenter('加载列表失败!');
                resolve();
            })
        });
    }

    renderRowView(event, dataRow, sectionID, rowID, key) {
        if (dataRow == null) {
            return null;
        }
        if (this.props.renderRowView) {
            return this.props.renderRowView(event, dataRow, sectionID, rowID, key);
        } else {
            return null;
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
                        style={styles.outerView}
                        contentContainerStyle={this.props.contentContainerStyle}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(dataRow, sectionID, rowID)=>this.renderRowView(this, dataRow, sectionID, rowID, 'dataRow_' + rowID)}
                        renderSeparator={(sectionID, rowID)=>this.renderDataRowSeparator(this,'separator'+'_'+rowID)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.fetchData.bind(this)}
                                title="重新加载"
                                titleColor={HFConfiguration.mainColor}
                                tintColor={HFConfiguration.mainColor}
                                colors={[HFConfiguration.mainColor]}
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
});

module.exports = HFDataListView;