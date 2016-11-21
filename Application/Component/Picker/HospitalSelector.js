/**
 * Created by shange on 2016/11/05. 医院选择器
 */

'use strict';
import React, {Component} from 'react';
import {HFPage, HFMultiOptionPicker, HFImageButton, HFTextInput, HFConfiguration, TouchableOpacity, View, StyleSheet} from './../../../HFFramework/Framework';

import Toast from '@remobile/react-native-toast';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import RenderIf from './../../../HFFramework/Utility/RenderIf';
import Api from './../../../HFFramework/Utility/Api';

import Service from './../../Common/Service';

var navigationInnerViewHeight = HFConfiguration.navigationHeight[HFConfiguration.dpiIndex] - 38;
var ShowType = 1;// 0:地区,1:医院
class HospitalSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftText: '北京市',
            leftTextShort: '北京市',
            leftTextFull: '北京 / 北京市',
            navigationButtonViewJustifyContent: 'space-between',// 浮动类型
            navigationButtonViewWidth: 100,// 按钮宽度
            //
            flagTextInput: true,
            value: null,
            multiDatas: [],
            //
            areaMultiDatas: [],
            hosipitalMultiDatas: [],
            // 检索条件
            cityId: null,
            hospitalName: null,
            hospitalId: null,
            timerCount: 0,
        };
    }

    componentWillMount() {
        this.fetchArea();
        this.fetchHosipital();
    }

    fetchArea() {
        var self = this;
        return new Promise(function (resolve, reject) {
            Api.get(Service.getAreaData, {}, true)
                .then(res => {
                    if (res && res['status'] == 1) {
                        let allDatas = [];
                        let provinceData = {
                            flex: 1,
                            datas: res['data']['provinceList']
                        };
                        let cityData = {
                            flex: 2,
                            datas: res['data']['cityList']
                        };
                        allDatas.push(provinceData);
                        allDatas.push(cityData);
                        self.setState({
                            areaMultiDatas: allDatas,
                        });
                        if (ShowType == 0) {
                            self.setState({
                                multiDatas: allDatas,
                            });
                        }
                    } else if (res && res['status'] == 0) {
                        Toast.showShortCenter('列表为空!');
                    } else {
                        Toast.showShortCenter('未能加载列表,' + res['message']);
                    }
                    resolve();
                }).catch(e => {
                Toast.showShortCenter('加载地区失败!');
                resolve();
            })
        });
    }

    fetchHosipital() {
        var self = this;
        let param = {};
        if (this.state.cityId != null) {
            param['cityId'] = this.state.cityId;
        }
        if (this.state.hospitalName != null) {
            param['hospitalName'] = this.state.hospitalName;
        }
        return new Promise(function (resolve, reject) {
            Api.get(Service.getHospitalList, param, false)
                .then(res => {
                    if (res && res['status'] == 1) {
                        let allDatas = [];
                        let hosipitalData = {
                            flex: 1,
                            datas: res['data']
                        };
                        allDatas.push(hosipitalData);
                        self.setState({
                            hosipitalMultiDatas: allDatas,
                        });
                        if (ShowType == 1) {
                            self.setState({
                                multiDatas: allDatas,
                            });
                        }
                    } else if (res && res['status'] == 0) {
                        Toast.showShortCenter('列表为空!');
                    } else {
                        Toast.showShortCenter('未能加载列表,' + res['message']);
                    }
                    resolve();
                }).catch(e => {
                Toast.showShortCenter('加载医院失败!');
                resolve();
            })
        });
    }

    toggleAreaSelector() {
        let flag = ShowType == 1;
        this.setState({
            flagTextInput: !flag,
            leftText: flag ? this.state.leftTextFull : this.state.leftTextShort,
            //navigationButtonViewJustifyContent: flag ? 'space-between' : 'center',
            navigationButtonViewWidth: flag ? HFConfiguration.windowWidth - 90 : 100,
            value: flag ? this.state.cityId : this.state.hospitalId,
            multiDatas: flag ? this.state.areaMultiDatas : this.state.hosipitalMultiDatas,
        });
        ShowType = flag ? 0 : 1;
    }

    filterHospitalDatas(cityDataRow) {
        let provinceDataRow = null;
        let areaMultiDatas = this.state.areaMultiDatas;
        let provinceDatas = areaMultiDatas[0]['datas'];
        if (provinceDatas != null && provinceDatas.length > 0) {
            for (let i = 0; i < provinceDatas.length; i++) {
                if (provinceDatas[i]['value'] == cityDataRow['parentValue']) {
                    provinceDataRow = provinceDatas[i];
                    break;
                }
            }
        }
        let leftTextFull = provinceDataRow != null ? provinceDataRow['text'] + ' / ' + cityDataRow['text'] : '北京 / 北京市';
        this.state.cityId = cityDataRow['value'];
        this.state.leftText = ShowType == 0 ? cityDataRow['text'] : leftTextFull;
        this.state.leftTextShort = cityDataRow['text'];
        this.state.leftTextFull = leftTextFull;
        this.setState({
            cityId: cityDataRow['value'],
            leftText: ShowType == 0 ? cityDataRow['text'] : leftTextFull,
            leftTextShort: cityDataRow['text'],
            leftTextFull: leftTextFull,
        });
        this.toggleAreaSelector();
        this.fetchHosipital();
    }

    onChangeHospitalName(value) {
        this.state.hospitalName = value;
        this.setState({
            hospitalName: value
        });
        this.fetchHosipital();
    }

    render() {
        return (
            <HFPage
                ref="selectionPage"
                flagNoScroll={true}
                navigation={{
                        navigator:this.props.navigator,
                        title:'医院选择',
                        flagRight:true,
                        rightText:'取消',
                        onRightButtonPress:function(){
                            dismissKeyboard();
                            this.props.navigator.jumpBack();
                        },
                        leftViewStyle:{alignSelf:'flex-end'},
                        leftView:(
                            <View style={styles.navigationLeftView}>
                                <View style={[styles.navigationButtonView,{width:this.state.navigationButtonViewWidth}]}>
                                    <HFImageButton
                                        fontSizeDiff={-4}
                                        style={[styles.navigationButton,{width:this.state.navigationButtonViewWidth,justifyContent:this.state.navigationButtonViewJustifyContent}]}
                                        leftTextStyle={{color:HFConfiguration.textFontColor2}}
                                        imageStyle={{width:12,height:12}}
                                        flagLeftText={true}
                                        leftText={this.state.leftText}
                                        source={require('./../../Image/icon_right.png')}
                                        onPress={this.toggleAreaSelector.bind(this)}
                                    />
                                </View>
                                <HFTextInput
                                    editable={this.state.navigationButtonViewWidth == 100}
                                    onChangeText={this.onChangeHospitalName.bind(this)}
                                    style={styles.navigationSearchView}
                                    inputStyle={styles.navigationSearchInput}
                                    placeholder='请输入您的执业医院'
                                />
                            </View>
                        )
                    }}
                innerView={
                    <View style={{flex:1,alignSelf:'stretch'}}>
                        <HFMultiOptionPicker
                            flagTextInput={this.state.flagTextInput}
                            navigator={this.props.navigator}
                            value={this.state.value}
                            multiDatas={this.state.multiDatas}
                            callback={(dataRow)=>{
                                if(ShowType == 0){
                                    this.filterHospitalDatas(dataRow);
                                } else {
                                    if (this.props.callback) {
                                        this.props.callback(dataRow);
                                    }
                                    this.props.navigator.jumpBack();
                                }
                            }}
                        />
                    </View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
    },
    innerView: {
        flex: 1,
    },
    navigationLeftView: {
        flex: 1,
        height: navigationInnerViewHeight,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 5,
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 3,
    },
    navigationButtonView: {
        width: 100,
        height: navigationInnerViewHeight,
        margin: 0,
        padding: 0,
    },
    navigationSearchView: {
        flex: 1,
        height: navigationInnerViewHeight,
        margin: 0,
        padding: 0,
    },
    navigationButton: {
        width: 100,
        height: navigationInnerViewHeight,
        marginTop: 0,
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderWidth: 0,
    },
    navigationSearchInput: {
        height: navigationInnerViewHeight,
        margin: 0,
        padding: 0,
        paddingLeft: 5,
        paddingTop: 2,
    },
});

module.exports = HospitalSelector;