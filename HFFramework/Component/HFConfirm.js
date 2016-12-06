/**
 * Created by shange on 2016/11/03. 确认提示框
 */

'use strict';
import React,{Component} from 'react';
import {HFHeading, HFParagraph, HFText, HFTextButton, HFSeparator, HFConfiguration, Modal, View, StyleSheet} from './../Framework';

import Dialog from './../Utility/Dialog';

class HFConfirm extends Component {

    static defaultProps = {
        visible: false,
        title: '提示',
        text: '提醒内容',
        buttonText: '确定',
        cancelText: '取消',
    };

    static propTypes = {
        visible: React.PropTypes.bool,
        title: React.PropTypes.string,
        text: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        callback: React.PropTypes.func,
        cancelCallback: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onPress() {
        Dialog.confirmCancel();
        if (this.props.callback) {
            var callback = this.props.callback;
            setTimeout(function () {
                callback();
            }, 100);
        }
    }

    onCancel() {
        Dialog.confirmCancel();
        if (this.props.cancelCallback) {
            var cancelCallback = this.props.cancelCallback;
            setTimeout(function () {
                cancelCallback();
            }, 100);
        }
    }

    render() {
        return (
            <View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.props.visible}
                    onShow={() => {}}
                    onRequestClose={() => {}}
                >
                    <View style={styles.outerView}>
                        <View
                            style={[styles.subView,this.props.style]}>
                            <HFHeading
                                level={2}
                                numberOfLines={1}
                                text={this.props.title}
                                style={{alignSelf:'center',color:HFConfiguration.textFontColor2,marginTop:10}}
                            />
                            <HFSeparator style={{marginTop:10,marginBottom:20}}/>
                            <HFParagraph
                                numberOfLines={10}
                                text={this.props.text}
                                style={styles.text}
                            />
                            <HFSeparator style={{marginTop:20,marginBottom:0}}/>
                            <View style={styles.buttonView}>
                                <HFTextButton
                                    numberOfLines={1}
                                    fontSizeDiff={-1}
                                    text={this.props.cancelText}
                                    style={styles.button}
                                    textStyle={styles.cancelText}
                                    onPress={this.onCancel.bind(this)}
                                />
                                <View style={styles.buttonSeparator}/>
                                <HFTextButton
                                    numberOfLines={1}
                                    fontSizeDiff={-1}
                                    text={this.props.buttonText}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    onPress={this.onPress.bind(this)}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
;

var styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: HFConfiguration.dialogBackground,
    },
    subView: {
        width: HFConfiguration.windowWidth - 100,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#e4e4e4',
        marginLeft: 50,
        marginRight: 50,
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
    },
    buttonView: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginTop: 0,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: HFConfiguration.viewMargin[HFConfiguration.dpiIndex][2],
    },
    buttonSeparator: {
        width: 1,
        height: 45,
        backgroundColor: HFConfiguration.separatorLineColor,
    },
    buttonText: {
        color: HFConfiguration.mainColor,
    },
    cancelText: {
        color: HFConfiguration.textFontColor2,
    },
});

module.exports = HFConfirm;