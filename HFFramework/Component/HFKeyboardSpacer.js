/**
 * Created by shange on 2016/10/17
 * 键盘空间
 */

import React, { Component, PropTypes } from 'react';
import {HFTextButton, HFText, HFConfiguration, Keyboard, LayoutAnimation, View, Platform, TouchableOpacity, Image, Clipboard, Dimensions, DeviceEventEmitter, StyleSheet} from './../Framework';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import RenderIf from './../Utility/RenderIf';

export default class HFKeyboardSpacer extends Component {
    static propTypes = {
        topSpacing: PropTypes.number,
        onToggle: PropTypes.func,
        style: View.propTypes.style,
        animationConfig: PropTypes.object,
    };

    static defaultProps = {
        topSpacing: 0,
        // From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
        animationConfig: {
            duration: 500,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 200
            }
        },
        onToggle: () => null,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            keyboardSpace: 0,
            isKeyboardOpened: false,
            flagInputCanAccess: false,// 是否允许访问TextInput.若否,则复制和粘贴均不显示
            flagCanCopy: false,
            copiedString: '',
            textInputUUID: null,
        };
        this._listeners = null;
        this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
        this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
    }

    componentWillMount() {
        this.regetClipboardContent();
        //
        var self = this;
        this.hfKeyboardSpacerListener = DeviceEventEmitter.addListener('HFKeyboardSpacer', function (type, value) {
            if (type == 'HFTextInputUUID') {// 获取当前激活状态的输入框
                self.setState({textInputUUID: value});
            } else if (type == 'HFTextInputAccess') {// 获取当前激活状态输入框的配置,是否可以显示复制和粘贴
                self.setState({flagInputCanAccess: value});
            } else if (type == 'HFTextInputValue') {// 获取当前激活状态输入框的值,并设置到剪贴板中
                if (value != null && value != '') {
                    Clipboard.setString(value);
                    self.setState({
                        copiedString: value,
                    });
                }
            } else if (type == 'HFTextInputFlagCopy') {// 判断当前激活状态输入框的值,是否可以复制
                self.setState({
                    flagCanCopy: value,
                });
            }
        })
    }

    componentDidMount() {
        const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
        this._listeners = [
            Keyboard.addListener(updateListener, this.updateKeyboardSpace),
            Keyboard.addListener(resetListener, this.resetKeyboardSpace)
        ];
    }

    componentWillUpdate(props, state) {
        if (state.isKeyboardOpened !== this.state.isKeyboardOpened) {
            LayoutAnimation.configureNext(props.animationConfig);
        }
    }

    componentWillUnmount() {
        this._listeners.forEach(listener => listener.remove());
        if (this.hfKeyboardSpacerListener != null) {
            this.hfKeyboardSpacerListener.remove();
        }
    }

    updateKeyboardSpace(frames) {
        if (!frames.endCoordinates) {
            return;
        }
        const keyboardSpace = frames.endCoordinates.height;
        // 会加上一个关闭键盘的按钮高度
        let spaceHeight = keyboardSpace > 0 ? (Platform.OS == 'android' ? this.props.topSpacing + 40 : keyboardSpace + this.props.topSpacing + 40) : 0;
        this.setState({
            keyboardSpace: spaceHeight,
            isKeyboardOpened: true
        }, this.props.onToggle(true, spaceHeight));
        // 自动滚动(已废弃)
        if (Platform.OS == 'ios' && this.props.scrollView != null) {
            if (spaceHeight > 0) {
                this.props.scrollView.scrollTo({
                    x: 0,
                    y: (this.props.scrollHeight != null && this.props.scrollHeight >= 0 ? this.props.scrollHeight : 100),
                    animated: true
                });
            } else {
                this.props.scrollView.scrollTo({x: 0, y: 0, animated: true});
            }
        }
        this.regetClipboardContent();
    }

    resetKeyboardSpace() {
        // 关闭高度
        this.setState({
            keyboardSpace: 0,
            isKeyboardOpened: false
        }, this.props.onToggle(false, 0));
        // 上划滚动层(已废弃)
        if (Platform.OS == 'ios' && this.props.scrollView) {
            this.props.scrollView.scrollTo({x: 0, y: 0, animated: true});
        }
    }

    // 密码输入框不可复制
    copyContent() {
        DeviceEventEmitter.emit('HFTextInput', 'HFKeyboardSpacer.getContent', null);
        this.regetClipboardContent();
    }

    setContent() {
        this.setState({flagCanCopy: true});
        DeviceEventEmitter.emit('HFTextInput', 'HFKeyboardSpacer.setContent' + this.state.textInputUUID, this.state.copiedString);
    }

    async regetClipboardContent() {
        try {
            var content = await Clipboard.getString();
            this.setState({copiedString: content});
        } catch (e) {
        }
    }

    render() {
        // 记得在AndroidManifest.xml里的MainActivity中添加android:windowSoftInputMode="stateHidden|adjustResize"
        return (
            <View ref="keyboardView"
                  style={[styles.keyboardContainer, { height: this.state.keyboardSpace }, this.props.style]}>
                {RenderIf(this.state.keyboardSpace > 0)(
                    <View style={{flex:1,flexDirection:'column'}}>
                        <View style={styles.keyboardHorizontalRow}/>
                        <View style={styles.keyboardButton}>
                            <Image
                                style={{width:34,height:23,marginLeft:10}}
                                source={require('./../Image/Icon/logo.png')}
                                resizeMode={Image.resizeMode.stretch}
                            />
                            {RenderIf(this.state.flagInputCanAccess && this.state.flagCanCopy)(
                                <HFTextButton onPress={()=>this.copyContent()} text="复制" fontSizeDiff={1}
                                              style={{width:50,height:38,marginLeft:10}}
                                              textStyle={{color:HFConfiguration.mainColor}}/>
                            )}
                            {RenderIf(this.state.flagInputCanAccess && this.state.copiedString != null && this.state.copiedString != '')(
                                <HFTextButton onPress={()=>this.setContent()} text={"粘贴:" + this.state.copiedString}
                                              fontSizeDiff={1}
                                              numberOfLines={1}
                                              style={{flex:1,height:38,marginLeft:10,marginRight:10}}
                                              textStyle={{color:HFConfiguration.mainColor,alignSelf:'flex-start'}}/>
                            )}
                            <HFTextButton onPress={()=>dismissKeyboard()} text="关闭" fontSizeDiff={1}
                                          style={{width:50,height:38,marginRight:10}}
                                          textStyle={{color:HFConfiguration.mainColor}}/>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    keyboardContainer: {
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
    },
    keyboardHorizontalRow: {
        height: 1,
        backgroundColor: '#ccc',
    },
    keyboardButton: {
        height: 39,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

module.exports = HFKeyboardSpacer;