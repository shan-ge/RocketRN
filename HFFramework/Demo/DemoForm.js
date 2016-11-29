/**
 * Created by shange on 2016/10/21.
 * 后发App框架示例
 */
import React, {Component} from 'react';
import {HFPage, HFHeading, HFTextButton, HFTextInput, HFText, HFSeparator, HFSeparatorArea, HFConfiguration, HFBaseStyle, HFRowInput, View, Image, StyleSheet} from './../Framework';
import Toast from '@remobile/react-native-toast';
import DatePicker from 'react-native-datepicker';

import HospitalSelector from './../../Application/Component/Picker/HospitalSelector';

import Picker from './../Utility/Picker';

class DemoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sex: '女',
            date: '2016-01-01'
        };
    }

    toPicker() {
        let self = this;
        Picker.picker('sex', '请选择性别', [{value: 0, text: '男'}, {value: 1, text: '女'}], 1, function (value, text) {
            self.setState({
                sex: text
            });
        });
    }

    render() {
        return (
            <HFPage
                navigation={{navigator:this.props.navigator,title:'表单',flagLeft:true}}
                innerView={
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <HFHeading level={1} text='[输入框]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFSeparator/>
                        <HFTextInput/>
                        <HFSeparator/>
                        <DatePicker
                            customStyles={{dateInput:HFBaseStyle.datePickerInput,dateText:HFBaseStyle.datePickerDate,placeholderText:HFBaseStyle.datePickerPlaceholder}}
                            date={this.state.date}
                            mode='datetime'
                            showIcon={false}
                            confirmBtnText="确定"
                            cancelBtnText="取消"
                            onDateChange={(date)=>{
                                this.setState({
                                    date:date
                                });
                            }}
                        />
                        <HFSeparator/>
                        <HFTextButton style={styles.button} text={"性别选择:"+this.state.sex} onPress={this.toPicker.bind(this)}/>
                        <HFSeparator/>
                        <HFSeparatorArea style={{height:20}}/>
                        <HFHeading level={1} text='[行元素]' style={{alignSelf:'flex-start',marginBottom:10}}/>
                        <HFSeparator/>
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='textInput'
                            flagNoRightArrow={true}
                            onChange={(value, text)=>{Toast.showShortCenter(value)}}
                            placeholder='未完善'
                            text='姓名(textInput)'
                            value='SuperMan'
                        />
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='text'
                            onPress={()=>{
                                this.props.navigator.push({
                                    component: HospitalSelector,
                                })
                            }}
                            placeholder='未完善'
                            text='医院(selection)'
                            value='协和医院'
                        />
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='picker'
                            onChange={(value, text)=>{Toast.showShortCenter('性别,value='+value+',text='+text)}}
                            placeholder='未完善'
                            text='性别(picker)'
                            value='女'
                            selectValue={1}
                            data={[{value: 0, text: '男'}, {value: 1, text: '女'}]}
                        />
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='datePicker'
                            onChange={(value, text)=>{Toast.showShortCenter('生日:'+value)}}
                            placeholder='未完善'
                            text='生日(date)'
                            value='1990-01-01'
                        />
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='datetimePicker'
                            onChange={(value, text)=>{Toast.showShortCenter('时间'+value)}}
                            placeholder='未完善'
                            text='时间(datetime)'
                            value='2016-10-01 08:30'
                        />
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='image'
                            onPress={()=>{Toast.showShortCenter('打开图片选择页面')}}
                            placeholder='未完善'
                            text='图片(images)'
                            data={['https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png','https://facebook.github.io/react/img/logo_og.png']}
                        />
                        <HFRowInput
                            source={require('./../Image/Icon/hospital.png')}
                            innerViewType='view'
                            onPress={()=>{Toast.showShortCenter('打开某个页面')}}
                            placeholder='未完善'
                            text='状态(view)'
                            innerView={
                                <View style={{flex:1,alignItems:'flex-end'}}>
                                    <View style={{width:100,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:HFConfiguration.mainColor,borderRadius:15}}>
                                        <HFText style={{color:HFConfiguration.mainColor}} text='已认证'/>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
});

module.exports = DemoForm;