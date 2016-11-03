/**
 * Created by shange on 2016/11/02. 提示框
 */

'use strict';
import React,{Component} from 'react';
import {HFHeading, HFParagraph, HFText, HFTextButton, HFSeparator, HFConfiguration, Modal, View, StyleSheet} from './../Framework';

import Dialog from './../Utility/Dialog';

class HFAlert extends Component {

    static defaultProps = {
        visible: false,
        title: '提示',
        text: '提醒内容',
        buttonText: '我知道了',
    };

    static propTypes = {
        visible: React.PropTypes.bool,
        title: React.PropTypes.string,
        text: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        callback: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onPress() {
        Dialog.alertCancel();
        if (this.props.callback) {
            this.props.callback();
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
                                style={{alignSelf:'center',color:HFConfiguration.textFontColor2,marginTop:HFConfiguration.viewMargin[HFConfiguration.dpiIndex][0]}}
                            />
                            <HFSeparator/>
                            <HFParagraph
                                numberOfLines={10}
                                text={this.props.text}
                                style={styles.text}
                            />
                            <HFSeparator/>
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
                </Modal>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    outerView: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    subView: {
        minWidth: 250,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#e4e4e4',
        marginLeft: 80,
        marginRight: 80,
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: HFConfiguration.viewMargin[HFConfiguration.dpiIndex][2],
    },
    buttonText: {
        color: HFConfiguration.mainColor,
    },
});

module.exports = HFAlert;