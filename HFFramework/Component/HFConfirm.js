/**
 * Created by zhang on 2016/8/5.
 */

'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    Navigator,
    TextInput,

    StyleSheet,
    Dimensions,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';

class HFConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _onPress(value) {
        DeviceEventEmitter.emit(this.props.pageKey, this.props.type, value)
    }

    render() {
        return (
            <View ref={this.props.ref}>
                <View style={styles.container}>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.props.show}
                        onRequestClose={() => {}}
                    >
                        <View style={styles.modalStyle}>
                            <View style={styles.subView}>
                                <View style={styles.titleBox}>
                                    <Text style={styles.titleText}>
                                        {this.props.titleText?this.props.titleText:'请确认'}
                                    </Text>
                                </View>
                                <View style={styles.horizontalLine}/>
                                <View style={styles.buttonView}>
                                    <TouchableHighlight underlayColor='transparent'
                                                        style={styles.buttonStyle}
                                                        onPress={this._onPress.bind(this,false)}
                                    >
                                        <Text style={[styles.buttonText,{color:'#999999'}]}>
                                            {this.props.leftButtonText?this.props.leftButtonText:'取消'}
                                        </Text>
                                    </TouchableHighlight>
                                    <View style={styles.verticalLine}/>
                                    <TouchableHighlight underlayColor='transparent'
                                                        style={styles.buttonStyle}
                                                        onPress={this._onPress.bind(this,true)}
                                    >
                                        <Text style={styles.buttonText}>
                                            {this.props.rightButtonText?this.props.rightButtonText:'确定'}
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }

}
// Modal属性
// 1.animationType bool  控制是否带有动画效果
// 2.onRequestClose  Platform.OS==='android'? PropTypes.func.isRequired : PropTypes.func
// 3.onShow function方法
// 4.transparent bool  控制是否带有透明效果
// 5.visible  bool 控制是否显示

// css样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    // modal的样式
    modalStyle: {
        backgroundColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    // modal上子View的样式
    subView: {
        marginLeft: 60,
        marginRight: 60,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    // 标题
    titleBox: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 14,
        color: '#333',

    },
    // 水平的分割线
    horizontalLine: {
        height: 0.5,
        backgroundColor: '#ccc',
    },
    // 按钮
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonStyle: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // 竖直的分割线
    verticalLine: {
        width: 0.5,
        height: 40,
        backgroundColor: '#ccc',
    },
    // 按钮的样式
    buttonText: {
        fontSize: 16,
        color: '#00cf92',
        textAlign: 'center',

    },
});

module.exports = HFConfirm;