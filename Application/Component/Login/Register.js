/**
 * Created by zhang on 16/11/4.完善信息
 */
import React, {Component} from 'react';
import {
    HFPage,
    HFTextInput,
    HFMediumButton,
    HFHugeButton,
    HFImageButton,
    HFTextButton,
    HFView,
    HFImage,
    StyleSheet,
    HFText,
    View
} from '../../../HFFramework/Framework';
import Config from '../../Common/Config'
import Constants from '../../Common/Constants'
import Service from '../../Common/Service'
import Toast from '@remobile/react-native-toast';
import RenderIf from '../../../HFFramework/Utility/RenderIf';
import Handler from '../../../HFFramework/Utility/Handler';
import Dialog from '../../../HFFramework/Utility/Dialog';
import Api from '../../../HFFramework/Utility/Api';
import Login from './Login';
import Agreement from './Agreement';
import Navigator from '../../../HFFramework/Utility/Navigator';

import PerfectInfo from '../Perfect/PerfectInfo'

var TimerIndex;
export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            captchaShow: false,
            mediumButtonDisable: true,
            hugeButtonDisable: true,
            isLoading: false,
            verifycode: null,
            timeCountDown: 60,
            timeCountDownStr: '获取验证码',
            pattern: new RegExp('^[1]{1}[3,4,5,7,8]{1}[0-9]{9}$'),
            imageSource: require('../../Image/Login/biyan.png'),
            imageFlag: true,
            secureTextEntry: true,
        }
    }

    //密码显示隐藏
    onImagePress() {
        if (this.state.imageFlag) {
            this.setState({
                imageSource: require('../../Image/Login/zhengyan.png'),
                imageFlag: false,
                secureTextEntry: false
            })
        } else {
            this.setState({
                imageSource: require('../../Image/Login/biyan.png'),
                imageFlag: true,
                secureTextEntry: true
            })
        }
    }

    //是否可以完成
    canSubmit(username, password, verifyCode) {
        let hugeButtonDisable = true;
        if (username.length == 11 && this.state.pattern.test(username) && password.length > 5 && verifyCode.length === 6) {
            hugeButtonDisable = false;
        } else {
            hugeButtonDisable = true;
        }
        this.setState({
            hugeButtonDisable: hugeButtonDisable
        });
    }

    //输入框变化
    handlerChange(type, value) {
        let username = this.refs.inputUsername.getValue() ? this.refs.inputUsername.getValue() : ''
        let password = this.refs.inputPassword.getValue() ? this.refs.inputPassword.getValue() : ''
        let verifyCode = this.refs.inputVerifyCode.getValue() ? this.refs.inputVerifyCode.getValue() : ''
        switch (type) {
            case 'password':
                password = value
                break;
            case 'username':
                username = value
                if (username.length == 11 && this.state.pattern.test(username)) {
                    this.setState({
                        mediumButtonDisable: false
                    });
                } else {
                    this.setState({
                        mediumButtonDisable: true
                    });
                }
                break
            case 'verifyCode':
                verifyCode = value
        }
        this.canSubmit(username, password, verifyCode)
    }

    _onEndEditing(e) {
        if (!this.state.pattern.test(e.nativeEvent.text.trim())) {
            Toast.showShortCenter('手机号码格式错误');
        }
    }

    //获取验证码
    handleVerifyCode() {
        if (this.state.timeCountDownStr == '获取验证码') {
            let param = {
                action: 'register',
                username: this.refs.inputUsername.getValue() ? this.refs.inputUsername.getValue() : '',
            };
            Api.post(Service.verifyCode, param)
                .then(res => {
                    if (res) {
                        console.log(res)
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

    //验证码读取
    handleVerifyCodeCountDown() {
        this.setState({
            mediumButtonDisable: true,
            timeCountDown: 60,
            timeCountDownStr: '（重新获取） 60s',
            mediumButtonTextStyle: {color: '#999999'},
            mediumButtonBorderColor: '#e4e4e4'
        });
        TimerIndex = setInterval(() => {
            if (this.refs.btnVerifyCode) {
                let cd = this.state.timeCountDown - 1;
                if (cd <= 0) {
                    this.setState({
                        mediumButtonDisable: false,
                        timeCountDown: 0,
                        timeCountDownStr: '获取验证码',
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
                        timeCountDownStr: '（重新获取） ' + cd + 's'
                    });
                }
            } else {
                if (TimerIndex) {
                    clearInterval(TimerIndex);
                }
            }
        }, 1000);
    }

    onAgreementPress() {
        Navigator.push({
            component: Agreement
        }, this.props.navigator);
    }

    handlerSubmit() {
        this.setState({
            isLoading: true
        });
        let self = this;
        let param = {
            action: 'register',
            username: this.refs.inputUsername.getValue() ? this.refs.inputUsername.getValue() : '',
            password: this.refs.inputPassword.getValue() ? this.refs.inputPassword.getValue() : '',
            verifyCode: this.refs.inputVerifyCode.getValue() ? this.refs.inputVerifyCode.getValue() : ''
        };
        Api.get(Service.register, param, false)
            .then(res=> {
                console.log(res)
                if (!res) {
                    this.setState({
                        isLoading: false,
                        hugeButtonDisable: false,
                    });
                    return false;
                }
                if (res.status == 1) {
                    let param = {
                        action: 'login',
                        username: this.refs.inputUsername.getValue(),
                        password: this.refs.inputPassword.getValue()
                    };
                    Api.get(Service.login, param, false)
                        .then(res => {
                            if (!res) {
                                self.setState({
                                    isLoading: false,
                                    hugeButtonDisable: false,
                                });
                                return false;
                            }
                            if (res.status === 1) {
                                let param = {};
                                param.userId = res.userId;
                                param.doctorId = res.doctorId;
                                param.token = res.token;
                                param.data = res.data;
                                Service.userId = res.userId;
                                Service.doctorId = res.doctorId;
                                Service.token = res.token;
                                Handler.save(Constants.storageKeyUserToken, param);
                                Handler.save(Constants.storageKeyIsLogin, true);
                                Handler.save(Constants.storageKeyIsPerfectInfo, false);
                                Handler.save(Constants.storageKeyIsCertification, false);
                                Handler.save(Constants.storageKeyIsCertifying, false);
                                Dialog.alert('您的信息未完善', null, null, function () {
                                    setTimeout(() => {
                                        Navigator.resetTo({
                                            component: PerfectInfo,
                                            passProps: {
                                                userInfo: res
                                            }
                                        }, self.props.navigator);
                                    }, 500);
                                });

                            }
                        })
                } else {
                    Toast.showShortCenter(res.message);
                }

                this.setState({
                    animating: false
                });
            })
    }

    render() {
        return (
            <HFPage
                navigation={{navigator: this.props.navigator, title: '注册', flagLeft: true,}}
                innerView={
                    <View style={{flex: 1}}>
                        <HFView
                            style={[styles.rowInput, {marginTop: 50}]}
                            innerView={
                                <HFTextInput
                                    ref='inputUsername'
                                    style={styles.textInput}
                                    placeholder='请输入手机号'
                                    keyboardType="numeric"
                                    maxLength={11}
                                    flagImage={true}
                                    imageSource={require('../../Image/Login/shouji.png')}
                                    imageStyle={{width: 25, height: 25}}
                                    onChangeText={this.handlerChange.bind(this, 'username')}
                                    onEndEditing={this._onEndEditing.bind(this)}
                                />
                            }
                        />

                        <HFView
                            style={styles.rowInput}
                            innerView={
                                <View style={{flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5}}>
                                    <HFTextInput
                                        ref='inputPassword'
                                        style={styles.textInput}
                                        placeholder='请输入六位以上密码'
                                        maxLength={18}
                                        flagImage={true}
                                        imageSource={require('../../Image/Login/mima.png')}
                                        imageStyle={{width: 25, height: 25}}
                                        secureTextEntry={this.state.secureTextEntry}
                                        onChangeText={this.handlerChange.bind(this, 'password')}
                                    />
                                    <HFImageButton
                                        style={styles.imageButton}
                                        source={this.state.imageSource}
                                        onPress={this.onImagePress.bind(this)}
                                    />
                                </View>
                            }
                        />
                        <HFView
                            innerView={
                                <View style={{flexDirection: 'row'}}>
                                    <View style={[styles.rowInput, {flex: 1}]}>
                                        <HFTextInput
                                            ref='inputVerifyCode'
                                            style={styles.textInput}
                                            placeholder='验证码'
                                            keyboardType="numeric"
                                            maxLength={6}
                                            flagImage={true}
                                            imageSource={require('../../Image/Login/yanzhengma.png')}
                                            imageStyle={{width: 25, height: 25}}
                                            onChangeText={this.handlerChange.bind(this, 'verifyCode')}
                                        />

                                    </View>
                                    <HFMediumButton
                                        ref='btnVerifyCode'
                                        text={this.state.timeCountDownStr}
                                        textStyle={this.state.mediumButtonTextStyle}
                                        disabled={this.state.mediumButtonDisable}
                                        onPress={this.handleVerifyCode.bind(this)}
                                        style={{height: 50, marginTop: 0, marginRight: 15, width: 150}}
                                    />
                                </View>
                            }
                        />
                        <HFHugeButton
                            text="完成"
                            disabled={this.state.hugeButtonDisable}
                            onPress={this.handlerSubmit.bind(this)}
                        />
                        <View style={styles.agreement}>
                            <HFText text="点击注册，即表示您同意" style={styles.agreement1}/>
                            <HFTextButton
                                textStyle={styles.agreement2}
                                text="《后发医生用户协议》"
                                onPress={this.onAgreementPress.bind(this)}
                            />
                        </View>

                    </View>
                }
            />
        )
    }
}
const styles = StyleSheet.create({
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
    imageButton: {
        marginTop: 0,
        height: 48,
        width: 40,
        backgroundColor: '#fff',
        borderWidth: 0
    },
    agreement: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 15
    },
    agreement1: {
        fontSize: 13
    },
    agreement2: {
        fontSize: 13,
        color: '#00cf92'
    }
})
