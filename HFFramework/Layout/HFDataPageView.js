/**
 * Created by shange on 2016/10/27. 分页列表视图
 * 功能:分页列表,下拉刷新,加载更多
 */

'use strict';
import React, {Component} from 'react';
import {HFSeparator, HFBaseStyle, HFConfiguration, HFImage, HFImageButton, View, ListView, DeviceEventEmitter, TouchableOpacity, StyleSheet} from './../Framework';

import Toast from '@remobile/react-native-toast';
import GiftedListView from 'react-native-gifted-listview';

import Api from './../Utility/Api';
import RenderIf from './../Utility/RenderIf';

var self;
class HFDataPageView extends Component {

    static defaultProps = {
        flagReadCache: false,// 是否读取缓存
        flagNoSeparator: false,// 是否隐藏分割线
        emptyImageSource: require('./../Image/no_history.png'),
        emptyImageWidthHeightRatio: 1080 / 551,
    };

    static propTypes = {
        flagReadCache: React.PropTypes.bool,// 是否读取缓存
        flagNoSeparator: React.PropTypes.bool,// 是否隐藏分割线
        fetchUrl: React.PropTypes.string.isRequired,// 请求的链接(必须)
        emptyImageWidthHeightRatio: React.PropTypes.number,// 空视图图片的宽高比
        // 视图
        renderRowView: React.PropTypes.func.isRequired,// 行视图(必须)
        renderEmptyView: React.PropTypes.func,// 空视图
    };

    constructor(props) {
        super(props);
        this.state = {
            hasMoreData: false
        };
        self = this;
    }

    fetchData(page = 1, callback, options) {
        var fetchUrl = self.props.fetchUrl;
        if (page == 1) {
            DeviceEventEmitter.emit('HFDataPageView', 'hasMoreData', true);
        }
        Api.get(fetchUrl, {pageNumber: page}, self.props.flagReadCache)
            .then(res => {
                if (res && res['status'] == 1) {
                    let allDatas = res['data'];
                    if (allDatas['pages'] != null && parseInt(allDatas['pages']) <= page) {
                        DeviceEventEmitter.emit('HFDataPageView', 'hasMoreData', false);
                    } else if (allDatas['pageNum'] != null && allDatas['pageNum'] < page) {
                        if (page > 1) {
                            DeviceEventEmitter.emit('HFDataPageView', 'hasMoreData', false);
                        }
                        callback([]);
                        return false;
                    }
                    if (allDatas && allDatas['list'] != null && allDatas['list'].length > 0) {
                        callback(allDatas['list']);
                    } else {
                        callback([]);
                    }
                } else if (res && res['status'] == 0) {
                    callback([]);
                } else {
                    Toast.showShortCenter('未能加载列表,' + res['message']);
                    callback([]);
                }
            }).catch(e => {
            Toast.showShortCenter('加载列表失败!');
            callback([]);
        })
    }

    renderRowView(event, dataRow, sectionID, rowID, key) {
        if (dataRow == null) {
            return null;
        }
        if (this.props.renderRowView) {
            return this.props.renderRowView();
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
            <View ref={this.props.ref||'dataPageView'} style={[styles.outerView,this.props.style]}>
                <GiftedListView
                    ref="giftedListView"
                    style={styles.outerView}
                    enableEmptySections={true}
                    renderSeparator={(sectionID,rowID)=>this.renderDataRowSeparator(this,'separator'+'_'+rowID)}
                    rowView={(dataRow, sectionID, rowID)=>this.renderRowView(this, dataRow, sectionID, rowID, 'dataRow_' + rowID)}
                    onFetch={this.fetchData}
                    firstLoader={true}
                    pagination={true}
                    refreshable={true}
                    withSections={false}
                    refreshableTitle="重新加载"
                    refreshableTintColor={HFConfiguration.mainColor}
                    refreshableProgressBackgroundColor={HFConfiguration.mainColor}
                    refreshableColors={[HFConfiguration.mainColor]}
                    emptyView={(refreshCallback)=>{
                        if(this.props.renderEmptyView){
                            return this.props.renderEmptyView;
                        }else{
                            let w = HFConfiguration.windowWidth;
                            let h = parseInt(HFConfiguration.windowWidth / this.props.emptyImageWidthHeightRatio);
                            let pt = (HFConfiguration.windowHeight - h - 100) / 3;
                            pt = pt > 0 ? pt : 0;
                            return (
                                <View style={[styles.outerView,{alignItems:'center',justifyContent:'center',paddingTop:pt}]}>
                                    <TouchableOpacity onPress={refreshCallback}>
                                        <HFImage source={this.props.emptyImageSource} style={{width:w,height:h}}/>
                                    </TouchableOpacity>
                                </View>
                            );
                        }
                    }}
                    paginationWaitingView={(paginateCallback) => {
                        return (
                            <View>
                                {RenderIf(this.state.hasMoreData)(
                                <HFHugeButton
                                    style={{margin:0,marginBottom:30,borderRadius:0,borderWidth:0,backgroundColor:'#e4e4e4'}}
                                    textStyle={{color:HFConfiguration.textFontColor3}} onPress={paginateCallback} text='点击加载更多'/>
                                )}
                            </View>
                        )
                    }}
                />
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

module.exports = HFDataPageView;