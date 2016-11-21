/**
 * Created by shange on 2016/11/08. 选择器
 */
'use strict';
import React, {Component} from 'react';
import {
    HFTextButton,
    HFText,
    HFConfiguration,
    View,
    Modal,
    DeviceEventEmitter,
    StyleSheet
} from './../Framework';

import Picker from 'react-native-wheel-picker';
const PickerItem = Picker.Item;

import PickerUtil from './../Utility/Picker';

class HFPicker extends Component {

    static defaultProps = {
        value: null,// 1
        datas: []// [{value: 0, text: '男'}, {value: 1, text: '女'}]
    };
    static propTypes = {
        datas: React.PropTypes.array
    };

    componentWillReceiveProps(newProps) {
        let datas = newProps.datas;
        let value = null;
        let text = null;
        let index = 0;
        if (datas != null) {
            value = newProps.datas[0]['value'];
            text = newProps.datas[0]['text'];
        }
        if (datas != null && newProps.value != null) {
            for (let i = 0; i < datas.length; i++) {
                if (datas[i]['value'] == newProps.value) {
                    index = i;
                    value = datas[i]['value'];
                    text = datas[i]['text'];
                    break;
                }
            }
        }
        this.setState({
            datas: datas,
            selectedIndex: index,
            selectedValue: value,
            selectedText: text,
        });
    }

    constructor(props) {
        super(props);
        let datas = this.props.datas;
        let value = null;
        let text = null;
        let index = 0;
        if (datas != null) {
            value = this.props.datas[0]['value'];
            text = this.props.datas[0]['text'];
        }
        if (datas != null && this.props.value != null) {
            for (let i = 0; i < datas.length; i++) {
                if (datas[i]['value'] == this.props.value) {
                    index = i;
                    value = datas[i]['value'];
                    text = datas[i]['text'];
                    break;
                }
            }
        }
        this.state = {
            datas: datas,
            selectedIndex: index,
            selectedValue: value,
            selectedText: text,
        }
    }

    doCallback() {
        var self = this;
        let callback = this.props.callback;
        return new Promise(function (resolve, reject) {
            if (callback) {
                callback(self.state.selectedValue, self.state.selectedText);
            }
            resolve();
        });
    }

    onPress(visible) {
        let callback = this.props.callback;
        if (visible && callback) {
            this.doCallback().then(()=> {
                PickerUtil.pickerCancel();
            });
        } else {
            PickerUtil.pickerCancel();
        }
    }

    onPickerSelect(index) {
        if (this.state.datas && this.state.datas[index]) {
            let data = this.state.datas[index];
            this.setState({
                selectedIndex: index,
                selectedValue: data['value'],
                selectedText: data['text'],
            })
        }
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.visible}
                onClose={() => {}}
                onRequestClose={() => {}}
            >
                <View style={styles.modalStyle}>
                    <View style={styles.subView}>
                        <View style={styles.titleView}>
                            <HFTextButton style={styles.button} textStyle={styles.buttonText} fontSizeDiff={-1}
                                          text="取消" onPress={()=>this.onPress(false)}/>
                            <HFText style={styles.title} text={this.props.title}/>
                            <HFTextButton style={styles.button} textStyle={styles.buttonText} fontSizeDiff={-1}
                                          text="确定" onPress={()=>this.onPress(true)}/>
                        </View>
                        <View style={styles.editorView} keyboardShouldPersistTaps={true}>
                            <View style={styles.container}>
                                <Picker
                                    style={{width:HFConfiguration.windowWidth,height:HFConfiguration.pickerHeight}}
                                    selectedValue={this.state.selectedIndex}
                                    itemStyle={{color:HFConfiguration.mainColor, fontSize:26}}
                                    onValueChange={(index) => this.onPickerSelect(index)}
                                >
                                    {
                                        this.state.datas != null
                                            ?
                                            this.state.datas.map((item, index) => (
                                                <PickerItem
                                                    label={item['text']}
                                                    value={index}
                                                    key={"item_" + index}
                                                />
                                            ))
                                            :
                                            []
                                    }
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HFConfiguration.pickerHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    modalStyle: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    subView: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    titleView: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: HFConfiguration.mainColor,
        alignItems: 'center'
    },
    button: {
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        textAlign: 'center',
    },
    editorView: {
        backgroundColor: '#f1f1f1'
    }
});

module.exports = HFPicker;