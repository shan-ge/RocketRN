/**
 * Created by zhang on 16/11/8. 找回密码
 * 第二步:填写验证码
 */
'use strict';
import React, {Component} from 'react';
import {
    HFPage,
    HFTextInput,
    HFRowInput,
    HFMediumButton,
    HFHugeButton,
    HFImageButton,
    HFText,
    HFView,
    HFImage,
    HFAlert,
    HFKeyboardSpacer,
    StyleSheet,
    Platform,
    View
} from '../../../HFFramework/Framework';
import Config from '../../Common/Config'
import Service from '../../Common/Service';
import RenderIf from '../../../HFFramework/Utility/RenderIf';
import Api from '../../../HFFramework/Utility/Api';
import Toast from '@remobile/react-native-toast';
import Dialog from '../../../HFFramework/Utility/Dialog';
import Navigator from '../../../HFFramework/Utility/Navigator';

import GetPassword3 from './GetPassword3';

var TimerIndex;

export default class GetPassword2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: this.props.username,
            verifycode: null,
            timeCountDown: 60,
            timeCountDownStr: '60s',
            mediumButtonDisable: true,
            hugeButtonDisable: true,
        };
    }

    componentDidMount() {
        // 初始化倒计时器
        this.handleVerifyCodeCountDown();
    }

    componentDidUnMount() {
        if (TimerIndex) {
            clearInterval(TimerIndex);
        }
    }

    handleVerifyCodeCountDown() {
        if (TimerIndex) {
            clearInterval(TimerIndex);
        }
        this.setState({
            mediumButtonDisable: true,
            timeCountDown: 60,
            timeCountDownStr: '60s',
            mediumButtonTextStyle: {color: '#999999'},
            mediumButtonBorderColor: '#e4e4e4'
        });
        TimerIndex = setInterval(() => {
            // 如果不在这个页面了,这个值就是undefined
            if (this.refs.btnVerifyCode) {
                let cd = this.state.timeCountDown - 1;
                if (cd <= 0) {
                    this.setState({
                        mediumButtonDisable: false,
                        timeCountDown: 0,
                        timeCountDownStr: '重新发送',
                        mediumButtonTextStyle: {color: '#fff'},
                        mediumButtonBorderColor: '#66bc55'
                    });
                    if (TimerIndex) {
                        clearInterval(TimerIndex);
                    }
                } else {
                    this.setState({
                        mediumButtonDisable: true,
                        timeCountDown: cd,
                        timeCountDownStr: cd + 's'
                    });
                }
            } else {
                if (TimerIndex) {
                    clearInterval(TimerIndex);
                }
            }
        }, 1000);
    }

    handleResendVerifyCode() {
        if (this.state.timeCountDownStr == '重新发送') {
            // 重新发送
            let param = {
                action: 'forgetpassword',
                username: this.state.username,
            };
            Api.post(Service.verifyCode, param)
                .then(res => {
                    this.setState({
                        hugeButtonDisable: false,
                    });
                    if (res) {
                        try {
                            if (res['status'] == 1) {
                                this.handleVerifyCodeCountDown();
                            } else {
                                Toast.showShortCenter(res['message'])
                            }
                        } catch (e) {
                            Toast.showShortCenter('验证码校验失败')
                        }
                    } else {
                        Toast.showShortCenter('请求验证码失败')
                    }
                }).catch(e => {
                this.setState({
                    hugeButtonDisable: false,
                });
                Toast.showShortCenter('网络错误')
            })
        }
    }

    handlerChangeVerifycode(code) {
        if (code && code.length == 6) {
            this.setState({
                hugeButtonDisable: false
            });
        } else {
            this.setState({
                hugeButtonDisable: true
            });
        }
    }

    handlerSubmit() {
        this.setState({
            isLoading: true
        });
        let param = {
            username: this.state.username,
            verifyCode: this.refs.inputVerifyCode.getValue()
        };
        Api.post(Service.smsValidateForgetPassword, param)
            .then(res => {
                if (res) {
                    try {
                        if (res['status'] == 1) {
                            Navigator.push({
                                component: GetPassword3,
                                passProps: {
                                    username: this.state.username,
                                    verifyCode: this.refs.inputVerifyCode.getValue(),
                                }
                            }, this.props.navigator)
                        } else {
                            Toast.showShortCenter(res['message']);
                            this.handlerChangeCaptcha();
                        }
                    } catch (e) {
                        Toast.showShortCenter('验证码校验失败');
                        this.handlerChangeCaptcha();
                    }
                } else {
                    Toast.showShortCenter('请求验证码失败');
                    this.handlerChangeCaptcha();
                }
            }).catch(e => {
            Toast.showShortCenter('网络错误');
            this.handlerChangeCaptcha();
        })
    }

    render() {
        return (
            <HFPage
                style={styles.mainContainer}
                navigation={{navigator: this.props.navigator, title: '找回密码', flagLeft: true,}}
                innerView={
                    <View style={styles.innerContainer}>
                        <HFText
                            style={{marginTop: 15, marginBottom: 20, marginLeft: 15, color: '#666'}}
                            text={'验证码已发送至手机号：+86 ' + this.state.username}
                        />

                        <HFView
                            innerView={
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.rowInput, {flex: 1}]}>
                                        <HFTextInput
                                            ref='inputVerifyCode'
                                            placeholder='短信验证码'
                                            onChangeText={this.handlerChangeVerifycode.bind(this)}
                                            style={styles.textInput}
                                            keyboardType="numeric"
                                            maxLength={11}
                                            flagImage={true}
                                            imageSource={require('../../Image/Login/shouji.png')}
                                            imageStyle={{width: 25, height: 25}}
                                        />
                                    </View>
                                    <HFMediumButton
                                        ref='btnVerifyCode'
                                        text={this.state.timeCountDownStr}
                                        textStyle={this.state.mediumButtonTextStyle}
                                        disabled={this.state.mediumButtonDisable}
                                        onPress={this.handleResendVerifyCode.bind(this)}
                                        style={{height: 50, marginTop: 0, marginRight: 15, width: 150}}
                                    />
                                </View>
                            }
                        />
                        <HFHugeButton
                            onPress={this.handlerSubmit.bind(this)}
                            disabled={this.state.hugeButtonDisable}
                            text='下一步'
                        />
                    </View>
                }
            />
        )
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    rowInput: {
        flex: 1,
        height: 50,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        borderRadius: 5

    },
    textInput: {
        height: 48,
        borderRadius: 5
    },
    captcha: {
        height: 50,
        marginTop: 0,
        marginRight: 15,
        width: 80,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 5
    }
});

module.exports = GetPassword2;
