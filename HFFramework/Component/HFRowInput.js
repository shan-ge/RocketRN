/**
 * Created by chengzhencai on 16/8/26. 行元素
 *
 * <RowInput
 * source={require('../../Image/record/icon_treatmentType.png')}   无label图片,不添加此属性
 * onPress={this.onPressEvent.bind(this,'doctor','我的医生')}      触发动作
 *  或者onChange={this.onPressEvent.bind(this,'name','姓名')}      可输入
 * text='我的医生'                                                  label文字标签title
 * value={this.state.doctor}                                        值
 *
 />

 */

import React, {Component, PropTypes} from 'react';
import {
    HFText,
    HFTextInput,
    HFImage,
    HFConfiguration,
    HFSeparator,
    HFBaseStyle,
    ScrollView,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from './../Framework';
import DatePicker from 'react-native-datepicker';
import RenderIf from './../Utility/RenderIf';
import Picker from './../Utility/Picker';
import Toast from '@remobile/react-native-toast';

class HFRowInput extends Component {

    static defaultProps = {
        editable: true,
        flagNoLeftText: false,
        flagNoRightArrow: false,
        innerViewType: 'text'// text, textInput, view
    };

    static propTypes = {
        placeholder: React.PropTypes.string,// 空视图
        flagNoLeftText: React.PropTypes.bool,
        flagNoRightArrow: React.PropTypes.bool,
        editable: React.PropTypes.bool,
        innerViewType: React.PropTypes.string,// view:this.props.innerView
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            source: newProps.source,
            placeholder: newProps.placeholder,
            data: newProps.data,
            value: newProps.value,
            selectValue: newProps.selectValue,
            text: newProps.text,
            innerView: newProps.innerView,
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            placeholder: this.props.placeholder,
            data: this.props.data,
            value: this.props.value,
            selectValue: this.props.selectValue,
            text: this.props.text,
            innerView: this.props.innerView,
        };
    }

    onChange(value, text) {
        if (this.props.onChange) {
            this.props.onChange(value, text);
        }
    }

    onPress() {
        let self = this;
        switch (this.props.innerViewType) {
            case 'picker':
                if (this.props.data != undefined && this.props.data != null && this.props.data.length > 0) {
                    Picker.picker('picker_' + this.props.text, '请选择' + this.props.text, this.state.data, this.state.selectValue, function (value, text) {
                        self.setState({
                            selectValue: value,
                            value: text
                        });
                        self.onChange(value, text);
                    });
                } else {
                    Toast.showShortCenter('未找到数据,请检查网络连接');
                }
                break;
            case 'text':
            case 'image':
            case 'view':
                if (this.props.onPress) {
                    this.props.onPress();
                }
                break;
        }
    }

    getImageView(ary) {
        if (ary != undefined && ary != null) {
            let images = ary.map((item, index)=> {
                return (
                    <HFImage
                        key={'image_'+index}
                        style={{marginLeft:5,width:50,height:40}}
                        source={{uri:item}}
                    />
                )
            });
            return images;
        } else {
            return null;
        }
    }

    render() {
        let labelImage = this.state.source
            ?
            <HFImage
                style={[styles.image,{marginRight:10}]}
                flagNoLoading={true}
                resizeMode={Image.resizeMode.stretch}
                source={this.state.source}
            />
            :
            <View></View>;
        let innerViewType = this.props.innerViewType;
        if (innerViewType == 'text' || innerViewType == 'view' || innerViewType == 'picker' || innerViewType == 'image') {
            return (
                <View style={[styles.outerRow,this.props.style]}>
                    <TouchableOpacity
                        style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'stretch'}}
                        activeOpacity={1}
                        onPress={this.onPress.bind(this)}
                    >
                        {labelImage}
                        <View style={{flex:1,flexDirection:'column'}}>
                            <View style={styles.innerRow}>
                                {RenderIf(!this.props.flagNoLeftText)(
                                    <HFText numberOfLines={1} text={this.state.text}
                                            style={[styles.textStyle,this.props.textStyle]}/>
                                )}
                                {RenderIf(innerViewType == 'text')(
                                    <HFText
                                        numberOfLines={1}
                                        style={[styles.input,{textAlign:'right',color:(this.state.value == null||this.state.value == ''||this.state.value == '未完善')?HFConfiguration.placeholderColor:HFConfiguration.textInputFontColor}]}
                                        text={(this.state.value != null && this.state.value != '') ? this.state.value : this.state.placeholder}
                                    />
                                )}
                                {RenderIf(innerViewType == 'view')(
                                    this.state.innerView
                                )}
                                {RenderIf(innerViewType == 'picker')(
                                    <HFText
                                        numberOfLines={1}
                                        style={[styles.input,{textAlign:'right',color:(this.state.value == null||this.state.value == ''||this.state.value == '未完善')?HFConfiguration.placeholderColor:HFConfiguration.textInputFontColor}]}
                                        text={(this.state.value != null && this.state.value != '') ? this.state.value : this.state.placeholder}
                                    />
                                )}
                                {RenderIf(innerViewType == 'image' && (this.state.data == null || this.state.data.length == 0))(
                                    <HFText
                                        numberOfLines={1}
                                        style={[styles.input,{textAlign:'right',color:HFConfiguration.placeholderColor}]}
                                        text={this.state.placeholder}
                                    />
                                )}
                                {RenderIf(innerViewType == 'image' && this.state.data != null)(
                                    <View
                                        style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                        <ScrollView
                                            style={{flex:1,alignSelf:'flex-end',flexDirection:'row',overflow:'hidden'}}
                                            horizontal={true}
                                        >
                                            <View
                                                style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                                {this.getImageView(this.state.data)}
                                            </View>
                                        </ScrollView>
                                    </View>
                                )}
                                {RenderIf(!this.props.flagNoRightArrow)(
                                    <HFImage
                                        style={styles.image}
                                        flagNoLoading={true}
                                        resizeMode={Image.resizeMode.stretch}
                                        source={require('../../Application/Image/icon_right.png')}
                                    />
                                )}
                            </View>
                            <HFSeparator style={this.props.separatorStyle}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        } else if (innerViewType == 'textInput' || innerViewType == 'datePicker' || innerViewType == 'datetimePicker') {
            return (
                <View style={[styles.outerRow,this.props.style]}>
                    {labelImage}
                    <View style={{flex:1,flexDirection:'column'}}>
                        <View style={styles.innerRow}>
                            {RenderIf(!this.props.flagNoLeftText)(
                                <HFText numberOfLines={1} text={this.state.text}
                                        style={[styles.textStyle,this.props.textStyle]}/>
                            )}
                            {RenderIf(innerViewType == 'textInput')(
                                <HFTextInput
                                    style={[styles.input,{paddingRight:0,height: HFConfiguration.textInputViewHeight[HFConfiguration.dpiIndex] - 2}]}
                                    inputStyle={{textAlign:'right',fontSize:HFConfiguration.textFontSize[HFConfiguration.dpiIndex]}}
                                    iconStyle={{alignItems:'flex-end',paddingRight:3}}
                                    placeholder={this.state.placeholder}
                                    onChangeText={this.onChange.bind(this)}
                                    editable={this.props.editable}
                                    value={this.state.value}
                                    flagNoPlaceholder={true}
                                />
                            )}
                            {RenderIf(innerViewType == 'datePicker')(
                                <View
                                    style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                                    <DatePicker
                                        customStyles={{
                                            dateInput:[HFBaseStyle.datePickerInput,{width:100,alignItems:'flex-end'}],
                                            dateText:[HFBaseStyle.datePickerDate,{fontSize:HFConfiguration.textFontSize[HFConfiguration.dpiIndex]}],
                                            placeholderText:HFBaseStyle.datePickerPlaceholder,
                                        }}
                                        date={this.state.value}
                                        mode='date'
                                        showIcon={false}
                                        confirmBtnText="确定"
                                        cancelBtnText="取消"
                                        onDateChange={(date)=>{
                                            this.setState({
                                                value: date
                                            });
                                            this.onChange(date);
                                        }}
                                    />
                                </View>
                            )}
                            {RenderIf(innerViewType == 'datetimePicker')(
                                <View
                                    style={{flex:1,alignItems:'flex-end',justifyContent:'center'}}>
                                    <DatePicker
                                        customStyles={{
                                            dateInput:[HFBaseStyle.datePickerInput,{width:100,alignItems:'flex-end'}],
                                            dateText:[HFBaseStyle.datePickerDate,{fontSize:HFConfiguration.textFontSize[HFConfiguration.dpiIndex]}],
                                            placeholderText:HFBaseStyle.datePickerPlaceholder
                                        }}
                                        date={this.state.value}
                                        mode='datetime'
                                        showIcon={false}
                                        confirmBtnText="确定"
                                        cancelBtnText="取消"
                                        onDateChange={(date)=>{
                                            this.setState({
                                                value: date
                                            });
                                            this.onChange(date);
                                        }}
                                    />
                                </View>
                            )}
                            {RenderIf(!this.props.flagNoRightArrow)(
                                <HFImage
                                    style={styles.image}
                                    flagNoLoading={true}
                                    resizeMode={Image.resizeMode.stretch}
                                    source={require('../../Application/Image/icon_right.png')}
                                />
                            )}
                        </View>
                        <HFSeparator style={this.props.separatorStyle}/>
                    </View>
                </View>
            )
        }
        return null;
    }
}

const styles = StyleSheet.create({
    outerRow: {
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: HFConfiguration.textInputViewHeight[HFConfiguration.dpiIndex],
        backgroundColor: '#fff',
    },
    innerRow: {
        flex: 1,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle: {
        width: 100,
    },
    image: {
        width: HFConfiguration.imageIconSize[HFConfiguration.dpiIndex],
        height: HFConfiguration.imageIconSize[HFConfiguration.dpiIndex],
        marginLeft: 10,
    },
    input: {
        flex: 4,
        marginLeft: 10,
    }
});
module.exports = HFRowInput;