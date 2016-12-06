/**
 * Created by shange on 2016/11/05. 地区选择器
 */

'use strict';
import React, {Component} from 'react';
import {HFPage, HFMultiOptionPicker, HFConfiguration, TouchableOpacity, View, StyleSheet} from './../../../HFFramework/Framework';

class AreaSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areaMultiDatas: [// 多列数据(无限).在本例中:两级的地区选择,省级占宽1/3,市区级占2/3.多级间通过value和parentValue进行级联
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
            ],
        };
    }

    render() {
        return (
            <HFPage
                flagNoScroll={true}
                navigation={{navigator:this.props.navigator,title:'地区选择',flagLeft:true}}
                innerView={
                    <HFMultiOptionPicker
                        navigator={this.props.navigator}
                        value={this.props.value}
                        multiDatas={this.state.areaMultiDatas}
                        callback={(dataRow)=>{
                            if (this.props.callback) {
                                this.props.callback(dataRow);
                            }
                            this.props.navigator.pop();
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

module.exports = AreaSelector;