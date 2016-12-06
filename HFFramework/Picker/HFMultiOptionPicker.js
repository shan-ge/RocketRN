/**
 * Created by shange on 2016/11/05. (无限级别).多级选择器
 *
 * [// 多列数据(无限).在本例中:两级的地区选择,省级占宽1/3,市区级占2/3.多级间通过value和parentValue进行级联
 {
     flex: 1,// 宽度占整屏的比例
     datas: [// 数据
         {
             value: 1,
             parentValue: null,
             text: '北京市',
         }
         ,
         {
             value: 2,
             parentValue: null,
             text: '上海市',
         }
     ]
 }
 ,
 {
     flex: 2,
     datas: [
         {
             value: 1,
             parentValue: 1,
             text: '西城区',
         },
         {
             value: 2,
             parentValue: 1,
             text: '朝阳区',
         },
         {
             value: 3,
             parentValue: 2,
             text: '徐汇区',
         },
     ]
 }
 ]
 *
 */

'use strict';
import React, {Component} from 'react';
import {HFDataListView, HFTextButton, HFRowInput, HFTextInput, HFDataEmptyView, HFSeparator, HFConfiguration, HFText, ListView, View, StyleSheet} from './../Framework';

import Toast from '@remobile/react-native-toast';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import RenderIf from './../Utility/RenderIf';

class HFMultiOptionPicker extends Component {

    static defaultProps = {
        flagTextInput: false,// 是否在最后一列数据的最后一行,显示一个手动输入框
        value: null,// 默认选中值,匹配最后一列的value
        multiDatas: [],
    };

    static propTypes = {
        flagTextInput: React.PropTypes.bool,// 是否在最后一列数据的最后一行,显示一个手动输入框
        multiDatas: React.PropTypes.array,// 数据
        callback: React.PropTypes.func,// 点击最后一列后的回调函数
    };

    constructor(props) {
        super(props);
        this.state = {
            flagTextInput: this.props.flagTextInput,
            value: this.props.value,
            text: null,// 自定义输入
            multiDatas: this.props.multiDatas,//
            activeValues: [],// 每列的选中值.
        };
    }

    componentWillMount() {
        this.setDefaultValueActive();
    }

    componentWillReceiveProps(newProps) {
        let self = this;
        this.setState({
            flagTextInput: false,
            value: null,
            multiDatas: [],
        });
        setTimeout(function () {
            self.state.flagTextInput = self.props.flagTextInput;
            self.state.value = self.props.value;
            self.state.multiDatas = self.props.multiDatas;
            self.setState({
                flagTextInput: self.props.flagTextInput,
                value: self.props.value,
                multiDatas: self.props.multiDatas,
            });
            self.setDefaultValueActive();
        }, 10);
    }

    /**
     * 设置默认值(反向查找)
     */
    setDefaultValueActive() {
        let activeValues = [];
        let value = this.state.value;// 默认选中值
        const allMultiDatas = this.props.multiDatas;
        let multiDatas = [];
        for (let i = 0; i < allMultiDatas.length; i++) {
            multiDatas.push({
                flex: allMultiDatas[i]['flex'],
                datas: []
            });
        }
        if (allMultiDatas != null && allMultiDatas.length > 0) {
            // 自后向前,逐层获取选中值
            let thisColumnIndex = allMultiDatas.length - 1;// 第几列
            let thisColumnDatas = allMultiDatas[thisColumnIndex]['datas'];
            let thisParentValue;
            while (thisColumnDatas != null && thisColumnDatas.length > 0 && thisColumnIndex >= 0) {
                value = value != null ? value : thisColumnDatas[0]['value'];
                activeValues[thisColumnIndex] = value;
                //
                thisParentValue = null;
                if (thisColumnIndex > 0) {
                    for (let i = 0; i < thisColumnDatas.length; i++) {
                        if (thisColumnDatas[i]['value'] == value) {
                            thisParentValue = thisColumnDatas[i]['parentValue'];
                            break;
                        }
                    }
                }
                //
                let thisColumnDatasNew = [];
                for (let i = 0; i < thisColumnDatas.length; i++) {
                    if (thisColumnDatas[i]['parentValue'] == thisParentValue || thisParentValue == undefined || thisParentValue == null) {
                        thisColumnDatasNew.push(thisColumnDatas[i]);
                    }
                }
                multiDatas[thisColumnIndex]['datas'] = thisColumnDatasNew;
                if (thisColumnIndex > 0) {
                    value = thisParentValue;
                    thisColumnIndex--;
                    thisColumnDatas = allMultiDatas[thisColumnIndex]['datas'];
                } else {
                    thisColumnIndex = -1;
                }
            }
        }
        this.setState({
            multiDatas: multiDatas,
            activeValues: activeValues
        });
    }

