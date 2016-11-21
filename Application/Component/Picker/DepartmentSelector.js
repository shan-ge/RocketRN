/**
 * Created by shange on 2016/11/05. 地区选择器
 */

'use strict';
import React, {Component} from 'react';
import {HFPage, HFMultiOptionPicker, HFConfiguration, TouchableOpacity, View, StyleSheet} from './../../../HFFramework/Framework';

import Toast from '@remobile/react-native-toast';
import RenderIf from './../../../HFFramework/Utility/RenderIf';
import Api from './../../../HFFramework/Utility/Api';

import Service from './../../Common/Service';

class DepartmentSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hospitalId: this.props.hospitalId,
            departmentMultiDatas: [],
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData() {
        var self = this;
        let param = {};
        if (this.state.hospitalId != null) {
            param['hospitalId'] = this.state.hospitalId;
            return new Promise(function (resolve, reject) {
                Api.get(Service.getHospitalDepartmentList, param, false)
                    .then(res => {
                        if (res && res['status'] == 1) {
                            let allDatas = [];
                            let datas = {
                                flex: 1,
                                datas: res['data']
                            };
                            allDatas.push(datas);
                            self.setState({
                                departmentMultiDatas: allDatas,
                            });
                        } else if (res && res['status'] == 0) {
                            Toast.showShortCenter('列表为空!');
                        } else {
                            Toast.showShortCenter('未能加载列表,' + res['message']);
                        }
                        resolve();
                    }).catch(e => {
                    Toast.showShortCenter('加载科室失败!');
                    resolve();
                })
            });
        } else {
            this.setState({
                departmentMultiDatas: [{flex: 1, datas: []}],
            });
        }
    }

    render() {
        return (
            <HFPage
                flagNoScroll={true}
                navigation={{navigator:this.props.navigator,title:'科室选择',flagLeft:true}}
                innerView={
                    <HFMultiOptionPicker
                        flagTextInput={true}
                        navigator={this.props.navigator}
                        value={this.props.value}
                        multiDatas={this.state.departmentMultiDatas}
                        callback={(dataRow)=>{
                            if (this.props.callback) {
                                this.props.callback(dataRow);
                            }
                            this.props.navigator.jumpBack();
                        }}
                    />
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
    }
});

module.exports = DepartmentSelector;