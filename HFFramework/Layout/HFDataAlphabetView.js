/**
 * Created by shange on 2016/10/27. 索引列表视图
 * 关键词:有索引的列表,下拉刷新,一次完全加载
 */

'use strict';
import React, {Component} from 'react';
import {HFSeparator, HFBaseStyle, HFConfiguration, HFImage, HFImageButton, View, ListView, DeviceEventEmitter, TouchableOpacity, StyleSheet} from './../Framework';

import Toast from '@remobile/react-native-toast';
var AlphabetListView = require('react-native-alphabetlistview');

import Api from './../Utility/Api';
import RenderIf from './../Utility/RenderIf';

class HFDataAlphabetView extends Component {

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
        this.state = {
            hasMoreData: false,
            allDatas: [],
            queryDatas: [],
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        var fetchUrl = this.props.fetchUrl;
        Api.get(fetchUrl, this.props.fetchParam, this.props.flagReadCache)
            .then(res => {
                if (res && res['status'] == 1) {
                    let allDatas = res['data'];
                    if (allDatas) {
                        //
                        this.setState({
                            allDatas: allDatas,
                            queryDatas: allDatas,
                        });
                    }
                } else if (res && res['status'] == 0) {
                    Toast.showShortCenter('列表为空!');
                } else {
                    Toast.showShortCenter('加载列表失败!');
                }
            }).catch(e => {
            Toast.showShortCenter('加载列表失败!');
        })
    }

    renderRowView(event, dataRow, sectionID, rowID, key) {
        if (dataRow == null) {
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

    // 点击添加按钮
    handlerDataRowPress(event, dataRow) {

    }

    render() {
        return (
            <View ref={this.props.ref||'dataAlphabetView'} style={[styles.outerView,this.props.style]}>
                <AlphabetListView
                    ref="alphabetListView"
                    style={styles.outerView}
                    enableEmptySections={true}
                    data={this.state.queryDatas}
                    cell={Cell}
                    cellProps={{medicineImageUrlPrefix:this.state.medicineImageUrlPrefix,exceptMedicineIds: this.props.exceptMedicineIds}}
                    onCellSelect={(dataRow)=>{this.handlerDataRowPress(this,dataRow)}}
                    sectionListItem={SectionItem}
                    sectionHeader={SectionHeader}
                    cellHeight={80.25}
                    sectionHeaderHeight={0}
                />
            </View>
        );
    }
}

class SectionHeader extends Component {
    render() {
        return null;
    }
}

class SectionItem extends Component {
    render() {
        return (
            <Text
                style={{color:'#00cf92',textAlign:'right',height:HFConfiguration.windowHeight/26}}>{this.props.title}</Text>
        );
    }
}

class Cell extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    //
    handlerDataRowPress(event, dataRow) {
        const {onSelect} = this.props;
        if (onSelect) {
            onSelect(dataRow);
        }
    }

    render() {
        if (this.props.renderRowView) {
            return this.props.renderRowView();
        }
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
    },
});

module.exports = HFDataAlphabetView;