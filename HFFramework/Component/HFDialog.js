/**
 * Created by shange on 2016/11/21. 弹出层
 */

'use strict';
import React,{Component} from 'react';
import {HFHeading, HFText, HFTextButton, HFHugeButton, HFSeparator, HFConfiguration, Modal, View, StyleSheet} from './../Framework';

import Dialog from './../Utility/Dialog';
import RenderIf from './../Utility/RenderIf';

class HFDialog extends Component {

    static defaultProps = {
        visible: false,
        title: '提示',
        buttonText: '我知道了',
        flagHugeButton: false,
    };

    static propTypes = {
        visible: React.PropTypes.bool,
        title: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        callback: React.PropTypes.func,
        flagHugeButton: React.PropTypes.bool,
    };

    componentWillReceiveProps(newProps) {
        if (this.refs.hfDialog && newProps && newProps.innerView) {
            this.setState({
                innerView: null
            });
            var self = this;
            setTimeout(function () {
                self.setState({
                    innerView: newProps.innerView
                });
            }, 10);
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            innerView: this.props.innerView
        };
    }

    onPress() {
        Dialog.dialogCancel();
        if (this.props.callback) {
            var callback = this.props.callback;
            setTimeout(function () {
                callback();
            }, 100);
        }
    }

    render() {
        return (
            <View ref="hfDialog">
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
                                style={{alignSelf:'center',color:HFConfiguration.textFontColor2,marginTop:10,fontWeight:'400'}}
                            />
                            <HFSeparator style={{marginTop:10,marginBottom:20}}/>
                            {this.state.innerView}
                            <HFSeparator style={{marginTop:20,marginBottom:10}}/>
                            {RenderIf(this.props.flagHugeButton)(
                                <HFHugeButton
                                    numberOfLines={1}
                                    fontSizeDiff={-1}
                                    text={this.props.buttonText}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    onPress={this.onPress.bind(this)}
                                />
                            )}
                            {RenderIf(!this.props.flagHugeButton)(
                                <HFTextButton
                                    numberOfLines={1}
                                    fontSizeDiff={-1}
                                    text={this.props.buttonText}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    onPress={this.onPress.bind(this)}
                                />
                            )}
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: 10,
    },
    buttonText: {
        color: HFConfiguration.mainColor,
    },
});

module.exports = HFDialog;