    /**
     * 选项点击事件(正向查找)
     *
     * 如果是最后一列的选项被点击,则调用callback回调函数;否则进行数据切换.
     *
     * @param event
     * @param dataRow
     * @param columnIndex
     */
    onPress(dataRow, columnIndex, index) {
        // 修改选中值
        let activeValues = this.state.activeValues;
        activeValues[columnIndex] = dataRow['value'];
        // 处理事件
        let allMultiDatas = this.props.multiDatas;
        let lastColumnIndex = allMultiDatas.length - 1;
        let multiDatas = this.state.multiDatas;
        if (lastColumnIndex == columnIndex) {
            if (this.props.callback) {
                this.props.callback(dataRow);
            } else {
                this.props.navigator.pop();
            }
        } else {
            // 逐级向下搜索
            let nextMultiDatas;
            let thisValue = dataRow['value'];
            let nextColumnDatasNew;
            let thisColumnIndex = columnIndex;
            while (thisColumnIndex < lastColumnIndex) {
                nextMultiDatas = allMultiDatas[thisColumnIndex + 1]['datas'];
                nextColumnDatasNew = [];
                for (let i = 0; i < nextMultiDatas.length; i++) {
                    if (nextMultiDatas[i]['parentValue'] == thisValue || thisValue == null) {
                        nextColumnDatasNew.push(nextMultiDatas[i]);
                    }
                }
                // 选中值
                activeValues[thisColumnIndex + 1] = null;
                if (thisColumnIndex == lastColumnIndex - 1 && this.state.value != undefined && this.state.value != null) {
                    for (let i = 0; i < nextColumnDatasNew.length; i++) {
                        if (nextColumnDatasNew[i]['value'] == this.state.value) {
                            activeValues[thisColumnIndex + 1] = this.state.value;
                        }
                    }
                }
                if (nextColumnDatasNew != null && nextColumnDatasNew.length > 0 && nextColumnDatasNew[0] != null) {
                    activeValues[thisColumnIndex + 1] = activeValues[thisColumnIndex + 1] != null ? activeValues[thisColumnIndex + 1] : nextColumnDatasNew[0]['value'];
                }
                multiDatas[thisColumnIndex + 1]['datas'] = nextColumnDatasNew;
                // 为下次循环使用
                if (thisColumnIndex < lastColumnIndex && nextMultiDatas.length > 0) {
                    thisValue = nextMultiDatas[0]['value'];
                }
                thisColumnIndex++;
            }
        }
        //
        this.setState({
            multiDatas: [],
            activeValues: [],
        });
        let self = this;
        setTimeout(function () {
            self.setState({
                multiDatas: multiDatas,
                activeValues: activeValues,
            });
        }, 1);
    }

    onTextInputPress() {
        if (this.props.callback) {
            if (this.state.text == null || this.state.text == '') {
                Toast.showShortCenter('请输入您的结果');
                return false;
            }
            let dataRow = {};
            dataRow['value'] = null;
            dataRow['parentValue'] = null;
            dataRow['text'] = this.state.text;
            dismissKeyboard();
            this.props.callback(dataRow);
        } else {
            dismissKeyboard();
            this.props.navigator.pop();
        }
    }

