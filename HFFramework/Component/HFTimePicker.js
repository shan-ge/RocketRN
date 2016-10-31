/**
 * Created by shange on 16/8/20. 时间选择控件
 *
 * pickerVisible = {false}
 * defaultValue = ['上午','10时','00分']
 *
 * <HFTimePicker pickerVisible={this.state.pickerVisible}
 *      onChange={(value)=>this.handlerChangeMedicineTime(value)}
 *      defaultValue1={this.state.pickerDefaultValue1}
 *      defaultValue2={this.state.pickerDefaultValue2}
 * />
 *
 *
 // 调用用药时间修改控件
 handlerInitChangeMedicineTime(event, dataRow, rowID) {
        let dateStr = '';
        if (dataRow && dataRow != null) {
            dateStr = dataRow['useTime'];
        }
        if (dateStr == null || dateStr == '') {
            dateStr = DateUtil.getTimeChineseString(new Date());
        }
        this.setState({
            pickerVisible: true,
            operatingDataRowID: rowID,
            pickerDefaultValue1: dateStr.substring(3, 5) + '时',
            pickerDefaultValue2: dateStr.substring(6, 8) + '分',
        });
    }
 *
 */

'use strict';
import React, {Component} from 'react';
import {View, Modal, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions} from 'react-native'

import Picker from './HFPicker';

function createTimeData() {
    let hour = {};
    let minutes = [];
    for (let j = 0; j < 60; j++) {
        minutes.push((j <= 9 ? '0' + j : j) + '分');
    }
    for (let i = 0; i < 24; i++) {
        hour[(i <= 9 ? '0' + i : i) + '时'] = minutes;
    }
    return hour;
};

export default class HFTimePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickerVisible: false,
            pickerViewHeight: 0,
            lastHandlerTime: (new Date()).getTime(),
        };
    }

    componentDidUpdate() {
        // 防止重复触发事件
        if (!this.props.pickerVisible || (new Date()).getTime() - this.state.lastHandlerTime < 100) {
            return false;
        }
        if (!this.state.pickerVisible) {
            this.handlerShowPicker();
        }
    }

    handlerShowPicker() {
        this.picker.show();
        this.setState({
            pickerVisible: true,
            pickerViewHeight: Dimensions.get('window').height,
            lastHandlerTime: (new Date()).getTime(),
        });
    }

    handlerHidePicker() {
        this.picker.hide();
        this.setState({
            pickerVisible: false,
            pickerViewHeight: 0,
            lastHandlerTime: (new Date()).getTime(),
        });
    }

    render() {
        return (
            <View style={{height:this.state.pickerViewHeight}}>
                <TouchableWithoutFeedback onPress={this.handlerHidePicker.bind(this)}>
                    <View style={{height:Dimensions.get('window').height - 260,backgroundColor:'rgba(0,0,0,0.5)'}}/>
                </TouchableWithoutFeedback>
                <Picker
                    ref={picker => this.picker = picker}
                    style={{height: 260,backgroundColor:'#ffffff'}}
                    showDuration={0}
                    pickerData={createTimeData()}
                    selectedValue={[this.props.defaultValue1,this.props.defaultValue2]}
                    onPickerCancel={()=>{
                        this.handlerHidePicker();
                        }}
                    onPickerDone={(pickedValue) => {
                        // 调用父组件的方法
                        const {onChange} = this.props;
                        if (onChange) {
                            onChange(pickedValue);
                        }
                        this.handlerHidePicker();
                        }}
                    pickerTitleText={''}
                />
            </View>
        );
    }
};

module.exports = HFTimePicker;