    renderRowView(event, dataRow, columnIndex, sectionID, rowID, key) {
        if (dataRow == null) {
            return <View key={key} style={[styles.innerView,this.state.dataGridRowStyle,{height:100}]}/>;
        }
        let value = dataRow['value'];
        let textStyle = null;
        let activeValue = this.state.activeValues[columnIndex];
        if (activeValue == value || ((activeValue == undefined || activeValue == null) && rowID == 0)) {
            textStyle = styles.dataActive;
        }
        // if 最后一列/最后一行/允许输入
        if (columnIndex == this.state.multiDatas.length - 1 && this.state.multiDatas[columnIndex]['datas'].length - 1 == rowID && this.state.flagTextInput) {
            return (
                <View style={{flexDirection:'column'}}>
                    <HFTextButton
                        text={dataRow['text']}
                        onPress={this.onPress.bind(this, dataRow, columnIndex, rowID)}
                        style={styles.textButton}
                        textStyle={[{alignSelf:'flex-start'},textStyle]}
                    />
                    <HFSeparator/>
                    <View
                        style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                        <HFTextInput
                            placeholder="没找到想要的？您也可以输入一个..."
                            onChangeText={(text)=>{
                                this.state.text=text;
                                this.setState({
                                    text:text
                                })
                            }}
                        />
                        <HFTextButton
                            text="确定"
                            style={{alignSelf:'center',margin:10}}
                            onPress={this.onTextInputPress.bind(this)}
                        />
                    </View>
                    <HFSeparator/>
                </View>
            );
        } else {
            return (
                <HFTextButton
                    text={dataRow['text']}
                    onPress={this.onPress.bind(this, dataRow, columnIndex, rowID)}
                    style={styles.textButton}
                    textStyle={[{alignSelf:'flex-start'},textStyle]}
                />
            );
        }
    }

    // 列表分割线
    renderDataRowSeparator(event, key) {
        return (
            <HFSeparator key={key}/>
        )
    }

    render() {
        var multiDatas = this.state.multiDatas;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (multiDatas != null && multiDatas.length > 0) {
            return (
                <View style={[styles.outerView,this.props.style]}>
                    {this.state.multiDatas.map((columnData, columnIndex)=> {
                        let flex = columnData['flex'] != null ? parseInt(columnData['flex']) : 1;
                        let datas = columnData['datas'];
                        if (datas != null && datas.length > 0) {
                            let dataSource = ds.cloneWithRows(datas);
                            return (
                                <View key={'column_' + columnIndex} style={[styles.innerView,{flex:flex}]}>
                                    <ListView
                                        showsVerticalScrollIndicator={false}
                                        style={styles.listView}
                                        enableEmptySections={true}
                                        dataSource={dataSource}
                                        renderRow={(dataRow, sectionID, rowID)=>this.renderRowView(this, dataRow, columnIndex, sectionID, rowID, 'dataRow_' + rowID)}
                                        renderSeparator={(sectionID, rowID)=>this.renderDataRowSeparator(this,'separator_' + rowID)}
                                    />
                                </View>
                            );
                        } else {
                            return (
                                <View key={'column_' + columnIndex} style={[styles.innerView,{flex:flex}]}>
                                    {RenderIf(!this.state.flagTextInput)(
                                        <HFDataEmptyView/>
                                    )}
                                    {RenderIf(this.state.flagTextInput)(
                                        <View
                                            style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                                            <HFTextInput
                                                placeholder="没找到想要的？您也可以输入一个..."
                                                onChangeText={(text)=>{
                                                    this.state.text=text;
                                                    this.setState({
                                                        text:text
                                                    })
                                                }}
                                            />
                                            <HFTextButton
                                                text="确定"
                                                style={{alignSelf:'center',margin:10}}
                                                onPress={this.onTextInputPress.bind(this)}
                                            />
                                        </View>
                                    )}
                                    <HFSeparator/>
                                </View>
                            );
                        }
                    })}
                </View>
            );
        } else {
            return null;
        }
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
        borderRightWidth: 1,
        borderRightColor: HFConfiguration.separatorLineColor,
    },
    listView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    dataActive: {
        color: HFConfiguration.mainColor,
    },
    textButton: {
        alignSelf: 'stretch',
        height: 40,
        paddingLeft: 10,
    },
});

module.exports = HFMultiOptionPicker;